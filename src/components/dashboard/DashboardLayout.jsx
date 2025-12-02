import { motion } from 'framer-motion';

import Sidebar from './Sidebar.jsx';

const DashboardLayout = ({ title, subtitle, actions = null, children }) => (
  <div className="grid gap-6 md:grid-cols-[260px,1fr]">
    <Sidebar />
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col gap-6"
    >
      <div className="rounded-3xl border border-white/20 bg-white/70 p-6 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-black/70">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-semibold text-slate-900 dark:text-white">{title}</h1>
            {subtitle && <p className="text-sm text-slate-500 dark:text-slate-300">{subtitle}</p>}
          </div>
          {actions}
        </div>
      </div>
      {children}
    </motion.section>
  </div>
);

export default DashboardLayout;
