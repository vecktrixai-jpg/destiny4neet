"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Stethoscope, X, Quote } from 'lucide-react';
import { Pagination } from './Pagination';

interface Testimonial {
  id: string;
  name: string;
  college: string;
  score: string;
  rank: string;
  batch: string;
  image: string;
  quote: string;
}

const mockTestimonials: Testimonial[] = [
  {
    id: "sp1",
    name: "Dr. Saumya Patel",
    college: "PKDIMS",
    score: "MBBS",
    rank: "NEET UG",
    batch: "Batch of 2022",
    image: "/testimonials/Dr_Saumya_Patel/image.png",
    quote: "Sir, Thank you for being the kind of teacher every student hopes for. You sparked curiosity amongst your students and always motivated us to push our limits. You made the difficult topics easy and memorable. I will always carry the confidence you helped to build. Grateful for memories and your teachings."
  },
  {
    id: "anj1",
    name: "Dr. Anjali Kumari",
    college: "Agartala Govt. Medical College",
    score: "MBBS",
    rank: "NEET UG",
    batch: "Target Batch",
    image: "/testimonials/Dr_Anjali_Kumari/image.png",
    quote: "Dr. Manohar Shah Sir, Your teaching has been truly inspiring. You consistently foster a supportive and encouraging learning environment that enhances our confidence and motivates us to excel. Even the most challenging topics became clear and accessible under your guidance, as you skillfully simplified concepts and connected them with relatable examples, making it easier to remember. Your dedication to teaching has left a lasting impact on our learning experience."
  },
  {
    id: "p1",
    name: "Dr. Pariza Parveen",
    college: "Bhagat Phool Singh Government Medical College for Women",
    score: "MBBS",
    rank: "NEET UG",
    batch: "Final Year Student",
    image: "/testimonials/Dr_Pariza_Parveen/image.png",
    quote: "Dr. Manohar Sah Sir is truly an exceptional teacher who constantly motivates & inspires his students to do their best. His classes create a very supportive & positive learning environment, where every student feels encouraged & confident to ask questions & grow. Even the most difficult topics of zoology become easy to understand because of his unique teaching style - he simplifies concepts & connects them with relatable stories, making them much more memorable. His dedication, clarity of explanation, & ability to build strong conceptual understanding have made a huge difference in my learning journey. I am grateful to have learned from such a knowledgeable & inspiring mentor."
  },
  {
    id: "mar1",
    name: "Dr. Mariyam",
    college: "Government Medical College, Budaun",
    score: "MBBS",
    rank: "NEET UG",
    batch: "Target Batch",
    image: "/testimonials/Dr_Mariyam/image.png",
    quote: "You are such an Amazing teacher who always motivates us. You Create a very supportive Environment and continously boosts our Confidence. Some topics were really difficult, but you made them easy to understand by connecting them with Relatable stories which made them Memorable. Thank you, Dr. Manohar Shah, for your constant guidance & encouragement."
  },
  {
    id: "ar1",
    name: "Dr. Aryan Satish Madham",
    college: "Amala Institute of Medical Sciences, Thrissur",
    score: "MBBS",
    rank: "NEET UG",
    batch: "Target Batch",
    image: "/testimonials/Dr_Aryan/image.png",
    quote: "Dr. Manohar Sah had been a wonderful guide during my NEET preparation. He is a passionate teacher who helped us understand the core of many complex topics instead of just reading lines from the book. Because of his guidance and support, many of us developed a stronger interest in learning. I am truly grateful for his influence and the inspiration he provided. His impact has stayed with me outside the classroom and motivates me to do better today as well."
  },
  {
    id: "a1",
    name: "Dr. Ayushi Kumari",
    college: "ABVIMS & Dr. RML Hospital",
    score: "MBBS",
    rank: "NEET UG",
    batch: "2nd Year Student",
    image: "/testimonials/Dr_Ayushi_Kumari/image.png",
    quote: "Dr. Manohar Sah Sir, you have played a truly phenomenal role in my NEET journey, and I am deeply grateful for everything you have done for me. Your way of explaining concepts is truly unique - you simplify even the most difficult topics so clearly that they become easy to understand and impossible to forget. The way you connect concepts and make them logical helped me recall answers instantly just by reading a question, which made a huge difference in my preparation. Along with that, your constant motivation and guidance always kept me on the right track. You supported me during my low phases and understood exactly where I needed to improve. Your belief in me gave me confidence when I needed it the most. Honestly, I can't imagine clearing NEET without your teaching and guidance. I will always be grateful to you."
  },
  {
    id: "vis1",
    name: "Dr. Vismaya",
    college: "Lady Hardinge Medical College, Delhi",
    score: "MBBS",
    rank: "NEET UG",
    batch: "Target Batch",
    image: "/testimonials/Dr_Vismaya/image.png",
    quote: "I am extremely grateful to Dr. Manohar Sir, for the immense support & motivation he provided. He just did not teach the subject but helped to develop my confidence & made me believe that I could achieve my dreams at a time I was having doubts about myself. You kept pushing me to be my best. Thanks to your patience learning from you has been a joyful experience. You never refused to clear my doubts & even adopted different approaches to make me understand it. You pushed me because you knew what I was capable of even when I didn't. Thank you for your unwavering support."
  },
  {
    id: "k1",
    name: "Dr. Khushi Gaur",
    college: "Dr. DY Patil Medical College and Hospital, Pune",
    score: "MBBS",
    rank: "NEET UG",
    batch: "Target Batch",
    image: "/testimonials/Dr_Khushi_Gaur/image.png",
    quote: "Dr. Manohar Sah Sir, You have a unique way of explaining concepts that makes even the most difficult topics feel simple and approachable. Your patience and encouragement create a comfortable space to ask questions and learn without hesitation. Truly grateful for the clarity and confidence you bring into every class. Your guidance played a huge role in my studies."
  },
  {
    id: "v1",
    name: "Dr Vandana Sharma",
    college: "Lady Hardinge Medical College",
    score: "MBBS Graduate",
    rank: "NEET UG",
    batch: "Zoology",
    image: "/testimonials/Dr_Vandana_Sharma/dr_vandana.jpeg",
    quote: "I am Dr Vandana Sharma-a MBBS graduate from Lady Hardinge Medical College, Delhi, and I would like to share my experience with my zoology teacher Dr. Manohar Sah sir for NEET -UG -preparation . The way the concepts were explained was very simple and easy to understand, even for topics that usually feel confusing. Sir mainly focused on building clear basics, which really helped me solve multiple questions from any given topic. Doubts were always addressed patiently, and the teaching approach made learning interesting instead of stressful. Regular revisions and practical examples made it easier to remember concepts for a long time. In addition to helping us excel in academics, he mentored us throughout the course and motivated us to reach our goals and brought out the best in us. He is the GOAT of Zoology. I would definitely recommend him to other NEET UG aspirants."
  },
  {
    id: "m1",
    name: "Dr. Monica Mehta",
    college: "AIIMS Kalyani",
    score: "Top Ranker",
    rank: "NEET UG",
    batch: "Target Batch",
    image: "/testimonials/Dr_Monika/dr_monika.png",
    quote: "Respected sir, Thank you for your guidance. You truly inspired us to achieve our goals. I am fortunate enough to be your student. Your classes were truly engaging. Thank you sir."
  },

  
];

export function TestimonialsGrid() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  
  const totalPages = Math.ceil(mockTestimonials.length / itemsPerPage);
  
  const currentTestimonials = mockTestimonials.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const selectedTestimonial = mockTestimonials.find(t => t.id === selectedId);

  // Close modal on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedId(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 auto-rows-fr">
        {currentTestimonials.map((testimonial) => (
          <motion.div
            layoutId={`card-${testimonial.id}`}
            key={testimonial.id}
            onClick={() => setSelectedId(testimonial.id)}
            className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-shadow cursor-pointer overflow-hidden flex flex-col border border-slate-100"
            whileHover={{ y: -4 }}
          >
            <motion.div layoutId={`image-container-${testimonial.id}`} className="h-56 overflow-hidden relative p-3">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-full h-full object-cover object-top rounded-xl"
              />
            </motion.div>
            
            <motion.div layoutId={`content-${testimonial.id}`} className="p-6 pt-2 flex flex-col items-center text-center">
              <motion.h3 layoutId={`name-${testimonial.id}`} className="font-bold text-lg text-slate-900 mb-1">
                {testimonial.name}
              </motion.h3>
              
              <div className="flex flex-col items-center space-y-2 mt-2">
                <div className="flex items-center space-x-2 text-primary">
                  <Stethoscope size={20} strokeWidth={2.5} />
                  <span className="font-semibold text-slate-700">{testimonial.college}</span>
                </div>
                
                <div className="text-sm text-slate-500 font-medium">
                  {testimonial.score} • {testimonial.rank}
                </div>
                
                <div className="mt-4 text-sm font-medium text-blue-600 flex items-center justify-center transition-colors">
                  Click to view <span className="ml-1">&rarr;</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      <Pagination 
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      <AnimatePresence>
        {selectedId && selectedTestimonial && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
              onClick={() => setSelectedId(null)}
            />
            
            <div className="fixed inset-0 flex items-center justify-center z-[110] p-4 pointer-events-none mt-16 md:mt-0">
              <motion.div
                layoutId={`card-${selectedTestimonial.id}`}
                className="bg-white rounded-3xl shadow-2xl overflow-hidden w-full max-w-3xl pointer-events-auto flex flex-col md:flex-row relative max-h-[75vh]"
              >
                <button
                  onClick={() => setSelectedId(null)}
                  className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur-md rounded-full text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
                >
                  <X size={20} />
                </button>

                <motion.div layoutId={`image-container-${selectedTestimonial.id}`} className="w-full md:w-2/5 h-48 md:h-auto p-4 md:p-6 md:pr-0 shrink-0">
                  <img
                    src={selectedTestimonial.image}
                    alt={selectedTestimonial.name}
                    className="w-full h-full object-cover object-top rounded-2xl"
                  />
                </motion.div>

                <div className="w-full md:w-3/5 p-6 md:p-8 flex flex-col overflow-hidden">
                  <Quote className="text-blue-200 w-10 h-10 mb-3 -ml-2 rotate-180 shrink-0" />
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="flex-1 min-h-0 overflow-y-auto custom-scrollbar pr-4 mb-4"
                  >
                    <p className="text-sm md:text-base text-slate-700 font-medium leading-relaxed italic">
                      "{selectedTestimonial.quote}"
                    </p>
                  </motion.div>
                  
                  <motion.div layoutId={`content-${selectedTestimonial.id}`} className="shrink-0 mt-auto border-t border-slate-100 pt-4">
                    <motion.h3 layoutId={`name-${selectedTestimonial.id}`} className="font-bold text-xl text-slate-900 mb-1">
                      {selectedTestimonial.name}
                    </motion.h3>
                    <div className="flex flex-col space-y-1">
                      <span className="text-primary font-semibold flex items-center gap-1.5">
                        <Stethoscope size={16} />
                        {selectedTestimonial.college}
                      </span>
                      <span className="text-sm text-slate-500">
                        {selectedTestimonial.rank} • {selectedTestimonial.score}
                      </span>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
