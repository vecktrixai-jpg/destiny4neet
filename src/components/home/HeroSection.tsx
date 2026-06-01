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
    <section className="relative flex min-h-[85vh] items-center px-6 py-20 lg:py-0 overflow-hidden bg-white md:mt-24">
      {/* Subtle light background gradients */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-blue-50/50 via-white to-transparent -z-10" />
      <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-blue-50/30 rounded-full blur-3xl -translate-y-1/4 translate-x-1/3 -z-10" />

      <div className="max-w-[75rem] mx-auto grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center w-full">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="z-10 pt-10 lg:pt-0"
        >
          <motion.div variants={fadeUp}>
            <span className="inline-block px-4 py-1.5 mb-8 text-xs font-bold tracking-widest text-blue-700 uppercase bg-blue-50 rounded-full border border-blue-100">
              Personal mentorship for NEET aspirants
            </span>
          </motion.div>
          
          <motion.h1 variants={fadeUp} className="font-headline text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold leading-[1.1] text-slate-900 tracking-tight mb-6">
            Top-Tier NEET Coaching, Custom-Built for You.<br/>
            <span className="text-blue-600">
              1-on-1 Live Classes & Daily Personal Mentorship
            </span>
          </motion.h1>
          
          <motion.p variants={fadeUp} className="text-slate-600 text-base md:text-lg leading-relaxed mb-10 max-w-xl">
            Destiny 4 NEET helps students prepare with calm discipline, conceptual clarity, and direct mentor support. Small batches, personal strategy, and focused feedback turn effort into steady progress.
          </motion.p>
          
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4">
            <Link href="/#enquiry" className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold shadow-md hover:bg-blue-700 hover:shadow-lg hover:-translate-y-0.5 transition-all text-center">
              Book Free Demo Class
            </Link>
            <Link href="/neet-course" className="bg-white text-slate-800 px-8 py-4 rounded-xl font-bold border border-slate-200 hover:bg-slate-50 hover:shadow-sm hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 group">
              <span className="material-symbols-outlined text-xl text-blue-600 group-hover:scale-110 transition-transform">school</span>
              Explore the NEET Course
            </Link>
          </motion.div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95, x: 20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="relative flex justify-center lg:justify-end w-full"
        >
          {/* Make the card slightly smaller and floating */}
          <div className="max-w-[420px] w-full rounded-2xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.06)] bg-white/80 backdrop-blur-xl border border-slate-100 relative group transition-transform duration-500 hover:-translate-y-2">
            
            {/* Soft glow behind the card */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-100 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl -z-10" />

            <div className="aspect-[4/5] rounded-xl overflow-hidden mb-6 bg-slate-100 relative">
              <img 
                alt="Manohar Shah Sir" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                src="/sir/manohar.png"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>
            
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-headline text-2xl font-extrabold text-slate-900 mb-1">Dr. Manohar Sah</h3>
                <p className="text-blue-600 font-bold text-xs tracking-widest uppercase mb-1">BIOLOGY EXPERT</p>
                <p className="text-slate-500 text-[0.7rem] font-medium leading-relaxed">Ex-Head Faculty at Aakash Institute<br/>& Narayana Institute</p>
              </div>
              <div className="bg-blue-50 text-blue-700 font-bold text-xs px-3 py-2 rounded-lg leading-tight border border-blue-100 whitespace-nowrap">
                30+ Yrs Exp
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
