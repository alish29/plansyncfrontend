import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';

import FormInput from '../components/common/FormInput.jsx';
import GlassCard from '../components/common/GlassCard.jsx';
import { useAuth } from '../context/AuthContext.jsx';

const initialForm = {
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register, authError, isAuthenticating } = useAuth();
  const [formState, setFormState] = useState(initialForm);
  const [formError, setFormError] = useState(null);
  const reduceMotion = useReducedMotion();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormError(null);

    if (formState.password !== formState.confirmPassword) {
      setFormError('Passwords do not match.');
      return;
    }

    try {
      await register({
        first_name: formState.first_name,
        last_name: formState.last_name,
        email: formState.email,
        password: formState.password,
      });
      navigate('/dashboard', { replace: true });
    } catch (error) {
      setFormError(error?.message || 'Unable to create account.');
    }
  };

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-10">
      <GlassCard className="w-full max-w-4xl p-0">
        <div className="grid overflow-hidden rounded-3xl bg-white/90 shadow-inner dark:bg-black/80 md:grid-cols-2">

          {/* LEFT PANEL — hidden on small screens */}
          <motion.div
            initial={reduceMotion ? {} : { opacity: 0, x: -18 }}
            animate={reduceMotion ? {} : { opacity: 1, x: 0 }}
            transition={{ duration: 0.45 }}
            className="hidden flex-col justify-between bg-gradient-to-br from-secondary/20 via-white/40 to-primary/20 p-6 sm:p-8 text-slate-800 backdrop-blur-sm dark:from-secondary/10 dark:via-slate-900/70 dark:to-primary/10 md:flex"
          >
            <div>
              <h2 className="font-display text-2xl sm:text-3xl font-semibold dark:text-white">
                Create your planning hub
              </h2>
              <p className="mt-3 text-sm text-slate-700/80 dark:text-slate-300">
                Unlock collaborative timelines, smart assignments, and analytics that keep events stress-free.
              </p>
            </div>

            <ul className="mt-6 space-y-3 text-sm text-slate-600 dark:text-slate-300">
              <li className="rounded-2xl border border-white/20 bg-white/60 p-3 shadow-sm dark:border-white/10 dark:bg-black/70">
                Unlimited events with real-time updates
              </li>
              <li className="rounded-2xl border border-white/20 bg-white/60 p-3 shadow-sm dark:border-white/10 dark:bg-black/70">
                Shareable dashboards for clients and partners
              </li>
              <li className="rounded-2xl border border-white/20 bg-white/60 p-3 shadow-sm dark:border-white/10 dark:bg-black/70">
                Visual analytics to optimize planning
              </li>
            </ul>
          </motion.div>

          {/* FORM */}
          <motion.form
            onSubmit={handleSubmit}
            initial={reduceMotion ? {} : { opacity: 0, x: 18 }}
            animate={reduceMotion ? {} : { opacity: 1, x: 0 }}
            transition={{ duration: 0.45 }}
            className="flex flex-col gap-5 p-6 sm:p-8"
          >
            <div>
              <h2 className="font-display text-2xl sm:text-3xl font-semibold text-slate-900 dark:text-white">
                Join PlanSync
              </h2>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-300">
                Set up your workspace in under a minute.
              </p>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              <FormInput
                label="First name"
                name="first_name"
                value={formState.first_name}
                onChange={handleChange}
                placeholder="First"
                autoComplete="given-name"
                required
              />
              <FormInput
                label="Last name"
                name="last_name"
                value={formState.last_name}
                onChange={handleChange}
                placeholder="Last"
                autoComplete="family-name"
                required
              />
            </div>

            <FormInput
              label="Work email"
              type="email"
              name="email"
              value={formState.email}
              placeholder="hello@plansync.com"
              onChange={handleChange}
              autoComplete="email"
              required
            />

            <div className="grid gap-3 md:grid-cols-2">
              <FormInput
                label="Password"
                type="password"
                name="password"
                value={formState.password}
                onChange={handleChange}
                placeholder="Choose a strong password"
                autoComplete="new-password"
                required
              />
              <FormInput
                label="Confirm password"
                type="password"
                name="confirmPassword"
                value={formState.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm password"
                autoComplete="new-password"
                required
              />
            </div>

            {/* status / error */}
            <div aria-live="polite" role="status">
              {(formError || authError) && (
                <p className="rounded-2xl border border-rose-300 bg-rose-100/80 px-4 py-3 text-sm text-rose-800 dark:border-rose-500/40 dark:bg-rose-900/20 dark:text-rose-200">
                  {formError || authError}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isAuthenticating}
              className="rounded-full bg-gradient-to-r from-secondary to-primary px-6 py-3 text-lg font-bold text-white shadow-2xl transition-transform duration-200 hover:-translate-y-0.5 hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isAuthenticating ? 'Creating account...' : 'Create account'}
            </button>

            <p className="text-sm text-slate-600 dark:text-slate-300">
              Already have an account?{' '}
              <Link to="/login" className="font-semibold text-primary hover:underline dark:text-secondary">
                Sign in
              </Link>
            </p>
          </motion.form>
        </div>
      </GlassCard>
    </div>
  );
};

export default RegisterPage;
