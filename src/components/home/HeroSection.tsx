"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

export function HeroSection() {
  return (
    <section className="relative flex min-h-[85vh] items-center overflow-hidden bg-white px-6 py-20 md:mt-24 lg:py-0">
      {/* Subtle light background gradients */}
      <div className="absolute top-0 left-0 -z-10 h-full w-full bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-blue-50/50 via-white to-transparent" />
      <div className="absolute right-0 bottom-0 -z-10 h-[800px] w-[800px] translate-x-1/3 -translate-y-1/4 rounded-full bg-blue-50/30 blur-3xl" />

      <div className="mx-auto grid w-full max-w-[75rem] items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="z-10 pt-10 lg:pt-0"
        >
          <motion.div variants={fadeUp}>
            <span className="mb-8 inline-block rounded-full border border-blue-100 bg-blue-50 px-4 py-1.5 text-xs font-bold tracking-widest text-blue-700 uppercase">
              Personal mentorship for NEET aspirants
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="font-headline mb-6 text-4xl leading-[1.1] font-extrabold tracking-tight text-slate-900 md:text-5xl lg:text-[3.5rem]"
          >
            Premium NEET Coaching
            <br />
            <span className="text-blue-600">
              1-on-1 Live Classes & Daily Mentorship.
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mb-10 max-w-xl text-base leading-relaxed text-slate-600 md:text-lg"
          >
            Destiny 4 NEET helps students prepare with calm discipline,
            conceptual clarity, and direct mentor support. Small batches,
            personal strategy, and focused feedback turn effort into steady
            progress.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="flex flex-col gap-4 sm:flex-row"
          >
            <Link
              href="/#enquiry"
              className="rounded-xl bg-blue-600 px-8 py-4 text-center font-bold text-white shadow-md transition-all hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-lg"
            >
              Book Free Demo Class
            </Link>
            <Link
              href="/neet-course"
              className="group flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-8 py-4 font-bold text-slate-800 transition-all hover:-translate-y-0.5 hover:bg-slate-50 hover:shadow-sm"
            >
              <span className="material-symbols-outlined text-xl text-blue-600 transition-transform group-hover:scale-110">
                school
              </span>
              Explore the NEET Course
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95, x: 20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="relative flex w-full justify-center lg:justify-end"
        >
          {/* Make the card slightly smaller and floating */}
          <div className="group relative w-full max-w-[420px] rounded-2xl border border-slate-100 bg-white/80 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.06)] backdrop-blur-xl transition-transform duration-500 hover:-translate-y-2">
            {/* Soft glow behind the card */}
            <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-tr from-blue-100 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            <div className="relative mb-6 aspect-[4/5] overflow-hidden rounded-xl bg-slate-100">
              <img
                alt="Manohar Shah Sir"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                src="/sir/manohar.png"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </div>

            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-headline mb-1 text-2xl font-extrabold text-slate-900">
                  Dr. Manohar Sah
                </h3>
                <p className="mb-1 text-xs font-bold tracking-widest text-blue-600 uppercase">
                  BIOLOGY EXPERT
                </p>
                <p className="text-[0.7rem] leading-relaxed font-medium text-slate-500">
                  Ex-Head Faculty at Aakash Institute
                  <br />& Narayana Institute
                </p>
              </div>
              <div className="rounded-lg border border-blue-100 bg-blue-50 px-3 py-2 text-xs leading-tight font-bold whitespace-nowrap text-blue-700">
                30+ Yrs Exp
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
