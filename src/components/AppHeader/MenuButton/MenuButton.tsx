import React, { useState } from 'react';

import styles from './MenuButton.module.css';

type TType = 'primary' | 'secondary';

interface IIconProps {
  type: TType;
}

interface IProps {
  Icon?: React.ComponentType<IIconProps>;
  link: string;
  isSelected?: boolean;
  children: React.ReactChild;
}

export default function MenuButton({
  Icon,
  link,
  isSelected = false,
  children,
}: IProps) {
  const [displayed, setDisplayed] = useState(isSelected);
  const classType = displayed ? 'text_color_primary' : 'text_color_inactive';
  const type: TType = displayed ? 'primary' : 'secondary';

  return (
    <a
      href={link}
      className={`p-4 pl-5 pr-5 ${classType} ${styles.menu_button}`}
      onMouseEnter={() => setDisplayed(true)}
      onMouseLeave={() => setDisplayed(isSelected)}
    >
      {Icon ? <Icon type={type} /> : null}
      {children}
    </a>
  );
}
