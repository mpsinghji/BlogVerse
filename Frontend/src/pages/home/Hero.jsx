import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import Img1 from "../../assets/1.jpg";
import "swiper/css";
import "swiper/css/pagination";

const Hero = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-between items-center gap-8 py-12 px-4 sm:px-8">
      {/* Text Content */}
      <div className="lg:w-1/2 w-full space-y-6 relative z-10">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 to-cyan-300 bg-clip-text text-transparent leading-tight">
            HEADING
          </h1>
        </div>
        
        <p className="text-slate-300/80 text-lg md:text-xl leading-relaxed">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus sapiente consequatur quis nemo quo fugit neque dolorum, nulla modi architecto ratione, quisquam labore, omnis reprehenderit sint reiciendis! Quas, magnam? Quasi.
          Et architecto.
        </p>
        
        <div className="flex gap-4 mt-8">
          <button className="px-8 py-3.5 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-full text-white font-semibold hover:from-purple-500 hover:to-cyan-400 transition-all duration-300 shadow-lg hover:shadow-cyan-500/20">
            Get Started
          </button>
        </div>
      </div>

      {/* Swiper Container */}
      <div className="lg:w-1/2 w-full relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-cyan-400/20 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
        
        <div className="relative backdrop-blur-lg border border-slate-700/30 rounded-2xl overflow-hidden shadow-2xl shadow-purple-500/10 hover:shadow-cyan-500/20 transition-shadow duration-300">
          <Swiper
            slidesPerView={1}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            pagination={{ 
              clickable: true,
              bulletClass: 'swiper-pagination-bullet !bg-gradient-to-r from-purple-400 to-cyan-300 !opacity-50',
              bulletActiveClass: '!opacity-100 !scale-125'
            }}
            modules={[Autoplay, Pagination]}
            className="hover:scale-[1.01] transition-transform duration-300"
          >
            {[...Array(5)].map((_, index) => (
              <SwiperSlide key={index}>
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                  <img 
                    src={Img1} 
                    alt={`Tech ${index + 1}`} 
                    className="w-full h-[400px] sm:h-[500px] object-cover object-center"
                  />
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-cyan-300 bg-clip-text text-transparent">
                      Innovation Spotlight #{index + 1}
                    </h3>
                    <p className="text-slate-300/80 mt-2">Discover next-generation solutions</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Ambient Elements */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-20 -left-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl -z-10"></div>
    </div>
  );
};

export default Hero;