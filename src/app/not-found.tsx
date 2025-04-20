import React from "react";
import styles from "./page.module.sass";
import { Container } from "@/components";
import Link from "next/link";
const NotFound = () => {
  return (
    <div className={styles.pageNotFound}>
      <Container>
        <div className={styles.content}>
          <h1>Page not found</h1>
          <Link href={"/"}>Go back</Link>
        </div>
      </Container>
    </div>
  );
};

export default NotFound;
