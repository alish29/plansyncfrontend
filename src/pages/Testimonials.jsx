import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import GlassCard from "../components/common/GlassCard.jsx";

const defaultTestimonials = [
  {
    quote:
      "PlanSync transformed the way our agency coordinates conferences. We launch flawlessly every time!",
    name: "Amelia Rivers",
    role: "Director, Horizon Events",
    company: "Horizon Events",
    image: "AR",
    rating: 5,
  },
  {
    quote:
      "The collaborative dashboard keeps everyone aligned. No more chaotic chats or lost spreadsheets.",
    name: "Jordan Blake",
    role: "Operations Lead, Gather & Glow",
    company: "Gather & Glow",
    image: "JB",
    rating: 5,
  },
];

const TestimonialsPage = () => {
  const reduceMotion = useReducedMotion();

  // -----------------------------
  // ⭐ State for User Comments
  // -----------------------------
  const [testimonials, setTestimonials] = useState(defaultTestimonials);
  const [formData, setFormData] = useState({
    name: "",
    quote: "",
    rating: 5,
  });

  // -----------------------------
  // ⭐ Add New Comment
  // -----------------------------
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.quote.trim()) {
      alert("Please fill all fields.");
      return;
    }

    const newComment = {
      ...formData,
      role: "User",
      company: "Community Member",
      image: formData.name.slice(0, 2).toUpperCase(),
    };

    setTestimonials((prev) => [newComment, ...prev]);

    setFormData({
      name: "",
      quote: "",
      rating: 5,
    });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 space-y-16 py-10 lg:py-16">
      {/* HEADER */}
      <section className="text-center">
        <motion.div
          initial={reduceMotion ? {} : { opacity: 0, y: 24 }}
          animate={reduceMotion ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
        >
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white">
            <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
              Testimonials
            </span>
          </h1>
          <p className="mx-auto mt-4 sm:mt-6 max-w-2xl text-sm sm:text-base text-slate-600 dark:text-slate-300">
            Read what others say — and share your own experience!
          </p>
        </motion.div>
      </section>

      {/* ⭐ USER COMMENT FORM */}
      <section className="max-w-2xl mx-auto">
        <GlassCard className="p-6 sm:p-8">
          <h2 className="font-display text-xl sm:text-2xl font-bold text-slate-900 dark:text-white text-center">
            Share Your Experience
          </h2>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              value={formData.name}
              onChange={(e) =>
                setFormData((p) => ({ ...p, name: e.target.value }))
              }
              className="w-full rounded-xl border border-slate-300 dark:border-slate-700 px-4 py-3 bg-white/90 dark:bg-black/50 text-sm focus:ring-2 focus:ring-primary"
              required
            />

            <textarea
              placeholder="Write your testimonial..."
              value={formData.quote}
              onChange={(e) =>
                setFormData((p) => ({ ...p, quote: e.target.value }))
              }
              rows={4}
              className="w-full rounded-xl border border-slate-300 dark:border-slate-700 px-4 py-3 bg-white/90 dark:bg-black/50 text-sm focus:ring-2 focus:ring-primary"
              required
            />

            <select
              value={formData.rating}
              onChange={(e) =>
                setFormData((p) => ({ ...p, rating: Number(e.target.value) }))
              }
              className="w-full rounded-xl border border-slate-300 dark:border-slate-700 px-4 py-3 bg-white/90 dark:bg-black/50 text-sm focus:ring-2 focus:ring-primary"
            >
              {[5, 4, 3, 2, 1].map((r) => (
                <option key={r} value={r}>
                  {r} Stars
                </option>
              ))}
            </select>

            <button
              type="submit"
              className="w-full rounded-full bg-gradient-to-r from-primary to-secondary px-6 py-3 text-white font-bold transition-transform hover:scale-[1.03]"
            >
              Submit Testimonial
            </button>
          </form>
        </GlassCard>
      </section>

      {/* ⭐ GRID LIST */}
      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map(
          ({ quote, name, role, company, image, rating }, i) => (
            <motion.div
              key={i}
              initial={reduceMotion ? {} : { opacity: 0, scale: 0.96 }}
              animate={reduceMotion ? {} : { opacity: 1, scale: 1 }}
              transition={{ duration: 0.35 }}
            >
              <GlassCard className="flex flex-col h-full gap-4 p-6">
                <div className="flex items-start gap-3">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 font-bold text-primary">
                    {image}
                  </div>
                </div>

                <p className="text-sm italic leading-relaxed">
                  "{quote}"
                </p>

                <div className="flex gap-1 mt-1">
                  {[...Array(rating)].map((_, idx) => (
                    <span key={idx} className="text-yellow-400">★</span>
                  ))}
                </div>

                <div className="mt-auto border-t pt-4">
                  <p className="font-semibold">{name}</p>
                  <p className="text-xs text-slate-600">{role}</p>
                  <p className="text-xs text-slate-500 mt-1">{company}</p>
                </div>
              </GlassCard>
            </motion.div>
          )
        )}
      </section>

      {/* CTA */}
      <section className="rounded-3xl bg-gradient-to-br from-primary/20 via-white/90 to-secondary/20 dark:from-primary/10 dark:via-slate-900/80 dark:to-secondary/10 p-6 text-center">
        <h2 className="font-display text-xl sm:text-3xl font-bold text-slate-900 dark:text-white">
          Join our happy community
        </h2>
        <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300">
          Share your story or see how PlanSync helps others.
        </p>
      </section>
    </div>
  );
};

export default TestimonialsPage;
