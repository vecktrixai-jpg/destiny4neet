"use client";

import { motion } from "framer-motion";
import { FeatureCard } from "./FeatureCard";

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
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

export function FeaturesSection() {
  const features = [
    {
      title: "Systematic Planning",
      description: "Break the vast syllabus into manageable daily targets so progress stays visible and consistent.",
      icon: "calendar_month",
    },
    {
      title: "Small Batch Mentorship",
      description: "Group-4 live classes and one-to-one guidance create space for real questions, real feedback, and real accountability.",
      icon: "groups",
    },
    {
      title: "Strategic Testing",
      description: "Mock tests are used to identify weak areas, improve speed and accuracy, and build confidence before the real exam.",
      icon: "quiz",
    },
    {
      title: "Wellness and Pressure Support",
      description: "Good preparation includes sleep, hydration, emotional balance, and healthy distance from distractions.",
      icon: "favorite",
    },
  ];

  return (
    <section className="py-20 md:py-28 px-6 bg-slate-50 relative overflow-hidden">
      {/* Soft background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-100/40 rounded-full blur-3xl -z-10 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUpVariants}
          className="mb-16 text-center flex flex-col items-center"
        >
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest text-blue-700 uppercase bg-blue-100/50 rounded-full border border-blue-200/50">
            Why Destiny 4 NEET?
          </span>
          <h2 className="font-headline text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">Built for serious NEET preparation</h2>
          <p className="text-slate-600 max-w-2xl text-lg mx-auto leading-relaxed">
            The goal is not to overwhelm students. It is to help them study with clarity, stay steady under pressure, and move toward medicine with purpose.
          </p>
        </motion.div>
        
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={fadeUpVariants} className="h-full">
              <FeatureCard
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
