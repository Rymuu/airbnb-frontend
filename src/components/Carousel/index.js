import { useState } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

const Index = ({images}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const goToPreviousSlide = () => {
    const index = (currentIndex - 1 + images.length) % images.length;
    setCurrentIndex(index);
  };

  const goToNextSlide = () => {
    const index = (currentIndex + 1) % images.length;
    setCurrentIndex(index);
  };

  return (
    <>
      {images.map((image, index) => (
        <img
          key={index}
          className={`absolute w-full h-full object-cover transition-opacity duration-500 ${index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          src={image}
          alt="carousel slide"
        />
      ))}
      <div className="absolute bottom-0 w-full flex justify-center space-x-2 mb-4">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-4 h-4 rounded-full bg-gray-400 hover:bg-gray-900 focus:outline-none focus:bg-gray-900 transition-colors duration-300 ${index === currentIndex ? "bg-gray-900" : ""
              }`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
      <button
        className="absolute top-1/2 left-0 w-12 h-12 transform -translate-y-1/2 text-3xl text-gray-900 hover:text-gray-700 focus:outline-none rounded-full"
        onClick={goToPreviousSlide}
      >
        <BsChevronLeft />
      </button>
      <button
        className="absolute top-1/2 right-0 w-12 h-12 transform -translate-y-1/2 text-3xl text-gray-900 hover:text-gray-700 focus:outline-none rounded-full"
        onClick={goToNextSlide}
      >
        <BsChevronRight />
      </button>
    </>
  );
}

export default Index;