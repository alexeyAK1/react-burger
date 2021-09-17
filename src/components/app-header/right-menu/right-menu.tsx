import React from "react";
import { ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import MenuButton from "../menu-button/menu-button";
import { PROFILE_PATH } from "../../../routes/constants-path";

export default function RightMenu() {
  return (
    <MenuButton Icon={ProfileIcon} link={PROFILE_PATH} entry={true}>
      <span>Личный кабинет</span>
    </MenuButton>
  );
}
