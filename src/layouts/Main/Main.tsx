import React from 'react';

import styles from './main.module.css';

interface IProps {
  children: React.ReactChild;
}

export default function Main({ children }: IProps) {
  return (
    <main className={styles.main}>
      <div className={styles.content}>{children}</div>
    </main>
  );
}
