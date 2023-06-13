import React from 'react';
import styles from '../app/page.module.css';

const Loader = () => {
  return (
    <div className={styles["parent-position"]}>
    <div className={styles["loader-container"]}>
      <div className={styles["loader"]}></div>
    </div>
    </div>
  );
};

export default Loader;
