// src/utils/constants.js
// Keep simple: prefer VITE_API_URL at build time, fallback to the production backend.
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://plansyncbackend.onrender.com/api';

export const STORAGE_KEYS = {
  tokens: 'plansync.tokens',
  theme: 'plansync.theme',
};

export const NAV_LINKS = [
  { label: 'Features', href: '/features' },
  { label: 'Testimonials', href: '/testimonials' },
  { label: 'Contact', href: '/contact' },
];

// quick runtime sanity check (remove in production)
console.log('constants: API_BASE_URL', API_BASE_URL);
