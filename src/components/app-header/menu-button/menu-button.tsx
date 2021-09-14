import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

import styles from "./menu-button.module.css";

type TType = "primary" | "secondary";

interface IIconProps {
  type: TType;
}

interface IProps {
  Icon?: React.ComponentType<IIconProps>;
  link: string;
  children: React.ReactChild;
}

export default function MenuButton({
  Icon,
  link,
  children,
}: IProps) {
  const location = useLocation();
  const [isSelected, setIsSelected] = useState(false);
  const [isDisplayed, setIsDisplayed] = useState(false);
  const classType = isDisplayed ? "text_color_primary" : "text_color_inactive";
  const type: TType = isDisplayed ? "primary" : "secondary";

  useEffect(() => {
    setIsSelected(location.pathname === link);
  }, [link, location.pathname]);

  useEffect(() => {
    if (isSelected) {
      setIsDisplayed(true);
    } else {
      setIsDisplayed(false);
    }
  }, [isSelected]);

  return (
    <NavLink
      to={{ pathname: link }}
      className={`p-4 pl-5 pr-5 ${classType} ${styles.menu_button}`}
      onMouseEnter={() => setIsDisplayed(true)}
      onMouseLeave={() => setIsDisplayed(isSelected)}
    >
      {Icon ? <Icon type={type} /> : null}
      {children}
    </NavLink>
  );
}
