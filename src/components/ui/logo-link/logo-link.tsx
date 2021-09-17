import React from "react";
import { Link } from "react-router-dom";
import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./logo-link.module.css";
import { MAIN_PATH } from "../../../routes/constants-path";

const LogoLink = () => {
  return (
    <Link className={`pt-6 pb-6 ${styles.logo_link}`} to={MAIN_PATH}>
      <Logo />
    </Link>
  );
};

export default LogoLink;
