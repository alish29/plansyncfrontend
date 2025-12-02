import { NavLink } from 'react-router-dom';
import { CalendarDays, LayoutDashboard, LogOut, Settings } from 'lucide-react';

import { useAuth } from '../../context/AuthContext.jsx';

const linkClasses = ({ isActive }) =>
  `flex items-center gap-3 rounded-3xl px-4 py-3 text-sm font-semibold transition ${
    isActive
      ? 'bg-primary/15 text-primary shadow-lg shadow-primary/30 dark:bg-secondary/20 dark:text-secondary'
      : 'text-slate-500 hover:bg-white/40 hover:text-primary dark:text-slate-300 dark:hover:bg-white/5'
  }`;

const Sidebar = ({ onNavigate }) => {
  const { user, isAdmin, logout } = useAuth();

  return (
    <aside className="flex h-full flex-col gap-6 rounded-3xl border border-white/20 bg-white/60 p-6 shadow-xl backdrop-blur-2xl dark:border-white/10 dark:bg-black/70">
      <div className="flex items-center gap-4 rounded-3xl border border-white/30 bg-white/70 p-4 shadow-inner dark:border-white/10 dark:bg-black/70">
        <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-primary/20 text-lg font-bold text-primary dark:bg-secondary/25 dark:text-secondary">
          {user?.first_name?.[0] || user?.email?.[0]}
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-700 dark:text-slate-100">{user?.first_name || 'Event Planner'}</p>
          <p className="text-xs text-slate-500 dark:text-slate-300">{user?.email}</p>
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-2 text-sm">
        <NavLink to="/dashboard" className={linkClasses} onClick={onNavigate}>
          <CalendarDays className="h-5 w-5" />
          My Schedule
        </NavLink>
        {isAdmin && (
          <NavLink to="/admin" className={linkClasses} onClick={onNavigate}>
            <LayoutDashboard className="h-5 w-5" />
            Admin Overview
          </NavLink>
        )}
        <button
          type="button"
          className="flex items-center gap-3 rounded-3xl px-4 py-3 text-left text-sm font-semibold text-slate-500 transition hover:bg-white/40 hover:text-secondary dark:text-slate-300 dark:hover:bg-white/5"
          onClick={logout}
        >
          <LogOut className="h-5 w-5" />
          Sign out
        </button>
      </nav>

      <div className="rounded-3xl border border-dashed border-white/40 bg-white/40 p-4 text-xs text-slate-500 dark:border-white/10 dark:bg-black/60 dark:text-slate-300">
        <p className="font-semibold text-slate-700 dark:text-slate-100">Need adjustments?</p>
        <p>Customize your experience in settings.</p>
        <button
          type="button"
          className="mt-3 inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-xs font-semibold text-primary shadow-sm hover:text-secondary dark:bg-black/80 dark:text-secondary"
        >
          <Settings className="h-4 w-4" />
          Settings (coming soon)
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
