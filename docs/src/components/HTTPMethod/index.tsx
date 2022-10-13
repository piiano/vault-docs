import React from "react";
import styles from "./styles.module.css";

export default function HTTPMethod({method}: {method: string}) {
  return (
    <span
      className={styles.httpMethod}
      style={{background: `var(--http-${method})`}}>
      {method}
    </span>
  );
}
