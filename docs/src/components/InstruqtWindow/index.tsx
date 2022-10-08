import React from 'react';

import styles from './styles.module.css';

interface Props {
  src: string;
}

export default function InstruqtWindow({
  src
}: Props): JSX.Element {
  return (
    <div className={styles.instruqtWindow}>
      <div className={styles.instruqtWindowHeader}>
      </div>
      <div className={styles.instruqtWindowBody}>
        <iframe className={styles.instruqtFrame}
          title="instruqt embedded"
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-modals"
          src={src}>
        </iframe>
      </div>
    </div>
  );
}
