import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';

import { useAuth } from '../../context/AuthContext.jsx';
import { NAV_LINKS } from '../../utils/constants.js';

/**
 * Refactored Navbar with an integrated, attractive ThemeToggle.
 * - Exports a default Navbar component
 * - Local ThemeToggle uses a pill-style animated switch with icons
 * - Mobile menu uses framer-motion for smooth open/close
 * - Uses Tailwind utility classes (assumes Tailwind + dark mode configured)
 */

const ThemeToggle = ({ className = '' }) => {
  // We keep theme state local for demo; replace with your theme context or storage
  const [isDark, setIsDark] = useState(() => {
    try {
      return (localStorage.getItem('theme') || 'light') === 'dark';
    } catch (e) {
      return false;
    }
  });

  const toggle = () => {
    const next = !isDark;
    setIsDark(next);
    try {
      localStorage.setItem('theme', next ? 'dark' : 'light');
      document.documentElement.classList.toggle('dark', next);
    } catch (e) {
      // ignore
    }
  };

  return (
    <button
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      onClick={toggle}
      className={`relative inline-flex items-center gap-2 rounded-full px-1.5 py-0.5 transition-shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${className}`}
    >
      <span
        className={`absolute inset-0 -z-10 rounded-full transition-colors duration-300 ${isDark ? 'bg-gradient-to-r from-slate-800 to-slate-700 shadow-[0_6px_18px_rgba(15,23,42,0.35)]' : 'bg-gradient-to-r from-yellow-200/60 to-white/60 shadow-[0_6px_18px_rgba(250,204,21,0.12)]'}`}
      />

      {/* animated knob */}
      <span className="relative flex items-center gap-2 px-2">
        <motion.span
          layout
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          className={`flex h-8 w-16 items-center rounded-full p-0.5 text-sm font-medium shadow-sm`}
        >
          <motion.span
            className={`relative z-10 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 shadow-sm dark:bg-slate-900/95`}
            animate={{ x: isDark ? 24 : 0 }}
            transition={{ type: 'spring', stiffness: 600, damping: 35 }}
          >
            {isDark ? <Moon className="h-4 w-4 text-slate-700" /> : <Sun className="h-4 w-4 text-yellow-500" />}
          </motion.span>

          {/* subtle icon placeholders on left/right */}
          <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs opacity-0 md:opacity-100">☀️</span>
          <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs opacity-0 md:opacity-100">🌙</span>
        </motion.span>
      </span>
    </button>
  );
};

const Navbar = () => {
  const { isAuthenticated, isAdmin, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const closeMenu = () => setMobileOpen(false);

  const navItems = (
    <ul className="flex flex-col gap-6 text-lg font-medium text-slate-600 dark:text-slate-200 md:flex-row md:items-center md:gap-8">
      {NAV_LINKS.map(({ label, href }) => (
        <li key={href}>
          <Link
            to={href}
            className="relative inline-block px-1 py-0.5 transition-all hover:text-primary dark:hover:text-accent"
            onClick={closeMenu}
          >
            <span className="relative z-10">{label}</span>
            <span className="absolute left-0 -bottom-1 block h-0.5 w-0 rounded-full bg-primary transition-all duration-300 group-hover:w-full" />
          </Link>
        </li>
      ))}

      {isAuthenticated && (
        <li>
          <Link
            to={isAdmin ? '/admin' : '/dashboard'}
            onClick={closeMenu}
            className="rounded-full bg-gradient-to-r from-primary to-secondary px-6 py-2.5 font-semibold text-white shadow-lg shadow-primary/40 transition-transform duration-300 hover:-translate-y-0.5 hover:scale-105"
          >
            {isAdmin ? 'Admin Portal' : 'My Planner'}
          </Link>
        </li>
      )}

      {isAuthenticated ? (
        <li>
          <button
            type="button"
            onClick={() => {
              logout();
              closeMenu();
            }}
            className="text-sm font-semibold text-slate-500 hover:text-secondary dark:text-slate-400"
          >
            Log out
          </button>
        </li>
      ) : (
        <li className="flex items-center gap-4">
          <Link
            to="/login"
            onClick={closeMenu}
            className="text-sm font-semibold text-slate-500 hover:text-primary dark:text-slate-300"
          >
            Log in
          </Link>
          <Link
            to="/register"
            onClick={closeMenu}
            className="rounded-full bg-gradient-to-r from-primary to-secondary px-5 py-2 text-sm font-semibold text-white shadow-md transition transform duration-200 hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary/30"
          >
            Get Started
          </Link>
        </li>
      )}
    </ul>
  );

  return (
    <header className="sticky top-0 z-50 border-b border-primary/10 bg-white/80 backdrop-blur-xl shadow-sm transition dark:border-primary/20 dark:bg-black/80">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3 font-display text-xl font-bold text-primary transition hover:opacity-80 dark:text-primary">
          {/* <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary text-white shadow-lg shadow-primary/30">
            PS
          </span> */}
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">PlanSync</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navItems}
          <ThemeToggle className="ml-2" />
        </nav>

        {/* Mobile menu button */}
        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            className="inline-flex h-12 w-12 items-center justify-center rounded-3xl border border-white/40 bg-white/70 text-primary transition hover:shadow-lg dark:border-white/10 dark:bg-black/70 dark:text-primary"
            onClick={() => setMobileOpen((p) => !p)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            id="mobile-navigation"
            key="mobile-nav"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28 }}
            className="mx-4 mb-4 rounded-2xl border border-primary/20 bg-white/90 p-6 shadow-glass backdrop-blur-xl dark:border-primary/20 dark:bg-black/90 md:hidden"
          >
            <div className="mb-6 flex items-center justify-between">
              <div />
              <span className="text-sm text-slate-500 dark:text-slate-300">{location.pathname}</span>
            </div>
            {navItems}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
