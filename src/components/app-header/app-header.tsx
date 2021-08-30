import React from 'react';

import styles from './app-header.module.css';
import LeftMenu from './left-menu/LeftMenu';
import LogoLink from '../UI/logo-link/logo-link';
import RightMenu from './right-menu/right-menu';

export default function AppHeader() {
  return (
    <nav className={styles.app_header}>
      <div className={styles.content_left}>
        <LeftMenu />
      </div>
      <div className={styles.content_center}>
        <LogoLink />
      </div>
      <div className={styles.content_right}>
        <RightMenu />
      </div>
    </nav>
  );
}
