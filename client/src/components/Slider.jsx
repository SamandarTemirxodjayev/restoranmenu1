import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import { EffectCoverflow, Pagination, Navigation, Autoplay } from 'swiper';
import slide_image_5 from '../assets/images/img_5.jpg';
import axios from 'axios';

function Slider() {
  const [ photos, setPhotos ] = useState([]);

  useEffect(() => {
    axios.get('https://restoran-server-project.vercel.app/banner')
    .then(response => {
      setPhotos(response.data.banners);
    })
  },[])
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 " style={{height:"23rem"}}>
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
        }}
        pagination={{ el: '.swiper-pagination', clickable: true }}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
          clickable: true,
        }}
        modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        className="swiper_container"
      >
        {photos.map((photo, index) => (
          <SwiperSlide key={index}>
            <img src={photo.photo_url} alt="slide_image" />
          </SwiperSlide>
        ))}

        <SwiperSlide>
          <img src={slide_image_5} alt="slide_image" />
        </SwiperSlide>


      </Swiper>
    </div>
  );
}

export default Slider;
