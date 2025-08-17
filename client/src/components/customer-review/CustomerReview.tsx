"use client";

import { CircleCheck, Star } from "lucide-react";
import Carousel, { ResponsiveType } from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { reviews } from "./review";

const CustomerReview: React.FC = () => {
  const responsive: ResponsiveType = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  return (
    <div className="mt-16">
      <h2 className="mb-8 text-center text-2xl font-bold text-gray-700 uppercase md:text-4xl">
        Our happy Customer Reviews
      </h2>
      <Carousel
        swipeable
        draggable
        showDots={false}
        responsive={responsive}
        ssr
        infinite
        autoPlay
        autoPlaySpeed={3000}
        keyBoardControl
        customTransition="transform 2s ease-in-out"
        transitionDuration={2000}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
      >
        {reviews.map((review) => (
          <div
            key={review.id}
            className="font-inter mx-3 cursor-pointer rounded-md border p-5 shadow-sm transition-all duration-200 hover:scale-105"
          >
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="size-6 text-yellow-400" />
              ))}
            </div>
            <div className="flex items-center gap-1">
              <p className="mt-1 ml-1 text-base font-semibold text-gray-800">
                {review.name}
              </p>
              <CircleCheck className="h-5 w-5 text-green-500" />
            </div>
            <p className="mt-1 text-sm text-gray-700">{review.text}</p>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default CustomerReview;
