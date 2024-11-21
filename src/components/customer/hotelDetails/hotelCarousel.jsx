import React from "react";
import { Carousel } from "react-responsive-carousel";

export default function HotelCarousel({ photos }) {
  return (
    <Carousel
      showThumbs={false}
      showStatus={false}
      infiniteLoop={true}
      autoPlay={true}
      centerMode={true}
      centerSlidePercentage={"50"}
      dynamicHeight={true}
    >
      {photos.map((photo, index) => (
        <img key={index} src={photo} alt=""/>
      ))}
    </Carousel>
  );
}
