import React from "react";
import styles from "../feed.module.sass";

const SelectedImagePreview = ({ image }: { image: File }) => (
  <div className={styles.selectedImage}>
    <img src={URL.createObjectURL(image)} alt="Selected" width={100} height={100} />
  </div>
);

export default SelectedImagePreview;
