import React, { useState } from "react";
import { Link } from "react-router-dom";

import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";

export default function ResetPassword() {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {};
  const handleOnIconClick = () => {
    setIsShowPassword(!isShowPassword);
  };

  return (
    <section className="login_container">
      <h2 className="text text_type_main-medium">Восстановление пароля</h2>
      <div className="login_input_container">
        <Input
          type={"text"}
          placeholder={"Укажите e-mail"}
          onChange={handleOnChange}
          //   icon={'CurrencyIcon'}
          value={""}
          name={"email"}
          error={false}
          //   ref={inputRef}
          //   onIconClick={onIconClick}
          errorText={"Ошибка"}
          //   size={"small"}
        />
      </div>
      <div className="login_input_container">
        <Input
          type={isShowPassword ? "text" : "password"}
          placeholder={"Введите новый пароль"}
          onChange={handleOnChange}
          icon={isShowPassword ? "HideIcon" : "ShowIcon"}
          value={""}
          name={"password"}
          error={false}
          //   ref={inputRef}
          onIconClick={handleOnIconClick}
          errorText={"Ошибка"}
          //   size={"small"}
        />
      </div>
      <div className="login_input_container">
        <Input
          type={"text"}
          placeholder={"Введите код из письма"}
          onChange={handleOnChange}
          //   icon={'CurrencyIcon'}
          value={""}
          name={"code"}
          error={false}
          //   ref={inputRef}
          //   onIconClick={onIconClick}
          errorText={"Ошибка"}
          //   size={"small"}
        />
      </div>
      <div className="login_button_container">
        <Button type="primary" size="medium">
          Восстановить/Сохранить
        </Button>
      </div>
      <p className="text text_type_main-default">
        <span>Вспомнили пароль?</span>
        <Link to={"/"}>Войти</Link>
      </p>
    </section>
  );
}
