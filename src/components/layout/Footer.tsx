import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-tertiary text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <div className="mb-6">
            <img src="/logo.png" alt="Destiny 4 NEET Logo" className="h-10 w-auto" />
          </div>
          <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
            Personal mentorship for NEET aspirants who need clarity, discipline, and a calm path toward becoming a doctor.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <p className="font-bold text-[0.65rem] uppercase tracking-widest text-slate-500 mb-3">Explore</p>
          <Link href="/" className="text-slate-400 hover:text-white transition-colors text-sm">Home</Link>
          <Link href="/about" className="text-slate-400 hover:text-white transition-colors text-sm">About</Link>
          <Link href="/neet-course" className="text-slate-400 hover:text-white transition-colors text-sm">NEET Course</Link>
          <Link href="/faculty" className="text-slate-400 hover:text-white transition-colors text-sm">Faculty Profile</Link>
        </div>
        <div>
          <p className="font-bold text-[0.65rem] uppercase tracking-widest text-slate-500 mb-6">Contact</p>
          <p className="text-slate-400 text-sm leading-relaxed mb-4">
            Book a demo class and speak with a mentor about batch fit, study habits, and your NEET preparation needs.
          </p>
          <Link href="/#enquiry" className="inline-block text-white font-bold text-sm hover:text-primary-container transition-colors mb-6">Go to enquiry form</Link>
          <div className="flex flex-col gap-2 text-sm text-slate-400">
            <p><span className="text-white font-medium">Sah Sir (Biology):</span> +91 98103 52371</p>
            <p><span className="text-white font-medium">Sanjay Sir (Biology):</span> +91 98382 76817</p>
          </div>
        </div>
      </div>
      <div className="mt-16 pt-8 border-t border-white/5 text-center">
        <p className="text-slate-600 text-[0.7rem]">© 2024 Destiny 4 NEET. Focused preparation for future doctors.</p>
      </div>
    </footer>
  );
}
