import Model from "./Model";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import NextImage from "../NextImage";

const CarouselModel = ({ closeModel, data }) => {
  const filteredData = [
    data.medias[data.startIndex],
    ...data.medias.filter((_, i) => i !== data.startIndex),
  ];

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
            <div key={i}>
              {media.type === "image" ? (
                media.photo ? (
                  <NextImage
                    photo={media.photo}
                    className="w-full aspect-w-16 aspect-h-9 relative"
                  />
                ) : media.absoluteUrl ? (
                  <NextImage
                    absoluteUrl={media?.absoluteUrl}
                    className="w-full aspect-w-16 aspect-h-9 relative"
                  />
                ) : (
                  <NextImage
                    url={media.src}
                    className="w-full aspect-w-16 aspect-h-9 relative"
                  />
                )
              ) : (
                media.type === "video" && (
                  <video
                    src={`${media.src}`}
                    controls={true}
                    className="px-5"
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
