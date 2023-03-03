import { useState } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

const Index = ({ images, handleClick }) => {
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
        <div className="hover:bg-gray-500 rounded-2xl flex">
          <img
            key={index}
            className={`absolute rounded-2xl object-cover aspect-square w-full h-full 
            transition-opacity duration-500 ${index === currentIndex ? "opacity-100" : "opacity-0"
              }`}
            src={image}
            alt="carousel slide"
            onClick={handleClick}
          />
        </div>
      ))}
      <div className="absolute bottom-0 w-full flex justify-center space-x-2 mb-4">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full bg-gray-400 hover:bg-white focus:outline-none focus:bg-white transition-colors duration-300 ${index === currentIndex ? "bg-white" : ""
              }`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
      <button
        className="absolute bg-white top-1/2 left-0 w-8 h-8 transform -translate-y-1/2 text-3xl text-gray-900 hover:text-gray-700 focus:outline-none rounded-full"
        onClick={goToPreviousSlide}
      >
        <BsChevronLeft className="w-6 h-6"/>
      </button>
      <button
        className="absolute bg-white top-1/2 right-0 w-8 h-8 transform -translate-y-1/2 text-3xl hover:text-gray-900 text-gray-700 focus:outline-none rounded-full text-right"
        onClick={goToNextSlide}
      >
        <BsChevronRight className="w-6 h-6"/>
      </button>
    </>
  );
}

export default Index;