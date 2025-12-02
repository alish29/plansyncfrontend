import { useCallback, useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';

import DashboardLayout from '../../components/dashboard/DashboardLayout.jsx';
import AnalyticsChart from '../../components/dashboard/AnalyticsChart.jsx';
import EventsTable from '../../components/dashboard/EventsTable.jsx';
import StatsCard from '../../components/dashboard/StatsCard.jsx';
import api from '../../utils/api.js';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [events, setEvents] = useState([]);

  const loadDashboard = useCallback(async () => {
    try {
      const [statsResponse, eventsResponse] = await Promise.all([
        api.get('/dashboard/stats/'),
        api.get('/events/'),
      ]);
      setStats(statsResponse.data);
      setEvents(eventsResponse.data);
    } catch (error) {
      console.error('Failed to load dashboard data', error);
    }
  }, []);

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  const chartData = useMemo(() => {
    if (!stats?.monthly_breakdown) return [];
    return stats.monthly_breakdown.map((item) => ({
      label: item.label,
      value: item.value,
      secondary: Math.max(Math.round(item.value * 0.6), 0),
    }));
  }, [stats]);

  const utilization = stats?.utilization || { planned: 0, completed: 0, pending: 0 };

  return (
    <DashboardLayout
      title="Admin insights"
      subtitle="Monitor performance, team momentum, and event health across your organization."
    >
      <div className="grid gap-6 md:grid-cols-3">
        <StatsCard label="Total events" value={stats?.summary?.total_events ?? 0} trend={18} accent="primary" />
        <StatsCard label="Upcoming" value={stats?.summary?.upcoming_events ?? 0} trend={12} accent="secondary" />
        <StatsCard label="Events this week" value={stats?.summary?.past_week_events ?? 0} trend={5} accent="primary" />
      </div>

      <AnalyticsChart data={chartData} title="Team planning velocity" />

      <div className="grid gap-6 md:grid-cols-3">
        {[
          { label: 'Planned capacity', value: `${utilization.planned}%`, accent: 'primary' },
          { label: 'Completed milestones', value: `${utilization.completed}%`, accent: 'secondary' },
          { label: 'Pending items', value: `${utilization.pending}%`, accent: 'primary' },
        ].map((item) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="glass-card rounded-3xl p-6"
          >
            <p className="text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-300">{item.label}</p>
            <p className="mt-3 text-3xl font-bold text-primary dark:text-secondary">{item.value}</p>
            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
              Keep optimizing resource planning to maintain smooth execution.
            </p>
          </motion.div>
        ))}
      </div>

      <EventsTable events={events.slice(0, 8)} title="Event overview" />
    </DashboardLayout>
  );
};

export default AdminDashboard;
