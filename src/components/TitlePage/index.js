import React from 'react';
import styles from "./index.module.scss";

const Index = (props) => {
  return (
    <div className="text-4xl text-center mb-4">
      <h1>{props.title}</h1>
    </div>
  );
}

export default Index;