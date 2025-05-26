import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import carrusel1 from "../assets/images/carrusel1.webp";
import carrusel2 from "../assets/images/carrusel2.webp";
import carrusel3 from "../assets/images/carrusel3.webp";

const slides = [
  { title: "Slide 1", image: carrusel1 },
  { title: "Slide 2", image: carrusel2 },
  { title: "Slide 3", image: carrusel3 },
];

export default function Slider() {
  return (
    <section className="w-full mt-10">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop
        centeredSlides
        slidesPerView={1.2}
        spaceBetween={15}
        className="relative !overflow-visible"
      >
        {slides.map((slide, idx) => (
          <SwiperSlide
            key={idx}
            className="!overflow-visible"
          >
            <div className="flex justify-center">
              <div
                className="h-[500px]
                           w-full
                           max-w-[95%]
                           bg-center bg-cover
                           rounded-lg
                           shadow-[0_8px_30px_rgba(0,0,0,0.8)]   {/* sombra más intensa */}
                           transition-all duration-300
                           hover:border-white"
                style={{ backgroundImage: `url(${slide.image})` }}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* override de overflow oculto en el wrapper de Swiper */}
      <style jsx global>{`
        .swiper-wrapper {
          overflow: visible !important;
        }
        .swiper-button-prev,
        .swiper-button-next {
          color: white;
        }
        .swiper-pagination-bullets {
          bottom: 10px !important;
        }
        .swiper-pagination-bullet {
          background-color: #d1d5db;
          opacity: 0.6;
        }
        .swiper-pagination-bullet-active {
          opacity: 1;
        }
      `}</style>
    </section>
  );
}
