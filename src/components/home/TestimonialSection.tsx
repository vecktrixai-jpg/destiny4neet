export function TestimonialSection() {
  return (
    <section className="py-20 md:py-28 bg-slate-900 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-900/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-black aspect-video border border-slate-800">
            <video
              className="w-full h-full object-cover"
              src="/landing_video/video.mp4"
              poster="/landing_video/thumbnail.png"
              controls
              playsInline
            />
          </div>
          <div>
            <span className="inline-block px-4 py-1.5 mb-4 text-xs font-bold tracking-widest text-blue-400 uppercase bg-blue-900/30 rounded-full border border-blue-800/50">
              Philosophy
            </span>
            <h2 className="font-headline text-3xl md:text-5xl font-extrabold text-white mb-10 tracking-tight">Mindset for the journey</h2>
            <div className="space-y-6">
              <div className="bg-slate-800/40 border border-slate-700/50 p-6 rounded-2xl hover:bg-slate-800/60 transition-colors">
                <p className="text-slate-300 italic mb-6 leading-relaxed">"Approach NEET not with fear, but as the first decisive step toward your dream of becoming a doctor."</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/20 flex items-center justify-center font-bold text-lg">01</div>
                  <div>
                    <p className="text-white font-bold text-base">Long-term goal</p>
                    <p className="text-slate-400 text-[0.7rem] font-bold uppercase tracking-widest mt-0.5">Purpose over panic</p>
                  </div>
                </div>
              </div>
              <div className="bg-slate-800/40 border border-slate-700/50 p-6 rounded-2xl hover:bg-slate-800/60 transition-colors">
                <p className="text-slate-300 italic mb-6 leading-relaxed">"Low scores in mock tests are not a sign to quit. Every setback is a setup for a stronger comeback."</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/20 flex items-center justify-center font-bold text-lg">02</div>
                  <div>
                    <p className="text-white font-bold text-base">Healthy resilience</p>
                    <p className="text-slate-400 text-[0.7rem] font-bold uppercase tracking-widest mt-0.5">Progress through feedback</p>
                  </div>
                </div>
              </div>
              <div className="bg-slate-800/40 border border-slate-700/50 p-6 rounded-2xl hover:bg-slate-800/60 transition-colors">
                <p className="text-slate-300 italic mb-6 leading-relaxed">"Success in NEET comes from consistent, focused hard work supported by rest, balance, and the right guidance."</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/20 flex items-center justify-center font-bold text-lg">03</div>
                  <div>
                    <p className="text-white font-bold text-base">Balanced preparation</p>
                    <p className="text-slate-400 text-[0.7rem] font-bold uppercase tracking-widest mt-0.5">Discipline with support</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
