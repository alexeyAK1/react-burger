import React from 'react';

import styles from './main-maximum-height.module.css';

interface IProps {
  children: React.ReactChild;
}

export default function MainMaximumHeight({ children }: IProps) {
  return <div className={styles.main_maximum_height}>{children}</div>;
}
