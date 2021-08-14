import React from 'react';
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import MenuButton from '../MenuButton/MenuButton';

export default function RightMenu() {
  return (
    <MenuButton Icon={ProfileIcon} link="#">
      <span>Личный кабинет</span>
    </MenuButton>
  );
}
