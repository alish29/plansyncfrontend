// src/pages/ContactPage.jsx
import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import GlassCard from '../components/common/GlassCard.jsx';

const ContactPage = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null);
  const reduceMotion = useReducedMotion();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // replace with real submission logic
    setStatus('success');
    setTimeout(() => {
      setStatus(null);
      setFormState({ name: '', email: '', message: '' });
    }, 3000);
  };

  const fadeUp = reduceMotion
    ? {}
    : { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.45 } };

  return (
    <main className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
      <section className="text-center mb-10">
        <motion.div {...fadeUp}>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white">
            <span className="bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
              Contact Us
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm sm:text-base text-gray-600 dark:text-gray-300">
            Have questions? Send us a message — we'll reply as soon as possible.
          </p>
        </motion.div>
      </section>

      <section className="grid gap-8 md:grid-cols-2">
        <motion.div
          {...(reduceMotion ? {} : { initial: { opacity: 0, x: -20 }, animate: { opacity: 1, x: 0 }, transition: { duration: 0.5 } })}
          className="space-y-6"
        >
          <GlassCard className="space-y-6 p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Get in touch</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              Planning an event? Tell us the details and we’ll help you make it happen.
            </p>

            <div className="space-y-4">
              <div className="rounded-2xl border p-4 bg-white/60 dark:bg-black/50">
                <p className="text-xs font-semibold text-primary">Email</p>
                <a className="block mt-1 text-sm truncate text-gray-800 dark:text-gray-200" href="mailto:alishk2211@gmail.com">
                  alishk2211@gmail.com
                </a>
              </div>

              <div className="rounded-2xl border p-4 bg-white/60 dark:bg-black/50">
                <p className="text-xs font-semibold text-primary">Phone</p>
                <a className="block mt-1 text-sm text-gray-800 dark:text-gray-200" href="tel:+919302594411">
                  +91 9302594411
                </a>
              </div>

              <div className="rounded-2xl border p-4 bg-white/60 dark:bg-black/50">
                <p className="text-xs font-semibold text-primary">Office Hours</p>
                <p className="mt-1 text-sm text-gray-800 dark:text-gray-200">
                  Mon–Fri: 9:00 AM – 6:00 PM<br />
                  Sat: 10:00 AM – 4:00 PM<br />
                  Sun: Closed
                </p>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        <motion.div
          {...(reduceMotion ? {} : { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, transition: { duration: 0.5 } })}
        >
          <GlassCard className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Send us a message</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <label className="block text-sm">
                <span className="font-medium text-gray-700 dark:text-gray-200">Name</span>
                <input
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  autoComplete="name"
                  type="text"
                  required
                  className="mt-2 block w-full rounded-lg border border-gray-200 bg-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/30 dark:bg-black/80 dark:border-gray-700"
                  placeholder="Your name"
                />
              </label>

              <label className="block text-sm">
                <span className="font-medium text-gray-700 dark:text-gray-200">Email</span>
                <input
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  autoComplete="email"
                  type="email"
                  required
                  className="mt-2 block w-full rounded-lg border border-gray-200 bg-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/30 dark:bg-black/80 dark:border-gray-700"
                  placeholder="you@example.com"
                />
              </label>

              <label className="block text-sm">
                <span className="font-medium text-gray-700 dark:text-gray-200">Message</span>
                <textarea
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  rows={5}
                  required
                  className="mt-2 block w-full rounded-lg border border-gray-200 bg-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/30 dark:bg-black/80 dark:border-gray-700"
                  placeholder="Tell us about your event..."
                />
              </label>

              <div aria-live="polite" role="status">
                {status === 'success' && (
                  <div className="rounded-md bg-emerald-100 px-4 py-2 text-sm text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200">
                    Thanks — we received your message!
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="mt-2 w-full rounded-full bg-gradient-to-r from-secondary to-primary px-5 py-3 text-white font-semibold shadow hover:scale-[1.01] transition-transform"
              >
                Send Message
              </button>
            </form>
          </GlassCard>
        </motion.div>
      </section>
    </main>
  );
};

export default ContactPage;
