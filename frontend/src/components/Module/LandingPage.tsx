import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowDown } from "lucide-react";
import img1 from "../../assets/images/landingpage/img1.png";
import img2 from "../../assets/images/landingpage/img2.png";
import img3 from "../../assets/images/landingpage/img3.png";

const images = [
  img1,
    img2,
    img3,
];

export default function LandingPage() {
  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef<number | null>(null);

  // Auto play setiap 5 detik
//   useEffect(() => {
//     const next = () => {
//       setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
//     };
//     timeoutRef.current = setInterval(next, 5000);
//     return () => clearInterval(timeoutRef.current);
//   }, []);
useEffect(() => {
  const next = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  timeoutRef.current = window.setInterval(next, 5000);

  return () => {
    if (timeoutRef.current !== null) {
      clearInterval(timeoutRef.current);
    }
  };
}, []);

  const goToPrev = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleLaunch = () => {
    window.scrollTo({
      top: window.innerHeight, // scroll 1 viewport ke bawah
      behavior: "smooth",
    });
  };

  return (
    <section className="relative w-full h-screen bg-white flex items-center justify-center overflow-hidden">
      {/* Carousel */}
      <div className="relative w-full h-full">
        {images.map((src, index) => (
          <motion.img
            key={index}
            src={src}
            alt={`slide-${index}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
              index === current ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}

        {/* Overlay warna putih semi transparan biar nuansa soft */}
        <div className="absolute inset-0 bg-white/20" />

        {/* Panah kiri */}
        <button
          onClick={goToPrev}
          className="absolute top-1/2 left-4 -translate-y-1/2 bg-orange-500/70 hover:bg-orange-600 text-white p-2 rounded-full shadow-lg"
        >
          <ChevronLeft size={28} />
        </button>

        {/* Panah kanan */}
        <button
          onClick={goToNext}
          className="absolute top-1/2 right-4 -translate-y-1/2 bg-orange-500/70 hover:bg-orange-600 text-white p-2 rounded-full shadow-lg"
        >
          <ChevronRight size={28} />
        </button>
      </div>

      {/* Tombol Launch */}
      <motion.button
        onClick={handleLaunch}
        className="absolute bottom-10 flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-full shadow-lg"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span>Launch</span>
        <ArrowDown className="animate-bounce" />
      </motion.button>
    </section>
  );
}
