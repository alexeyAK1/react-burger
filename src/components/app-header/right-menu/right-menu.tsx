import { ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import { ORDERS_PATH, PROFILE_PATH } from "../../../routes/constants-path";
import MenuButton from "../menu-button/menu-button";


export default function RightMenu() {
  return (
    <MenuButton Icon={ProfileIcon} link={`${PROFILE_PATH}${ORDERS_PATH}`} entry={true}>
      <span>Личный кабинет</span>
    </MenuButton>
  );
}
