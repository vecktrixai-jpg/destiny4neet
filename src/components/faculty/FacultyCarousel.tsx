export function FacultyCarousel() {
  // Generate array of 20 images
  const images = Array.from({ length: 20 }, (_, i) => `/general_testimonials/${i + 1}.jpeg`);
  // Duplicate for seamless infinite scrolling
  const marqueeImages = [...images, ...images];

  return (
    <section className="mb-32 overflow-hidden">
      <div className="flex gap-4 px-4 animate-scroll hover:pause w-max">
        {marqueeImages.map((src, idx) => (
          <div
            key={idx}
            className={`flex-none w-[150px] md:w-[200px] aspect-[4/5] rounded-xl overflow-hidden shadow-sm border border-outline-variant/30 ${
              idx % 2 === 1 ? "mt-8" : ""
            }`}
          >
            <img
              className="w-full h-full object-cover"
              alt={`Testimonial ${idx + 1}`}
              src={src}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
