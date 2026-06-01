export function TestimonialSection() {
  return (
    <section className="py-20 md:py-28 bg-slate-900 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-900/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-black aspect-video group border border-slate-800">
            <img alt="Video Testimonial Preview" className="w-full h-full object-cover opacity-70 group-hover:opacity-50 transition-all duration-700 group-hover:scale-105" data-alt="group of medical students in a collaborative learning session with anatomical models and tablets" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAp7nak78aJmWOcGNjWGW-rdRVPqVrNPh-UxHcSzXn7zA3pROvMVTEMzc0iMG1Qt1lu1R6PI9YWzoh-SlofbnIwNzyFcLZj_Yb4GmEfnYaG6VZ4KuDghTGpUB8517o1uLGj_vrxpI8Mo9mYQCwbyKLzgIY8xslsa8aP1pCLRnSL8H8GdIlqtKzEDSB3hmDJwx2zE-xFCc8pC8oXlBilF6Eb2zXujw2RX4G2g5_71V9raT84UcPA61rk14JV9LF16-y3x9Cw3gudhG5b"/>
            <div className="absolute inset-0 flex items-center justify-center cursor-pointer">
              <div className="w-20 h-20 bg-blue-600/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(37,99,235,0.4)] transform group-hover:scale-110 group-hover:bg-blue-500 transition-all duration-300">
                <span className="material-symbols-outlined text-white text-4xl" data-icon="play_arrow" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
              </div>
            </div>
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
