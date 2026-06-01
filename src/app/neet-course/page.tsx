"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const preparationSteps = [
  {
    title: "Systematic planning",
    description:
      "Break the syllabus into daily targets and weekly priorities so the workload stays manageable and visible.",
    icon: "event_note",
  },
  {
    title: "Strategic testing",
    description:
      "Use mock tests to identify weak areas, improve speed and accuracy, and build exam confidence through review.",
    icon: "query_stats",
  },
  {
    title: "Conceptual clarity",
    description:
      "Focus on understanding, especially in Physics and Chemistry, instead of depending on rote memorization alone.",
    icon: "lightbulb",
  },
  {
    title: "Resilient mindset",
    description:
      "Treat setbacks as feedback. Low scores do not end the journey; they show where the next improvement must happen.",
    icon: "psychology",
  },
];

const supportPoints = [
  {
    title: "Rest & Recovery",
    desc: "6-7 hours of quality sleep, hydration, and light physical activity support long-term retention.",
    icon: "bedtime",
  },
  {
    title: "Emotional Balance",
    desc: "Emotional balance matters. Students are encouraged to stay connected with parents, mentors, and trusted friends.",
    icon: "favorite",
  },
  {
    title: "Focus Protection",
    desc: "Social media and other distractions are managed deliberately so focus is protected over the long term.",
    icon: "do_not_disturb_on",
  },
];

const fadeUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

export default function NeetCoursePage() {
  return (
    <main className="pt-24 bg-slate-50/20">
      {/* Hero Section */}
      <section className="px-6 py-20 md:py-24 bg-gradient-to-b from-slate-50/50 to-transparent">
        <div className="mx-auto grid max-w-[75rem] gap-16 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
          <motion.div 
            initial="hidden" 
            animate="visible" 
            variants={staggerContainer}
            className="pt-2"
          >
            <motion.span variants={fadeUpVariants} className="inline-block rounded-md bg-blue-100 px-3 py-1.5 text-[0.65rem] font-bold uppercase tracking-wider text-blue-700">
              Destiny 4 NEET course
            </motion.span>
            <motion.h1 variants={fadeUpVariants} className="mt-8 font-headline text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl lg:text-[3.25rem] lg:leading-[1.15]">
              Structured preparation for students who want clarity, consistency, and personal guidance
            </motion.h1>
            <motion.p variants={fadeUpVariants} className="mt-6 max-w-xl text-base leading-relaxed text-slate-600 md:text-[1.05rem]">
              This course is designed for NEET aspirants who want more than a large classroom and generic advice. It combines disciplined study planning, close mentor access, and thoughtful pressure management so students can prepare with confidence.
            </motion.p>
            <motion.div variants={fadeUpVariants} className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link href="/#enquiry" className="rounded-lg bg-blue-600 px-8 py-3.5 text-center text-sm font-bold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-md">
                Book a Demo
              </Link>
              <Link href="/about" className="rounded-lg border border-slate-200 bg-white px-8 py-3.5 text-center text-sm font-bold text-slate-700 shadow-sm transition-all hover:-translate-y-0.5 hover:bg-slate-50 hover:text-slate-900 hover:shadow-md">
                Learn Our Philosophy
              </Link>
            </motion.div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="rounded-2xl border border-slate-100 bg-white p-8 lg:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] lg:mt-6 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/50 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
            <p className="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-blue-600 mb-8 flex items-center gap-2">
              <span className="material-symbols-outlined text-base">target</span>
              Who this course is for
            </p>
            <div className="space-y-6 text-[0.85rem] leading-relaxed text-slate-600">
              <div className="flex gap-3 items-start">
                <span className="material-symbols-outlined text-blue-400 text-lg mt-0.5">check_circle</span>
                <p>Students in Classes 11 and 12 preparing seriously for NEET</p>
              </div>
              <div className="flex gap-3 items-start">
                <span className="material-symbols-outlined text-blue-400 text-lg mt-0.5">check_circle</span>
                <p>Dropped-year aspirants who want a tighter strategy and stronger accountability</p>
              </div>
              <div className="flex gap-3 items-start">
                <span className="material-symbols-outlined text-blue-400 text-lg mt-0.5">check_circle</span>
                <p>Students who understand better in small groups than in crowded batches</p>
              </div>
              <div className="flex gap-3 items-start">
                <span className="material-symbols-outlined text-blue-400 text-lg mt-0.5">check_circle</span>
                <p>Families looking for guidance that balances performance with emotional steadiness</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How we prepare students */}
      <section className="bg-white px-6 py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-[800px] h-[800px] bg-blue-50/50 rounded-full blur-3xl -z-10" />
        
        <div className="mx-auto max-w-[75rem]">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUpVariants}
            className="max-w-2xl"
          >
            <span className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-2 block">Methodology</span>
            <h2 className="font-headline text-3xl font-bold text-slate-900 md:text-4xl">How we prepare students</h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              The journey to NEET is not merely a test of academic knowledge. It is a test of character, resilience, and disciplined effort. Our preparation model is designed to support all three.
            </p>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4"
          >
            {preparationSteps.map((step) => (
              <motion.div 
                key={step.title} 
                variants={fadeUpVariants}
                className="group rounded-2xl border border-slate-100 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-900/5 hover:border-blue-100"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                  <span className="material-symbols-outlined">{step.icon}</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">{step.title}</h3>
                <p className="text-sm leading-relaxed text-slate-600">{step.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Course format and batch model */}
      <section className="px-6 py-20 lg:py-28 bg-slate-50/50">
        <div className="mx-auto grid max-w-[75rem] gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUpVariants}
          >
            <span className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-2 block">Structure</span>
            <h2 className="font-headline text-3xl font-bold text-slate-900 md:text-4xl">Course format and batch model</h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              Destiny 4 NEET focuses on one-to-one strategy and Group-4 live classes. The goal is to keep every student visible, coachable, and supported throughout the preparation cycle.
            </p>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid gap-4 sm:grid-cols-2"
          >
            <motion.div variants={fadeUpVariants} className="sm:col-span-2 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 p-8 text-white shadow-lg relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 group-hover:bg-white/20 transition-all duration-500" />
              <span className="material-symbols-outlined text-4xl mb-4 text-blue-200">groups</span>
              <h3 className="text-2xl font-bold mb-2 relative z-10">Maximum 4 students per live batch</h3>
              <p className="text-sm leading-relaxed text-blue-100 max-w-md relative z-10">
                Small groups create space for questions, regular feedback, and direct interaction with subject gurus. You are never just a face in the crowd.
              </p>
            </motion.div>
            
            <motion.div variants={fadeUpVariants} className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
              <span className="material-symbols-outlined text-blue-500 mb-3 block text-2xl">route</span>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Personalized strategy</h3>
              <p className="text-sm leading-relaxed text-slate-600">
                Targeted guidance shaped around your current level, pace, and unique exam goals.
              </p>
            </motion.div>
            
            <motion.div variants={fadeUpVariants} className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
              <span className="material-symbols-outlined text-blue-500 mb-3 block text-2xl">forum</span>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Direct mentor access</h3>
              <p className="text-sm leading-relaxed text-slate-600">
                Close access to subject mentors improves creativity, confidence, and conceptual understanding.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Student support and pressure management */}
      <section className="bg-white px-6 py-20 lg:py-28">
        <div className="mx-auto grid max-w-[75rem] gap-16 lg:grid-cols-[1fr_1fr] lg:items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUpVariants}
          >
            <span className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-2 block">Well-being</span>
            <h2 className="font-headline text-3xl font-bold text-slate-900 md:text-4xl">Student support & pressure management</h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600 max-w-lg">
              A rested mind learns better. Strong preparation includes academic discipline, but it also includes sleep, emotional steadiness, and protection from distractions that slowly erode focus.
            </p>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="space-y-4"
          >
            {supportPoints.map((point) => (
              <motion.div 
                key={point.title} 
                variants={fadeUpVariants}
                className="flex gap-6 rounded-2xl border border-slate-100 bg-slate-50 p-6 transition-all duration-300 hover:bg-white hover:shadow-lg hover:shadow-blue-900/5 hover:border-slate-200 hover:-translate-y-0.5"
              >
                <div className="w-12 h-12 flex-shrink-0 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                  <span className="material-symbols-outlined">{point.icon}</span>
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 mb-1">{point.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-600">{point.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Outcome CTA */}
      <section className="px-6 py-20 pb-32">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-50px" }}
          className="mx-auto max-w-5xl rounded-3xl bg-slate-900 px-8 py-16 text-center text-white md:px-16 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600/20 to-transparent pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl translate-y-1/2 translate-x-1/2" />
          
          <p className="text-sm uppercase tracking-widest text-blue-400 font-bold relative z-10">Outcome</p>
          <h2 className="mt-6 font-headline text-4xl font-bold md:text-5xl relative z-10">
            Prepare for NEET with confidence, not confusion
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-300 relative z-10">
            The path is demanding, but the destination matters. With the right strategy and the right support, students can move toward their medical dream with clarity and purpose.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row relative z-10">
            <Link href="/#enquiry" className="rounded-lg bg-blue-600 px-8 py-4 font-bold text-white transition-all hover:-translate-y-1 hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/25">
              Request a Demo Class
            </Link>
            <Link href="/faculty" className="rounded-lg border border-slate-700 bg-slate-800 px-8 py-4 font-bold text-white transition-all hover:-translate-y-1 hover:bg-slate-700 hover:border-slate-600 hover:shadow-lg">
              Meet the Faculty
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
