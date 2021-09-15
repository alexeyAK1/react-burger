import React from "react";
import { Link } from "react-router-dom";

import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";

export default function ForgotPassword() {
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {};

  return (
    <section className="login_container">
      <h2 className="text text_type_main-medium">Восстановление пароля</h2>
      <div className="login_input_container">
        <Input
          type={"email"}
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
      <div className="login_button_container">
        <Button type="primary" size="medium">
          Восстановить
        </Button>
      </div>
      <p className="text text_type_main-default">
        <span>Вспомнили пароль?</span>
        <Link to={"/"}>Войти</Link>
      </p>
    </section>
  );
}
