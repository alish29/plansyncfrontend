import { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';

import FormInput from '../components/common/FormInput.jsx';
import GlassCard from '../components/common/GlassCard.jsx';
import { useAuth } from '../context/AuthContext.jsx';

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, authError, isAuthenticating } = useAuth();

  const [formState, setFormState] = useState({ email: '', password: '' });
  const [formError, setFormError] = useState(null);

  const reduceMotion = useReducedMotion();
  const fromPath = location.state?.from?.pathname || '/dashboard';

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormError(null);
    try {
      await login(formState);
      navigate(fromPath, { replace: true });
    } catch (error) {
      setFormError(error.message || 'Invalid credentials');
    }
  };

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-10">
      <GlassCard className="w-full max-w-4xl p-0">
        <div className="grid overflow-hidden rounded-3xl bg-white/90 shadow-inner dark:bg-black/80 md:grid-cols-2">

          {/* LEFT SIDE – hidden on mobile */}
          <motion.div
            initial={reduceMotion ? {} : { opacity: 0, x: -20 }}
            animate={reduceMotion ? {} : { opacity: 1, x: 0 }}
            transition={{ duration: 0.45 }}
            className="hidden flex-col justify-between bg-gradient-to-br from-primary/20 via-white/40 to-secondary/20 p-8 text-slate-800 backdrop-blur-sm dark:from-primary/10 dark:via-slate-900/70 dark:to-secondary/10 md:flex"
          >
            <div>
              <h2 className="font-display text-3xl font-semibold dark:text-white">
                Welcome back
              </h2>
              <p className="mt-4 text-sm text-slate-700/80 dark:text-slate-300">
                Your events are waiting. Sign in and continue planning with PlanSync.
              </p>
            </div>
          </motion.div>

          {/* RIGHT SIDE — LOGIN FORM */}
          <motion.form
            onSubmit={handleSubmit}
            initial={reduceMotion ? {} : { opacity: 0, x: 20 }}
            animate={reduceMotion ? {} : { opacity: 1, x: 0 }}
            transition={{ duration: 0.45 }}
            className="flex flex-col gap-6 p-6 sm:p-10"
          >
            <div>
              <h2 className="font-display text-2xl sm:text-3xl font-semibold text-slate-900 dark:text-white">
                Sign in to PlanSync
              </h2>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-300">
                Access your dashboard, tasks, and planning tools.
              </p>
            </div>

            {/* Email */}
            <FormInput
              label="Email"
              type="email"
              name="email"
              value={formState.email}
              placeholder="you@plansync.com"
              autoComplete="email"
              onChange={handleChange}
              required
            />

            {/* Password */}
            <FormInput
              label="Password"
              type="password"
              name="password"
              value={formState.password}
              placeholder="********"
              autoComplete="current-password"
              onChange={handleChange}
              required
            />

            {/* ERROR MESSAGE */}
            <div aria-live="polite" role="alert">
              {(formError || authError) && (
                <p className="rounded-2xl border border-red-300 bg-red-100/70 px-4 py-3 text-sm text-red-700 dark:border-red-500/40 dark:bg-red-900/20 dark:text-red-300">
                  {formError || authError}
                </p>
              )}
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={isAuthenticating}
              className="flex items-center justify-center rounded-full bg-gradient-to-r from-primary to-secondary px-8 py-4 text-lg font-bold text-white shadow-xl transition-transform duration-200 hover:-translate-y-1 hover:scale-105 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100 disabled:hover:translate-y-0"
            >
              {isAuthenticating ? 'Signing in...' : 'Sign in'}
            </button>

            {/* Extra Links */}
            <div className="flex flex-col gap-2 text-sm text-slate-600 dark:text-slate-300">
              <Link
                to="/forgot-password"
                className="font-semibold text-primary hover:underline dark:text-secondary"
              >
                Forgot your password?
              </Link>

              <span>
                New here?{' '}
                <Link to="/register" className="font-semibold text-primary hover:underline dark:text-secondary">
                  Create an account
                </Link>
              </span>
            </div>
          </motion.form>
        </div>
      </GlassCard>
    </div>
  );
};

export default LoginPage;
