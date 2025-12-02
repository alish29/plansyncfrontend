import { motion } from 'framer-motion';

const GlassCard = ({ children, className = '', delay = 0.05 }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay, ease: [0.4, 0, 0.2, 1] }}
    className={`glass-card rounded-3xl p-6 ${className}`}
  >
    {children}
  </motion.div>
);

export default GlassCard;
