"use client";

import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";

export function ResultsGallery() {
  const testimonials = [
    {
      quote:
        "I am Dr Vandana Sharma-a MBBS graduate from Lady Hardinge Medical College, Delhi, and I would like to share my experience with my zoology teacher Dr. Manohar Sah sir for NEET -UG -preparation . The way the concepts were explained was very simple and easy to understand, even for topics that usually feel confusing. Sir mainly focused on building clear basics, which really helped me solve multiple questions from any given topic. Doubts were always addressed patiently, and the teaching approach made learning interesting instead of stressful. Regular revisions and practical examples made it easier to remember concepts for a long time. In addition to helping us excel in academics, he mentored us throughout the course and motivated us to reach our goals and brought out the best in us. He is the GOAT of Zoology. I would definitely recommend him to other NEET UG aspirants.",
      name: "Dr Vandana Sharma",
      designation: "Lady Hardinge Medical College, Delhi",
      src: "/testimonials/Dr_Vandana_Sharma/dr_vandana.png",
    },
    {
      quote:
        "Respected sir, Thank you for your guidance. You truly inspired us to achieve our goals. I am fortunate enough to be your student. Your classes were truly engaging. Thank you sir.",
      name: "Dr. Monica Mehta",
      designation: "AIIMS Kalyani",
      src: "/testimonials/Dr_Monika/dr_monika.png"
    },
    {
      quote:
        "Dr. Manohar Sah Sir, You have a unique way of explaining concepts that makes even the most difficult topics feel simple and approachable. Your patience and encouragement create a comfortable space to ask questions and learn without hesitation. Truly grateful for the clarity and confidence you bring into every class. Your guidance played a huge role in my studies.",
      name: "Dr. Khushi Gaur",
      designation: "Dr. DY Patil Medical College and Hospital, Pune",
      src: "/testimonials/Dr_Khushi_Gaur/image.png",
    },
    {
      quote:
        "I am extremely grateful to Dr. Manohar Sir, for the immense support & motivation he provided. He just did not teach the subject but helped to develop my confidence & made me believe that I could achieve my dreams at a time I was having doubts about myself. You kept pushing me to be my best. Thanks to your patience learning from you has been a joyful experience. You never refused to clear my doubts & even adopted different approaches to make me understand it. You pushed me because you knew what I was capable of even when I didn't. Thank you for your unwavering support.",
      name: "Dr. Vismaya",
      designation: "Lady Hardinge Medical College, Delhi",
      src: "/testimonials/Dr_Vismaya/image.png",
    },
    {
      quote:
        "Dr. Manohar Sah Sir, you have played a truly phenomenal role in my NEET journey, and I am deeply grateful for everything you have done for me. Your way of explaining concepts is truly unique - you simplify even the most difficult topics so clearly that they become easy to understand and impossible to forget. The way you connect concepts and make them logical helped me recall answers instantly just by reading a question, which made a huge difference in my preparation. Along with that, your constant motivation and guidance always kept me on the right track. You supported me during my low phases and understood exactly where I needed to improve. Your belief in me gave me confidence when I needed it the most. Honestly, I can't imagine clearing NEET without your teaching and guidance. I will always be grateful to you.",
      name: "Dr. Ayushi Kumari",
      designation: "ABVIMS & Dr. RML Hospital",
      src: "/testimonials/Dr_Ayushi_Kumari/image.png",
    },
    {
      quote:
        "Dr. Manohar Sah had been a wonderful guide during my NEET preparation. He is a passionate teacher who helped us understand the core of many complex topics instead of just reading lines from the book. Because of his guidance and support, many of us developed a stronger interest in learning. I am truly grateful for his influence and the inspiration he provided. His impact has stayed with me outside the classroom and motivates me to do better today as well.",
      name: "Dr. Aryan Satish Madham",
      designation: "Amala Institute of Medical Sciences, Thrissur",
      src: "/testimonials/Dr_Aryan/image.png",
    }
  ];

  return (
    <section className="py-20 md:py-28 bg-white overflow-hidden border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6 text-center flex flex-col items-center">
        <span className="inline-block px-4 py-1.5 mb-4 text-xs font-bold tracking-widest text-blue-700 uppercase bg-blue-50 rounded-full border border-blue-100">
          Student Success Stories
        </span>
        <h2 className="font-headline text-4xl md:text-5xl font-extrabold text-slate-900 mb-16 tracking-tight">
          What disciplined preparation looks like
        </h2>
      </div>
      <div className="-mt-6">
        <AnimatedTestimonials testimonials={testimonials} autoplay={true} />
      </div>
    </section>
  );
}
