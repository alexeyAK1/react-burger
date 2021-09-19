import React from 'react';

import styles from './login-layout-container.module.css';

interface IProps {
  children: React.ReactChild;
}

export default function LoginLayoutContainer({ children }: IProps) {
  return (
    <div className={styles.login_layout_container}>{children}</div>
  );
}