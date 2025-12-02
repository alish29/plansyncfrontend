import { useCallback, useEffect, useMemo, useState } from 'react';
import { formatISO } from 'date-fns';
import { motion } from 'framer-motion';

import DashboardLayout from '../../components/dashboard/DashboardLayout.jsx';
import EventCalendar from '../../components/dashboard/EventCalendar.jsx';
import EventsTable from '../../components/dashboard/EventsTable.jsx';
import StatsCard from '../../components/dashboard/StatsCard.jsx';
import FormInput from '../../components/common/FormInput.jsx';
import api from '../../utils/api.js';
import { useAuth } from '../../context/AuthContext.jsx';

const defaultEventForm = {
  title: '',
  description: '',
  event_date: '',
};

const UserDashboard = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formState, setFormState] = useState(defaultEventForm);
  const [feedback, setFeedback] = useState(null);

  const loadEvents = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/events/');
      setEvents(data);
    } catch (error) {
      console.error('Unable to fetch events', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadEvents();
  }, [loadEvents]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFeedback(null);
    try {
      await api.post('/events/', {
        title: formState.title,
        description: formState.description,
        event_date: formatISO(new Date(formState.event_date)),
      });
      setFormState(defaultEventForm);
      setFeedback({ type: 'success', message: 'Event added successfully.' });
      loadEvents();
    } catch (error) {
      const detail = error.response?.data?.detail || 'Failed to create event. Please try again.';
      setFeedback({ type: 'error', message: detail });
    }
  };

  const stats = useMemo(() => {
    const total = events.length;
    const upcoming = events.filter((item) => new Date(item.event_date) > new Date()).length;
    return {
      total,
      upcoming,
      completed: Math.max(total - upcoming, 0),
    };
  }, [events]);

  return (
    <DashboardLayout
      title={`Welcome back, ${user?.first_name || 'Planner'}!`}
      subtitle="Your personalized command center for stress-free events."
    >
      <div className="grid gap-6 md:grid-cols-3">
        <StatsCard label="Total events" value={stats.total} accent="primary" />
        <StatsCard label="Upcoming" value={stats.upcoming} accent="secondary" trend={stats.upcoming ? 12 : null} />
        <StatsCard label="Completed" value={stats.completed} accent="primary" trend={stats.completed ? 5 : null} />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr,0.8fr]">
        <EventCalendar events={events} />
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          onSubmit={handleSubmit}
          className="glass-card rounded-3xl p-6"
        >
          <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white">Quick add event</h3>
          <p className="mt-2 text-sm font-medium text-slate-500 dark:text-slate-300">Stay ahead by capturing milestones instantly.</p>
          <div className="mt-6 space-y-4">
            <FormInput
              label="Event title"
              name="title"
              value={formState.title}
              onChange={handleChange}
              placeholder="Executive Retreat"
            />
            <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
              Description
              <textarea
                name="description"
                value={formState.description}
                onChange={handleChange}
                placeholder="Add optional notes for your team."
                rows={3}
                className="rounded-2xl border-2 border-slate-200 bg-white/90 px-4 py-3 text-sm shadow-sm transition-all duration-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 dark:border-slate-700 dark:bg-black/90 dark:focus:border-primary dark:focus:ring-primary/30"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
              Date & time
              <input
                type="datetime-local"
                name="event_date"
                value={formState.event_date}
                onChange={handleChange}
                required
                className="rounded-2xl border-2 border-slate-200 bg-white/90 px-4 py-3 text-sm shadow-sm transition-all duration-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 dark:border-slate-700 dark:bg-black/90 dark:focus:border-primary dark:focus:ring-primary/30"
              />
            </label>
            {feedback && (
              <p
                className={`rounded-3xl px-4 py-3 text-sm ${
                  feedback.type === 'success'
                    ? 'bg-emerald-100/70 text-emerald-700'
                    : 'bg-secondary/10 text-secondary'
                }`}
              >
                {feedback.message}
              </p>
            )}
            <button
              type="submit"
              className="w-full rounded-full bg-gradient-to-r from-primary to-secondary px-6 py-3 text-sm font-bold text-white shadow-xl shadow-primary/50 transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-primary/70"
            >
              Add event
            </button>
          </div>
        </motion.form>
      </div>

      <EventsTable events={events} title={loading ? 'Loading events...' : 'Recent events'} />
    </DashboardLayout>
  );
};

export default UserDashboard;
