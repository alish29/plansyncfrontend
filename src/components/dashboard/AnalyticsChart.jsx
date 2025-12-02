import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const AnalyticsChart = ({ data = [], title = 'Monthly Engagement' }) => (
  <div className="rounded-3xl border border-white/20 bg-white/70 p-6 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-black/70">
    <div className="flex items-center justify-between">
      <div>
        <h3 className="font-display text-xl font-semibold text-slate-900 dark:text-white">{title}</h3>
        <p className="text-sm text-slate-500 dark:text-slate-300">Visualize how your team is planning over time.</p>
      </div>
    </div>
    <div className="mt-6 h-72">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorPrimary" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4B96E6" stopOpacity={0.7} />
              <stop offset="95%" stopColor="#4B96E6" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorSecondary" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#FF70A6" stopOpacity={0.6} />
              <stop offset="95%" stopColor="#FF70A6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.5} />
          <XAxis dataKey="label" stroke="#94a3b8" />
          <YAxis stroke="#94a3b8" allowDecimals={false} />
          <Tooltip
            contentStyle={{
              borderRadius: 16,
              border: '1px solid rgba(148, 163, 184, 0.2)',
              background: 'rgba(255, 255, 255, 0.85)',
              backdropFilter: 'blur(12px)',
            }}
          />
          <Area type="monotone" dataKey="value" stroke="#4B96E6" strokeWidth={3} fill="url(#colorPrimary)" />
          <Area type="monotone" dataKey="secondary" stroke="#FF70A6" strokeWidth={2} fill="url(#colorSecondary)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  </div>
);

export default AnalyticsChart;
