// src/pages/FeaturesPage.jsx
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { CalendarCheck, Sparkles, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import GlassCard from '../components/common/GlassCard.jsx';

const features = [
  {
    title: 'Smart Scheduling',
    description: 'Coordinate tasks, vendors, and timelines in one collaborative hub with automated reminders.',
    icon: CalendarCheck,
    details: [
      'Automated timeline generation based on event type',
      'Real-time synchronization across team members',
      'Smart conflict detection',
      'Customizable reminders',
      'Calendar integrations',
    ],
  },
  {
    title: 'Team Collaboration',
    description: 'Invite teammates and stakeholders, assign responsibilities, and share progress in real time.',
    icon: Users,
    details: [
      'Role-based access control',
      'Real-time collaboration tools',
      'Comment threads on tasks',
      'Activity feed',
      'File sharing',
    ],
  },
  {
    title: 'AI Suggestions',
    description: 'Receive intelligent recommendations for vendors, budgets, and contingency planning powered by insights.',
    icon: Sparkles,
    details: [
      'Vendor recommendations',
      'Budget optimization',
      'Risk assessment',
      'Timeline optimization',
      'Personalized insights',
    ],
  },
];

const cardVariant = (i) => ({
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, delay: i * 0.08 } },
});

const FeaturesPage = () => {
  const reduceMotion = useReducedMotion();

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 py-10 lg:py-16">
      {/* Header */}
      <header className="text-center mb-10">
        <motion.div
          initial={reduceMotion ? {} : { opacity: 0, y: 18 }}
          animate={reduceMotion ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Features
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm sm:text-base text-slate-600 dark:text-slate-300">
            Discover how PlanSync transforms event planning with powerful features designed for modern teams.
          </p>
        </motion.div>
      </header>

      {/* Feature grid */}
      <section className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {features.map(({ title, description, icon: Icon, details }, idx) => (
          <motion.div
            key={title}
            className="w-full"
            variants={reduceMotion ? undefined : cardVariant(idx)}
            initial={reduceMotion ? undefined : 'hidden'}
            animate={reduceMotion ? undefined : 'show'}
          >
            <GlassCard className="p-5 sm:p-6 h-full flex flex-col">
              {/* Icon + title */}
              <div className="flex flex-col items-center text-center">
                <span className="inline-flex h-16 w-16 items-center justify-center rounded-xl
                  bg-gradient-to-br from-primary/10 to-secondary/10 shadow-sm">
                  <Icon className="h-8 w-8 text-primary" aria-hidden />
                </span>

                <h2 className="mt-4 text-lg sm:text-xl font-semibold text-slate-900 dark:text-white">
                  {title}
                </h2>

                <p className="mt-3 text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                  {description}
                </p>
              </div>

              {/* divider */}
              <div className="w-full h-px bg-slate-200/40 dark:bg-slate-700/30 my-4" />

              {/* Details list */}
              <div className="mt-2 flex-1 min-h-[6rem]">
                <h3 className="text-sm font-medium text-slate-800 dark:text-slate-200 mb-3">
                  Key Capabilities
                </h3>
                <ul className="space-y-2">
                  {details.map((d, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300">
                      <span className="mt-1 h-2.5 w-2.5 rounded-full bg-primary flex-shrink-0" />
                      <span className="leading-tight">{d}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA at bottom of card (optional) */}
              <div className="mt-6 pt-3">
                <Link
                  to="/register"
                  className="inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-primary to-secondary px-4 py-2 text-sm font-semibold text-white shadow hover:scale-[1.01] transition-transform"
                >
                  Try it free
                </Link>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </section>

      {/* CTA Banner */}
      <section className="mt-10 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 p-6 sm:p-8 text-center shadow-lg">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">Ready to get started?</h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm sm:text-base text-slate-600 dark:text-slate-300">
          Join thousands of event planners who trust PlanSync for their most important events.
        </p>

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/register"
            className="rounded-full bg-gradient-to-r from-primary to-secondary px-6 py-3 text-sm font-bold text-white shadow"
          >
            Start Planning Now
          </Link>
          <Link
            to="/"
            className="rounded-full border border-primary/30 px-5 py-3 text-sm font-semibold text-primary bg-white/70 dark:bg-black/60"
          >
            Back to Home
          </Link>
        </div>
      </section>
    </main>
  );
};

export default FeaturesPage;
