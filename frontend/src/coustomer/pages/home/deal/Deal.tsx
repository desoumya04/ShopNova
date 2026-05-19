import React from "react";
import DealCard from "./DealCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Deal = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 2000,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplaySpeed: 2000,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="my-5">
      <div className="slider-container">
        <Slider {...settings} className="gap-5">
          {[1, 1, 1, 1, 1, 1, 1].map((item) => (
            <DealCard
              deal={{
                image:
                  "https://rukminim2.flixcart.com/image/2940/2940/xif0q/kurta/g/7/8/m-1258ykwhite-ikrass-original-imahhuzfvpnqq2cd.jpeg?q=90",
                discount: "50% off",
              }}
            />
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Deal;
