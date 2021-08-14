import Model from "./Model";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Image from "next/image";
import { useState } from "react";

const CarouselModel = ({ closeModel, data }) => {
  const filteredData = [
    data.medias[data.startIndex],
    ...data.medias.filter((_, i) => i !== data.startIndex),
  ];
  const [currentIndex, setCurrentIndex] = useState(0);
  return (
    <Model closeModel={closeModel}>
      <Carousel
        showArrows={true}
        showThumbs={false}
        emulateTouch={true}
        useKeyboardArrows={true}
        showIndicators={false}
        autoFocus={true}
      >
        {filteredData.length > 0 &&
          filteredData.map((media, i) => (
            <div key={i} className="w-full aspect-w-16 aspect-h-9 relative">
              {media.type === "image" ? (
                <Image
                  src={`/img/users/${media.src}`}
                  alt="post-photo"
                  layout="fill"
                  className="object-cover rounded"
                  placeholder="blur"
                  blurDataURL="/img/users/default/user.jpg"
                />
              ) : (
                media.type === "video" && (
                  <video
                    src={`/video/users/${media.src}`}
                    controls={true}
                  ></video>
                )
              )}
            </div>
          ))}
      </Carousel>
    </Model>
  );
};

export default CarouselModel;
