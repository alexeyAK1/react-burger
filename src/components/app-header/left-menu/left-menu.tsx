import {
  BurgerIcon,
  ListIcon
} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import { FEED_PATH } from "../../../routes/constants-path";
import MenuButton from "../menu-button/menu-button";
import styles from "./left-menu.module.css";

export default function LeftMenu() {
  return (
    <menu className={`text text_type_main-default ${styles.left_menu}`}>
      <MenuButton Icon={BurgerIcon} link="/">
        <span>Конструктор</span>
      </MenuButton>
      <MenuButton Icon={ListIcon} link={FEED_PATH}>
        <span>Лента заказов</span>
      </MenuButton>
    </menu>
  );
}
