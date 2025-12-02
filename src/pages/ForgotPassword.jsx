import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';

import FormInput from '../components/common/FormInput.jsx';
import GlassCard from '../components/common/GlassCard.jsx';
import { useAuth } from '../context/AuthContext.jsx';

const ForgotPasswordPage = () => {
  const { requestPasswordReset } = useAuth();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);
  const reduceMotion = useReducedMotion();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus(null);
    setError(null);
    try {
      await requestPasswordReset(email);
      setStatus('If your email exists in our records, you will receive a reset link shortly.');
      setEmail('');
    } catch (submitError) {
      setError(submitError?.message || 'Unable to process your request at this time.');
    }
  };

  // small, mobile-first container; p-6 on mobile and p-10 on larger screens
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4 py-8">
      <GlassCard className="w-full max-w-md sm:max-w-xl p-0">
        <motion.form
          onSubmit={handleSubmit}
          initial={reduceMotion ? {} : { opacity: 0, y: 18 }}
          animate={reduceMotion ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="rounded-3xl bg-white/90 p-6 sm:p-10 shadow-inner dark:bg-black/80"
        >
          <h2 className="font-display text-2xl sm:text-3xl font-semibold text-slate-900 dark:text-white">
            Forgot your password?
          </h2>

          <p className="mt-3 text-sm text-slate-500 dark:text-slate-300">
            Enter your email address and we'll send you instructions to reset your password.
          </p>

          <div className="mt-6">
            <FormInput
              label="Email"
              type="email"
              name="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@plansync.com"
              autoComplete="email"
              required
            />
          </div>

          <div className="mt-4" aria-live="polite" role="status">
            {status && (
              <p className="rounded-2xl bg-emerald-100/80 px-4 py-3 text-sm text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-200">
                {status}
              </p>
            )}
            {error && (
              <p className="rounded-2xl bg-rose-100/80 px-4 py-3 text-sm text-rose-800 dark:bg-rose-900/30 dark:text-rose-200">
                {error}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="mt-6 w-full rounded-full bg-gradient-to-r from-primary to-secondary px-6 py-3 text-lg font-bold text-white shadow-2xl transition-transform duration-200 hover:-translate-y-0.5"
          >
            Send reset link
          </button>

          <Link
            to="/login"
            className="mt-4 block text-center text-sm font-semibold text-primary hover:underline dark:text-secondary"
          >
            Back to login
          </Link>
        </motion.form>
      </GlassCard>
    </div>
  );
};

export default ForgotPasswordPage;
