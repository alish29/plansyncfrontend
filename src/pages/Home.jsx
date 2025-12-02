// src/pages/HomePage.jsx
import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { CalendarCheck, Sparkles, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

import GlassCard from '../components/common/GlassCard.jsx';
import api from '../utils/api.js';
import { resolvedBase } from '../utils/api.js'; // optional: for quick console check

const features = [ /* same as before... */ ];
const testimonials = [ /* same as before... */ ];

const HomePage = () => {
  const [events, setEvents] = useState([]);
  const [isLoadingEvents, setIsLoadingEvents] = useState(false);

  useEffect(() => {
    let isMounted = true;
    console.log('HomePage mounted. api base:', resolvedBase);

    const fetchEvents = async () => {
      setIsLoadingEvents(true);
      try {
        const { data } = await api.get('/events/'); // api prints request in console
        console.log('Fetched events:', data);
        if (isMounted) {
          setEvents(Array.isArray(data) ? data : []);
        }
      } catch (error) {
        console.error('Failed to load events', error);
      } finally {
        if (isMounted) {
          setIsLoadingEvents(false);
        }
      }
    };

    fetchEvents();

    return () => {
      isMounted = false;
    };
  }, []);

  const latestEvents = events.slice(0, 6);

  return (
    <div className="space-y-20 lg:space-y-28">
      {/* ... your existing hero section ... */}
      <section id="events" className="space-y-12">
        <div className="flex flex-col items-center text-center">
          <h2 className="font-display text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl md:text-5xl">
            See what's coming up
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-300">
            Explore upcoming events added by the PlanSync community. Sign in to publish your own milestones.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {isLoadingEvents && (
            <GlassCard className="col-span-full flex items-center justify-center text-slate-500 dark:text-slate-300">
              Loading events...
            </GlassCard>
          )}
          {!isLoadingEvents && latestEvents.length === 0 && (
            <GlassCard className="col-span-full flex flex-col items-center gap-2 text-center text-slate-500 dark:text-slate-300">
              <span className="text-lg font-semibold text-slate-700 dark:text-slate-100">No events yet.</span>
              <span>Sign in to be the first to share what you're planning.</span>
            </GlassCard>
          )}
          {!isLoadingEvents &&
            latestEvents.map((event, index) => (
              <GlassCard key={event.id} delay={index * 0.05} className="flex flex-col gap-4 transition-all duration-300 hover:scale-105">
                <span className="text-xs font-bold uppercase tracking-wide text-primary dark:text-primary">
                  {event.event_date ? format(new Date(event.event_date), 'PPPP • p') : 'Date TBA'}
                </span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">{event.title}</h3>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{event.description || 'Stay tuned for details.'}</p>
                <span className="mt-auto text-sm font-medium text-slate-500 dark:text-slate-400">
                  Hosted by {event.created_by_name || event.created_by_email || 'a PlanSync member'}
                </span>
              </GlassCard>
            ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
