import React from 'react';
import { useState, useRef } from "react";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import "./index.module.scss";
const Index = ({ element }) => {
  const ref = useRef();
  const scroll = (scrollOffset) => {
    ref.current.scrollLeft += scrollOffset;
  };
  const leftButton = <button onClick={() => scroll(-600)}> <FiChevronRight /></button>;

  const rightButton = <button onClick={() => scroll(600)}> <FiChevronLeft /></button>
  return (
    <div>

      <div>
        <div><img height={600} src={"https://www.ecranlarge.com/uploads/image/001/363/animal-crossing-new-horizons-photo-1363428.jpg"} /></div>
        <div><img height={600} src={"https://static1.millenium.org/articles/1/38/75/41/@/1569055-vignette-article_image_t-2.jpg"} /></div>
        <div><img height={600} src={"https://www.ecranlarge.com/uploads/image/001/363/animal-crossing-new-horizons-photo-1363428.jpg"} /></div>
      </div>
      {leftButton}{rightButton}
    </div>
  )
}

export default Index;