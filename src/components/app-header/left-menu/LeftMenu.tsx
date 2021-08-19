import React from 'react';
import {
  BurgerIcon,
  ListIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './left-menu.module.css';
import MenuButton from '../menu-button/menu-button';

export default function LeftMenu() {
  return (
    <menu className={`text text_type_main-default ${styles.left_menu}`}>
      <MenuButton Icon={BurgerIcon} link="#" isSelected={true}>
        <span>Конструктор</span>
      </MenuButton>
      <MenuButton Icon={ListIcon} link="#">
        <span>Лента заказов</span>
      </MenuButton>
    </menu>
  );
}
