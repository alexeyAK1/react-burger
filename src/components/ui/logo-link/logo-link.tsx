import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './logo-link.module.css';

const LogoLink = () => {
  return (
    <Link className={`pt-6 pb-6 ${styles.logo_link}`} to="/">
      <Logo />
    </Link>
  );
};

export default LogoLink;
