import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";
import { slugify } from "../utils/slug"
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

export default function TherapyGallery() {
 const SERVICES = [ { title: "Varma Thokkanam", image: "/images/varma.webp", }, 
    { title: "Dorn Therapy", image: "/images/dorn.webp", }, 
    { title: "Reflexology", image: "/images/Reflexology.webp", }, 
    { title: "Foot Gua Sha", image: "/images/footguasha.webp", }, 
    { title: "Meipadam", image: "/images/meipadam.webp", }, 
    { title: "Meditation", image: "/images/meditation.webp", }, 
    { title: "Kriya", image: "/images/kriya.webp", }, 
].map((s) => ({ ...s, slug: slugify(s.title), }))

  return (
    <section className="py-20 bg-gradient-to-b ">
      <div className="max-w-7xl mx-auto px-4 text-center">

        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
          Our Healing Therapies
        </h2>
        <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
          Experience holistic wellness through our traditional and therapeutic healing sessions.
        </p>

        <Swiper
          effect="coverflow"
          centeredSlides={true}
          grabCursor={true}
          loop={true}
          speed={900}

          breakpoints={{
            0: { slidesPerView: 1.2 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}

          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}

          coverflowEffect={{
            rotate: 20,
            stretch: 0,
            depth: 120,
            modifier: 1,
            slideShadows: false,
          }}

          pagination={{ clickable: true }}
          modules={[EffectCoverflow, Pagination, Autoplay]}
        >
          {SERVICES.map((therapy, index) => (
            <SwiperSlide key={index}>
                <Link to={`/services/${therapy.slug}`}>
              <div className="relative overflow-hidden rounded-2xl shadow-xl group">

                <img
                  src={therapy.image}
                  alt={therapy.title}
                  width="600"
                  height="800"
                  loading="lazy"
                  className="w-full h-[320px] sm:h-[380px] md:h-[420px] lg:h-[450px] object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition duration-500"></div>

                {/* Title */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-lg md:text-xl font-semibold">
                    {therapy.title}
                  </h3>
                </div>

              </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </section>
  );
}
