import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";

import Img1 from "../../assets/1.jpg"
const Hero = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center md:gap-14 gap-8">
      <div className="md:w-1/2 w-full items-center">
        <hl className="md:text-5xl text-3xl font-bold md:leading-tight">
          HEADING
        </hl>
        <p className="py-4">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Temporibus dicta in nam recusandae accusantium nisi at aliquam alias eveniet saepe magni, tempora, consequatur similique inventore? Cum dolor quas quam culpa!
          Officiis fugiat possimus dolores praesentium vero est nisi, obcaecati placeat consequatur eum sequi consectetur eaque! Mollitia odit nisi quam perferendis praesentium necessitatibus, eos maxime ea sunt. Quam quibusdam quisquam possimus.
        </p>
      </div>
      <div className="md:w-1/2 w-full mx-auto">
        <Swiper
          slidesPerView={1} 
          spaceBetween={10}
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 1,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 1,
              spaceBetween: 50,
            },
          }}
          modules={[Pagination, Autoplay]}
          className="mySwiper"
        >
          <SwiperSlide>
            <img src={Img1} alt="" className="w-full lg:h-[420px] sm:h-96 h-80"></img>
          </SwiperSlide>
          <SwiperSlide>
            <img src={Img1} alt="" className="w-full lg:h-[420px] sm:h-96 h-80"></img>
          </SwiperSlide>
          <SwiperSlide>
            <img src={Img1} alt="" className="w-full lg:h-[420px] sm:h-96 h-80"></img>
          </SwiperSlide>
          <SwiperSlide>
            <img src={Img1} alt="" className="w-full lg:h-[420px] sm:h-96 h-80"></img>
          </SwiperSlide>
          <SwiperSlide>
            <img src={Img1} alt="" className="w-full lg:h-[420px] sm:h-96 h-80"></img>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default Hero;
