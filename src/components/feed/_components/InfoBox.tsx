import React from "react";
import styles from "../feed.module.sass";

const InfoBox = () => (
  <div className={styles.infoBox}>
    <p>
      <strong>Formatting Shortcuts:</strong>
    </p>
    <ul>
      <li>
        <code>**bold**</code> → <strong>bold</strong>
      </li>
      <li>
        <code>*italic*</code> → <em>italic</em>
      </li>
      <li>
        Use <code>Ctrl + B</code> for <b>bold</b> and <code>Ctrl + I</code> for <i>italic</i>.
      </li>
    </ul>
  </div>
);

export default InfoBox;
