import React from 'react';

import styles from './two-columns.module.css';

interface IProps {
  children: React.ReactChild;
  style?: React.CSSProperties;
}

export default function TwoColumns({ children, style }: IProps) {
  return (
    <div className={styles.two_columns} style={style ? style : {}}>
      {children}
    </div>
  );
}
