import { useMemo, useState } from 'react';
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  startOfMonth,
  startOfWeek,
} from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const EventCalendar = ({ events = [] }) => {
  const [currentMonth, setCurrentMonth] = useState(() => new Date());

  const monthRange = useMemo(() => {
    const start = startOfWeek(startOfMonth(currentMonth), { weekStartsOn: 0 });
    const end = endOfWeek(endOfMonth(currentMonth), { weekStartsOn: 0 });
    return eachDayOfInterval({ start, end });
  }, [currentMonth]);

  const eventsByDate = useMemo(() => {
    const map = new Map();
    events.forEach((event) => {
      const dateKey = format(new Date(event.event_date), 'yyyy-MM-dd');
      if (!map.has(dateKey)) {
        map.set(dateKey, []);
      }
      map.get(dateKey).push(event);
    });
    return map;
  }, [events]);

  const handleMonthChange = (direction) => {
    setCurrentMonth((prev) => addMonths(prev, direction));
  };

  return (
    <div className="rounded-3xl border border-white/20 bg-white/70 p-6 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-black/70">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-xl font-semibold text-slate-900 dark:text-white">Event Calendar</h2>
          <p className="text-sm text-slate-500 dark:text-slate-300">Keep track of upcoming milestones and celebrations.</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => handleMonthChange(-1)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-3xl border border-white/30 bg-white/70 text-primary hover:bg-primary/10 dark:border-white/10 dark:bg-black/80 dark:text-secondary"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <span className="text-sm font-semibold text-slate-600 dark:text-slate-200">
            {format(currentMonth, 'MMMM yyyy')}
          </span>
          <button
            type="button"
            onClick={() => handleMonthChange(1)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-3xl border border-white/30 bg-white/70 text-primary hover:bg-primary/10 dark:border-white/10 dark:bg-black/80 dark:text-secondary"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-7 gap-3 text-center text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <span key={day}>{day}</span>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-7 gap-3 text-sm">
        {monthRange.map((date) => {
          const dateKey = format(date, 'yyyy-MM-dd');
          const dailyEvents = eventsByDate.get(dateKey) || [];
          const isCurrentMonth = isSameMonth(date, currentMonth);
          const isToday = isSameDay(date, new Date());

          return (
            <motion.div
              key={date.toISOString()}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex min-h-[110px] flex-col gap-1 rounded-3xl border p-3 text-left ${
                isCurrentMonth
                  ? 'border-white/30 bg-white/60 dark:border-white/10 dark:bg-black/60'
                  : 'border-dashed border-white/20 bg-white/30 text-slate-400 dark:border-white/5 dark:bg-black/30'
              } ${isToday ? 'ring-2 ring-primary/40 dark:ring-secondary/40' : ''}`}
            >
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-300">{format(date, 'd')}</span>
              <div className="flex flex-col gap-2">
                {dailyEvents.slice(0, 2).map((event) => (
                  <div key={event.id} className="rounded-3xl bg-primary/10 px-2 py-1 text-xs font-semibold text-primary dark:bg-secondary/20 dark:text-secondary">
                    {event.title}
                  </div>
                ))}
                {dailyEvents.length > 2 && (
                  <span className="text-xs text-slate-400 dark:text-slate-500">+ {dailyEvents.length - 2} more</span>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default EventCalendar;
