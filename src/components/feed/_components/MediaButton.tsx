import React from "react";
import Image from "next/image";
import styles from "../feed.module.sass";

const MediaButton = ({
  title,
  icon,
  onClick,
}: {
  title: string;
  icon: string;
  onClick: () => void;
}) => (
  <div className={styles.media}>
    <button type="button" onClick={onClick}>
      <Image src={`/icons/${icon}.svg`} alt={title} width={40} height={40} />
    </button>
    <p>{title}</p>
  </div>
);

export default MediaButton;
