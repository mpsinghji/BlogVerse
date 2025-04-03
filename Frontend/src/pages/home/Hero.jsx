import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const Hero = () => {
  const slides = [
    {
      url: "https://i.postimg.cc/L5zrNSP0/Top-Ten-Must-Visit-Places-In-India.webp",
      text: "Must Visit Places in India"
    },
    {
      url: "https://i.postimg.cc/3rv7k5kG/amazon.jpg",
      text: "Amazon Rainforest"
    },
    {
      url: "https://i.postimg.cc/XYQ6RnzR/food-sustainability.jpg",
      text: "Food Sustainability"
    },
    {
      url: "https://i.postimg.cc/bYkczx5H/video-social-media.jpg",
      text: "Video and Social Media"
    },
    {
      url: "https://i.postimg.cc/G2s0TGmR/sustainable.webp",
      text: "Sustainable Living"
    }
  ];

  return (
    <div className="flex flex-col lg:flex-row justify-between items-center gap-8 py-5 px-4 sm:px-8">
      {/* Text Content */}
      <div className="lg:w-1/2 w-full space-y-6 relative z-10">
        <div className="relative group">
          {/* <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-1000"></div> */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-white bg-clip-text text-transparent leading-tight">
            HEADING
          </h1>
        </div>
        
        <p className="text-slate-300/80 text-lg md:text-xl leading-relaxed">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus sapiente consequatur quis nemo quo fugit neque dolorum, nulla modi architecto ratione, quisquam labore, omnis reprehenderit sint reiciendis! Quas, magnam? Quasi.
          Et architecto.
        </p>
        
        <div className="flex gap-4 mt-8">
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
            {slides.map((slide, index) => (
              <SwiperSlide key={index}>
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                  <img 
                    src={slide.url} 
                    alt={`Slide ${index + 1}`} 
                    className="w-full h-[400px] sm:h-[500px] object-cover object-center"
                  />
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-xl font-bold bg-white bg-clip-text text-transparent">
                      {slide.text}
                    </h3>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

    </div>
  );
};

export default Hero;