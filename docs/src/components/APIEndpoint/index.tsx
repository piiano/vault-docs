import React from 'react';
import HTTPMethod from "@site/src/components/HTTPMethod";

import styles from './styles.module.css';

export default function APIEndpoint({method, path}: {method: string, path: string}) {
  return (
    <div className={styles.apiEndpointBox}>
      <HTTPMethod method={method} />
      <div className={styles.apiEndpointPath}>{path}</div>
    </div>
  )
}
