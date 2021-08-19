import React from 'react';

import styles from './AppHeader.module.css';
import LeftMenu from './LeftMenu/LeftMenu';
import LogoLink from '../common/LogoLink/LogoLink';
import RightMenu from './RightMenu/RightMenu';

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
