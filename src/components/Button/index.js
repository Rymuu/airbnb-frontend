import React from 'react';
import styles from "./index.module.scss";
const Index = ({ title, handleClick, type, btnClass, icon }) => {
  return (
    <button
      onClick={handleClick}
      type={type}
      className={btnClass}
    >
      {icon}
      {title}
    </button>
  );
}

export default Index;