import React from 'react';
import { TestimonialsGrid } from '@/components/results/TestimonialsGrid';

export default function ResultsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#2563eb] to-[#4f46e5] pt-24 pb-20">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>
      
      {/* Decorative grid lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-10">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Our Selected Students
          </h1>
          <p className="text-lg md:text-xl text-blue-100/90 font-medium max-w-2xl mx-auto">
            Thousands of students selected in Top Medical Colleges across India
          </p>
        </div>

        <TestimonialsGrid />
      </div>
    </main>
  );
}
