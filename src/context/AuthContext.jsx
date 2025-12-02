import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import api, { getStoredTokens, persistTokens } from '../utils/api.js';
import { STORAGE_KEYS } from '../utils/constants.js';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [tokens, setTokens] = useState(getStoredTokens);
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [error, setError] = useState(null);

  const saveTokens = useCallback((nextTokens) => {
    setTokens(nextTokens);
    persistTokens(nextTokens);
  }, []);

  const clearAuthState = useCallback(() => {
    setUser(null);
    setError(null);
    saveTokens(null);
  }, [saveTokens]);

  const fetchProfile = useCallback(async () => {
    try {
      const { data } = await api.get('/users/profile/');
      setUser(data);
    } catch (profileError) {
      console.error('Failed to load profile', profileError);
      clearAuthState();
    } finally {
      setIsAuthenticating(false);
    }
  }, [clearAuthState]);

  useEffect(() => {
    if (tokens?.access) {
      fetchProfile();
    } else {
      setIsAuthenticating(false);
    }
  }, [tokens, fetchProfile]);

  const login = useCallback(
    async (credentials) => {
      setIsAuthenticating(true);
      setError(null);
      try {
        const { data } = await api.post('/users/login/', credentials);
        const nextTokens = { access: data.access, refresh: data.refresh };
        saveTokens(nextTokens);
        setUser(data.user);
        return { success: true };
      } catch (loginError) {
        const detail = loginError.response?.data?.detail || 'Unable to log in with the provided credentials.';
        setError(detail);
        throw new Error(detail);
      } finally {
        setIsAuthenticating(false);
      }
    },
    [saveTokens],
  );

  const register = useCallback(
    async (payload) => {
      setIsAuthenticating(true);
      setError(null);
      try {
        await api.post('/users/register/', payload);
        await login({ email: payload.email, password: payload.password });
        return { success: true };
      } catch (registerError) {
        const detail =
          registerError.response?.data?.email?.[0] || registerError.response?.data?.detail || 'Registration failed.';
        setError(detail);
        throw new Error(detail);
      } finally {
        setIsAuthenticating(false);
      }
    },
    [login],
  );

  const requestPasswordReset = useCallback(async (email) => {
    await api.post('/users/forgot-password/', { email });
    return { success: true };
  }, []);

  const logout = useCallback(() => {
    clearAuthState();
  }, [clearAuthState]);

  const value = useMemo(
    () => ({
      user,
      tokens,
      authError: error,
      isAuthenticating,
      login,
      logout,
      register,
      requestPasswordReset,
      refreshProfile: fetchProfile,
      isAdmin: Boolean(user?.is_admin || user?.is_staff || user?.is_superuser),
      isAuthenticated: Boolean(user),
      hasTokens: Boolean(tokens?.access),
    }),
    [user, tokens, error, isAuthenticating, login, logout, register, requestPasswordReset, fetchProfile],
  );

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === STORAGE_KEYS.tokens && !event.newValue) {
        clearAuthState();
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [clearAuthState]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
