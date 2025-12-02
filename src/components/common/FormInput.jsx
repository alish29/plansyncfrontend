const FormInput = ({ label, type = 'text', name, value, onChange, placeholder = '', required = true }) => (
  <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
    <span>{label}</span>
    <input
      className="rounded-2xl border-2 border-slate-200 bg-white/90 px-4 py-3 text-base shadow-sm transition-all duration-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 dark:border-slate-700 dark:bg-black/90 dark:focus:border-primary dark:focus:ring-primary/30"
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      autoComplete={name}
    />
  </label>
);

export default FormInput;
