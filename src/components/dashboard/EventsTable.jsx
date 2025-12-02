import { format } from 'date-fns';
import { motion } from 'framer-motion';

const EventsTable = ({ events = [], title = 'Upcoming Events' }) => (
  <div className="rounded-3xl border border-white/20 bg-white/70 p-6 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-black/70">
    <div className="flex items-center justify-between">
      <div>
        <h3 className="font-display text-xl font-semibold text-slate-900 dark:text-white">{title}</h3>
        <p className="text-sm text-slate-500 dark:text-slate-300">Latest events synced with your PlanSync workspace.</p>
      </div>
    </div>
    <div className="mt-4 overflow-hidden rounded-3xl border border-white/30 dark:border-white/10">
      <motion.table className="w-full table-auto border-collapse text-left text-sm">
        <thead className="bg-white/70 text-xs uppercase tracking-wide text-slate-500 dark:bg-black/70 dark:text-slate-400">
          <tr>
            <th className="px-4 py-3 font-semibold">Event</th>
            <th className="px-4 py-3 font-semibold">Date</th>
            <th className="px-4 py-3 font-semibold">Description</th>
            <th className="px-4 py-3 font-semibold">Owner</th>
          </tr>
        </thead>
        <tbody>
          {events.length === 0 && (
            <tr>
              <td colSpan={4} className="px-4 py-6 text-center text-slate-400 dark:text-slate-500">
                No events scheduled yet. Add your first milestone to stay on track.
              </td>
            </tr>
          )}
          {events.map((event) => (
            <motion.tr
              key={event.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="border-t border-white/20 bg-white/60 text-slate-600 backdrop-blur-xl transition hover:bg-primary/10 dark:border-white/5 dark:bg-black/60 dark:text-slate-200"
            >
              <td className="px-4 py-3 font-semibold text-slate-700 dark:text-white">{event.title}</td>
              <td className="px-4 py-3">{format(new Date(event.event_date), 'PPP • p')}</td>
              <td className="px-4 py-3 text-slate-500 dark:text-slate-300">{event.description || '—'}</td>
              <td className="px-4 py-3 text-slate-500 dark:text-slate-300">
                {event.created_by_name || event.created_by_email || 'You'}
              </td>
            </motion.tr>
          ))}
        </tbody>
      </motion.table>
    </div>
  </div>
);

export default EventsTable;
