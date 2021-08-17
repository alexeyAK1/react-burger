import React from 'react';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './LogoLink.module.css';

const LogoLink = () => {
  return (
    <a className={`pt-6 pb-6 ${styles.logo_link}`} href="/">
      <Logo />
    </a>
  );
};

export default LogoLink;
