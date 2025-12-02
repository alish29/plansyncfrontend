import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';

import { useTheme } from '../../context/ThemeContext.jsx';

const spring = {
  type: 'spring',
  stiffness: 500,
  damping: 30,
};

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="relative inline-flex h-10 w-20 items-center rounded-full bg-white/40 p-1 shadow-glass transition dark:bg-glassDark"
    >
      <Sun className={`h-5 w-5 text-yellow-400 transition ${isDark ? 'opacity-0' : 'opacity-100'}`} />
      <Moon className={`h-5 w-5 text-blue-300 transition ${isDark ? 'opacity-100' : 'opacity-0'}`} />
      <motion.span
        layout
        transition={spring}
        className={`absolute h-8 w-8 rounded-full bg-white shadow ${isDark ? 'translate-x-10' : 'translate-x-0'}`}
      />
    </button>
  );
};

export default ThemeToggle;
