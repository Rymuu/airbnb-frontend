import React from 'react';
import styles from "./index.module.scss";
const Index = ({ title, handleClick, type, btnClass }) => {
  return (
    <button
      onClick={handleClick}
      type={type}
      className={`${styles.btn} ${styles[btnClass]}`}
    >
      {title}
    </button>
  );
}

export default Index;