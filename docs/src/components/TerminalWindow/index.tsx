import React, {type ReactNode} from 'react';

import styles from './styles.module.css';

interface Props {
  children: ReactNode;
  minHeight: number;
  url: string;
}

export default function TerminalWindow({
  children,
  minHeight,
}: Props): JSX.Element {
  return (
    <div className={styles.terminalWindow} style={{minHeight}}>
      <div className={styles.terminalWindowHeader}>
        <div className={styles.buttons}>
          <span className={styles.dot} style={{background: '#ff6259'}} />
          <span className={styles.dot} style={{background: '#febd2d'}} />
          <span className={styles.dot} style={{background: '#29cd41'}} />
        </div>
      </div>
      <div className={styles.terminalWindowBody}>{children}</div>
    </div>
  );
}
