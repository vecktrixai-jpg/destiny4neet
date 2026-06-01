import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="pt-24">
      <section className="px-6 py-20 md:py-24">
        <div className="mx-auto max-w-5xl text-center">
          <span className="inline-block rounded-DEFAULT bg-primary-container px-3 py-1 text-[0.7rem] font-bold uppercase tracking-wider text-primary">
            About Destiny 4 NEET
          </span>
          <h1 className="mt-6 font-headline text-4xl font-extrabold tracking-tight text-on-background md:text-6xl">
            Education should build curiosity, confidence, and character
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-on-surface-variant">
            Destiny 4 NEET was shaped by a simple belief: serious preparation works best when students are guided with clarity, encouraged to think independently, and supported as whole people.
          </p>
        </div>
      </section>

      <section className="bg-white px-6 py-16 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2">
          <div>
            <h2 className="font-headline text-3xl font-bold text-on-background">Our philosophy</h2>
            <p className="mt-4 text-base leading-relaxed text-on-surface-variant">
              The aim of education is not just to deliver information. It is to develop independent thinking, awaken curiosity, and help students appreciate their own potential.
            </p>
            <p className="mt-4 text-base leading-relaxed text-on-surface-variant">
              We believe learning should lead to action and opportunity. When students understand why they study and how to improve, knowledge becomes a force for growth instead of pressure.
            </p>
          </div>
          <div className="rounded-xl border border-outline-variant bg-surface-variant p-8">
            <h3 className="text-xl font-bold text-on-background">What this means in practice</h3>
            <ul className="mt-5 space-y-4 text-sm leading-relaxed text-on-surface-variant">
              <li>Students are taught to understand concepts deeply instead of relying on rote memorization.</li>
              <li>Preparation is built around progress, not panic.</li>
              <li>Mentorship includes emotional steadiness, discipline, and accountability.</li>
              <li>Every student is treated as someone with real potential, not as a roll number in a crowd.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 md:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <h2 className="font-headline text-3xl font-bold text-on-background">Our teaching approach</h2>
            <p className="mt-4 text-base leading-relaxed text-on-surface-variant">
              Teachers at Destiny 4 NEET are expected to do more than explain a chapter. They guide, question, correct, and encourage. The classroom is meant to build clarity and self-belief, not fear.
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="rounded-xl border border-outline-variant bg-white p-6 shadow-sm">
              <h3 className="text-lg font-bold text-on-background">Direct guidance</h3>
              <p className="mt-3 text-sm leading-relaxed text-on-surface-variant">
                Students interact closely with subject mentors so doubts are addressed before they become habits.
              </p>
            </div>
            <div className="rounded-xl border border-outline-variant bg-white p-6 shadow-sm">
              <h3 className="text-lg font-bold text-on-background">Joyful seriousness</h3>
              <p className="mt-3 text-sm leading-relaxed text-on-surface-variant">
                Learning can be disciplined without being joyless. A calm environment helps students think, ask, and grow.
              </p>
            </div>
            <div className="rounded-xl border border-outline-variant bg-white p-6 shadow-sm">
              <h3 className="text-lg font-bold text-on-background">Self-realization</h3>
              <p className="mt-3 text-sm leading-relaxed text-on-surface-variant">
                Good teaching helps students understand their strengths, improve their weaknesses, and believe in their capacity to do hard things.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface-variant px-6 py-16 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1.2fr_0.8fr]">
          <div>
            <h2 className="font-headline text-3xl font-bold text-on-background">Why healthy competition matters</h2>
            <p className="mt-4 text-base leading-relaxed text-on-surface-variant">
              Competitive education should push students toward personal improvement, not constant comparison. When handled well, competition becomes a catalyst for growth and encourages students to challenge limits instead of settling for mediocrity.
            </p>
            <p className="mt-4 text-base leading-relaxed text-on-surface-variant">
              NEET is not just a test of memory. It is a journey that asks for resilience, discipline, and thoughtful effort. Healthy competition helps students sharpen those qualities with purpose.
            </p>
          </div>
          <div className="rounded-xl bg-tertiary p-8 text-white">
            <p className="text-sm uppercase tracking-[0.2em] text-primary-container">A guiding line</p>
            <p className="mt-4 text-2xl font-bold leading-relaxed">
              “The roots of education are bitter, but the fruit is sweet.”
            </p>
            <p className="mt-6 text-sm leading-relaxed text-slate-300">
              We prepare students to stay with the work, trust the process, and keep moving even when progress feels slow.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-5xl rounded-xl bg-primary px-8 py-12 text-center text-white md:px-12">
          <h2 className="font-headline text-3xl font-bold">A better preparation journey starts with the right guidance</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-primary-container">
            If you want a preparation environment built on clarity, small-batch support, and real mentorship, explore the course structure or book a demo conversation.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link href="/neet-course" className="rounded-DEFAULT bg-white px-6 py-3 font-bold text-primary transition hover:bg-slate-100">
              Explore the NEET Course
            </Link>
            <Link href="/#enquiry" className="rounded-DEFAULT border border-white/30 px-6 py-3 font-bold text-white transition hover:bg-white/10">
              Book a Demo
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
