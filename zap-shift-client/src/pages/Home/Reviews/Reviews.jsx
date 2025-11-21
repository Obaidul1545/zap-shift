import React, { use } from 'react';
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import ReviewCard from './ReviewCard';

const Reviews = ({ reviewsPromise }) => {
  const reviews = use(reviewsPromise);

  return (
    <div>
      <div className="my-20">
        <div className=" text-center">
          <h2 className="text-3xl ">Reviews</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum saepe
            doloribus, reiciendis ipsa deserunt rem facere consequatur quae
            aliquam? Amet numquam nam aliquam natus doloribus velit dolorem
            porro officiis excepturi.
          </p>
        </div>
        <>
          <Swiper
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            spaceBetween={10}
            slidesPerView={3}
            coverflowEffect={{
              rotate: 30,
              stretch: '50%',
              depth: 100,
              modifier: 1,
              scale: 0.75,
              slideShadows: true,
            }}
            pagination={true}
            modules={[EffectCoverflow, Pagination, Autoplay]}
            loop={true}
            autoplay={{
              delay: 1000,
              disableOnInteraction: false,
            }}
            className="mySwiper my-10"
          >
            {reviews.map((reviews) => (
              <SwiperSlide key={reviews.id}>
                <ReviewCard reviews={reviews}></ReviewCard>
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      </div>
    </div>
  );
};

export default Reviews;
