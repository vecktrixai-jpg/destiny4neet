"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

type Testimonial = {
  quote: string;
  name: string;
  designation: string;
  src: string;
};

export const AnimatedTestimonials = ({
  testimonials,
  autoplay = false,
}: {
  testimonials: Testimonial[];
  autoplay?: boolean;
}) => {
  const [active, setActive] = useState(0);
  const [rotations, setRotations] = useState<number[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  // Generate static rotations on mount to avoid hydration mismatch
  useEffect(() => {
    setIsMounted(true);
    setRotations(testimonials.map(() => Math.floor(Math.random() * 21) - 10));
    
    if (autoplay) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay, testimonials.length]);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const isActive = (index: number) => {
    return index === active;
  };

  return (
    <div className="mx-auto max-w-sm px-4 py-4 font-sans antialiased md:max-w-4xl md:px-8 lg:px-12 text-left">
      <div className="relative grid grid-cols-1 gap-6 md:gap-20 md:grid-cols-2">
        <div>
          <div className="relative h-48 md:h-80 w-full hover:scale-[1.02] transition-transform duration-300">
            <AnimatePresence>
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.src}
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    z: -100,
                    rotate: isMounted ? rotations[index] : 0,
                  }}
                  animate={{
                    opacity: isActive(index) ? 1 : 0.7,
                    scale: isActive(index) ? 1 : 0.95,
                    z: isActive(index) ? 0 : -100,
                    rotate: isActive(index) ? 0 : (isMounted ? rotations[index] : 0),
                    zIndex: isActive(index)
                      ? 40
                      : testimonials.length + 2 - index,
                    y: isActive(index) ? [0, -80, 0] : 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    z: 100,
                    rotate: isMounted ? rotations[index] : 0,
                  }}
                  transition={{
                    duration: 0.4,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 origin-bottom"
                >
                  <img
                    src={testimonial.src}
                    alt={testimonial.name}
                    width={500}
                    height={500}
                    draggable={false}
                    className="h-full w-full rounded-2xl object-cover object-top shadow-xl border-4 border-white"
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
        <div className="flex flex-col justify-between py-4">
          <motion.div
            key={active}
            initial={{
              y: 20,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            exit={{
              y: -20,
              opacity: 0,
            }}
            transition={{
              duration: 0.2,
              ease: "easeInOut",
            }}
          >
            <h3 className="text-lg md:text-2xl font-bold text-on-surface">
              {testimonials[active]?.name}
            </h3>
            <p className="text-xs md:text-sm text-primary font-bold tracking-wider uppercase mt-1">
              {testimonials[active]?.designation}
            </p>
            <motion.p className="mt-2 md:mt-4 text-sm text-on-surface-variant leading-relaxed h-56 md:h-72 overflow-y-auto pr-2 custom-scrollbar">
              {testimonials[active]?.quote?.split(" ").map((word, index) => (
                <motion.span
                  key={index}
                  initial={{
                    filter: "blur(10px)",
                    opacity: 0,
                    y: 5,
                  }}
                  animate={{
                    filter: "blur(0px)",
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.2,
                    ease: "easeInOut",
                    delay: 0.01 * index, // Sped up the animation for long text
                  }}
                  className="inline-block"
                >
                  {word}&nbsp;
                </motion.span>
              ))}
            </motion.p>
          </motion.div>
          <div className="flex gap-4 pt-4 md:pt-0">
            <button
              onClick={handlePrev}
              className="group/button flex h-12 w-12 items-center justify-center rounded-full bg-surface-variant hover:bg-primary-container transition-colors"
            >
              <ArrowLeft className="h-6 w-6 text-on-surface-variant group-hover/button:text-primary transition-colors duration-300 group-hover/button:rotate-12" />
            </button>
            <button
              onClick={handleNext}
              className="group/button flex h-12 w-12 items-center justify-center rounded-full bg-surface-variant hover:bg-primary-container transition-colors"
            >
              <ArrowRight className="h-6 w-6 text-on-surface-variant group-hover/button:text-primary transition-colors duration-300 group-hover/button:-rotate-12" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
