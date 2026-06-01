export function FacultyQuote() {
  return (
    <section className="max-w-7xl mx-auto px-8 mb-40">
      <div className="relative rounded-2xl overflow-hidden bg-primary text-white p-12 md:p-20 flex flex-col md:flex-row gap-16 items-center">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white to-transparent"></div>
        <div className="relative w-64 md:w-80 flex-none">
          <div className="aspect-square rounded-2xl border-4 border-primary-container/30 overflow-hidden shadow-2xl rotate-3 bg-white">
            <img
              className="w-full h-full object-cover -rotate-3 scale-110 object-top"
              alt="Dr. Manohar Sah"
              src="/sir/manohar.png"
            />
          </div>
        </div>
        <div className="relative flex-1">
          <span className="material-symbols-outlined text-5xl text-primary-container/40 mb-6 font-[FILL_1]">
            format_quote
          </span>
          <h2 className="font-headline text-3xl md:text-4xl font-bold mb-6 leading-tight">
            Elite results are never mass-produced. They are curated through 1:1 precision.
          </h2>
          <p className="font-body text-primary-container text-lg leading-relaxed mb-10 italic">
            "Teachers should be guides who awaken curiosity, not voices that simply transmit information. When students feel seen, challenged, and supported, preparation becomes deeper, steadier, and more meaningful."
          </p>
          <div>
            <p className="text-xl font-bold mb-1">Destiny 4 NEET</p>
            <p className="text-[0.7rem] font-bold tracking-widest uppercase text-primary-container/80">
              Mentorship philosophy
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
