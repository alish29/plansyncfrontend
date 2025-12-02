import { motion } from 'framer-motion';

const StatsCard = ({ label, value, trend = null, accent = 'primary' }) => {
  const trendColor = trend > 0 ? 'text-emerald-500' : trend < 0 ? 'text-rose-500' : 'text-slate-400';
  const accentClass =
    accent === 'secondary'
      ? 'from-secondary/30 via-white/60 to-primary/20 border-secondary/20 text-secondary'
      : 'from-primary/30 via-white/60 to-secondary/20 border-primary/20 text-primary';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`glass-card rounded-3xl border-2 bg-gradient-to-br ${accentClass} p-6 shadow-xl backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl dark:border-primary/20 dark:text-white`}
    >
      <p className="text-xs font-bold uppercase tracking-wide text-slate-600 dark:text-slate-300">{label}</p>
      <p className="mt-3 text-4xl font-extrabold">{value}</p>
      {trend !== null && (
        <p className={`mt-2 text-xs font-semibold ${trendColor}`}>
          {trend > 0 ? `▲ ${trend}% vs last week` : trend < 0 ? `▼ ${Math.abs(trend)}% vs last week` : '— steady'}
        </p>
      )}
    </motion.div>
  );
};

export default StatsCard;
