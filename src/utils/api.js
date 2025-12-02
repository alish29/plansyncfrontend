// src/utils/api.js
import axios from 'axios';
import { API_BASE_URL, STORAGE_KEYS } from './constants.js';

// normalize base and fallback
export const resolvedBase = (API_BASE_URL || '').toString().replace(/\/$/, '') || 'https://plansyncbackend.onrender.com/api';
console.log('API_BASE_URL (runtime):', API_BASE_URL, '| resolvedBase:', resolvedBase);

const api = axios.create({
  baseURL: resolvedBase,
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json',
  },
});

/* ---------- token storage helpers ---------- */
export const getStoredTokens = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.tokens);
    return raw ? JSON.parse(raw) : null;
  } catch (error) {
    console.error('Unable to parse stored tokens', error);
    return null;
  }
};

export const persistTokens = (tokens) => {
  try {
    if (!tokens) {
      localStorage.removeItem(STORAGE_KEYS.tokens);
    } else {
      localStorage.setItem(STORAGE_KEYS.tokens, JSON.stringify(tokens));
    }
  } catch (e) {
    console.error('persistTokens error', e);
  }
};

/* ---------- request interceptor: attach access token & debug ---------- */
api.interceptors.request.use(
  (config) => {
    const tokens = getStoredTokens();
    if (tokens?.access) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${tokens.access}`;
    }

    // debug full url
    try {
      const base = config.baseURL || resolvedBase;
      const urlPath = config.url || '';
      const url = `${base.replace(/\/$/, '')}${urlPath.startsWith('/') ? '' : '/'}${urlPath}`;
      // eslint-disable-next-line no-console
      console.log('[api] REQUEST =>', (config.method || 'GET').toUpperCase(), url);
    } catch (e) {
      // ignore logging errors
    }

    return config;
  },
  (err) => Promise.reject(err)
);

/* ---------- response interceptor with refresh queue ---------- */
let isRefreshing = false;
let refreshQueue = [];

const processQueue = (error, token = null) => {
  refreshQueue.forEach(({ resolve, reject }) => {
    if (error) reject(error);
    else resolve(token);
  });
  refreshQueue = [];
};

api.interceptors.response.use(
  (response) => {
    // debug response
    try {
      console.log('[api] RESPONSE', response.status, response.config.url);
    } catch (e) {}
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;

    if (!originalRequest) return Promise.reject(error);

    // Only try refresh on 401 and if we haven't already retried this request
    if (status === 401 && !originalRequest._retry) {
      const stored = getStoredTokens();
      if (!stored?.refresh) {
        persistTokens(null);
        return Promise.reject(error);
      }

      if (isRefreshing) {
        // queue this request until refresh finishes
        return new Promise((resolve, reject) => {
          refreshQueue.push({
            resolve: (token) => {
              originalRequest.headers = originalRequest.headers || {};
              originalRequest.headers.Authorization = `Bearer ${token}`;
              resolve(api(originalRequest));
            },
            reject,
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Try a few common refresh endpoints (adjust as needed)
        const refreshPathCandidates = [
          `${resolvedBase}/token/refresh/`,
          `${resolvedBase}/auth/refresh/`,
          `${resolvedBase}/users/token/refresh/`,
        ];

        let refreshResponse = null;
        for (const path of refreshPathCandidates) {
          try {
            refreshResponse = await axios.post(path, { refresh: stored.refresh }, {
              headers: { 'Content-Type': 'application/json' },
            });
            if (refreshResponse?.data?.access) break;
          } catch (e) {
            // try next candidate
          }
        }

        if (!refreshResponse || !refreshResponse.data?.access) {
          throw new Error('Refresh failed: no access token returned');
        }

        const newAccess = refreshResponse.data.access;
        const updatedTokens = { ...stored, access: newAccess };
        persistTokens(updatedTokens);

        // apply to queued requests
        processQueue(null, newAccess);

        // set header and retry original request
        originalRequest.headers = originalRequest.headers || {};
        originalRequest.headers.Authorization = `Bearer ${newAccess}`;
        return api(originalRequest);
      } catch (refreshErr) {
        processQueue(refreshErr, null);
        persistTokens(null); // clear tokens - user must login again
        return Promise.reject(refreshErr);
      } finally {
        isRefreshing = false;
      }
    }

    // fallback: log and reject
    console.error('[api] ERROR', error.response?.status, error.config?.url, error.message);
    return Promise.reject(error);
  }
);

export default api;
