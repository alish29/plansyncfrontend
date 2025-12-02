const Footer = () => (
  <footer className="mt-20 border-t border-primary/10 bg-white/60 py-10 text-sm text-slate-600 backdrop-blur-xl dark:border-primary/20 dark:bg-black/60 dark:text-slate-400">
    <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 sm:px-6 lg:px-8 md:flex-row">
      <p className="font-medium">© {new Date().getFullYear()} PlanSync. All rights reserved.</p>
      <div className="flex items-center gap-4">
        <a href="mailto:alishk2211@gmail.com" className="font-semibold transition-colors hover:text-primary dark:hover:text-primary">
          alishk2211@gmail.com
        </a>
        <span className="hidden h-2 w-2 rounded-full bg-gradient-to-r from-primary to-secondary md:inline-flex" />
        <a href="tel:+919302594411" className="font-semibold transition-colors hover:text-primary dark:hover:text-primary">
          +91 9302594411
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
