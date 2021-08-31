import React from 'react';

import styles from './header.module.css';

interface IProps {
  children: React.ReactChild;
}

export default function Header({ children }: IProps) {
  return (
    <header className={styles.header}>
      <div className={styles.content}>{children}</div>
    </header>
  );
}
