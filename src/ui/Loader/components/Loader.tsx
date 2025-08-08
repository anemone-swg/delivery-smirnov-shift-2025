import React from "react";
import { ClipLoader } from "react-spinners";
import styles from "./Loader.module.scss";

const Loader = () => {
  return (
    <div className={styles.loader}>
      <ClipLoader size={50} color="gray" />
    </div>
  );
};

export default Loader;
