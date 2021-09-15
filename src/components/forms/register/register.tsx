import React from "react";
import { Link } from "react-router-dom";

import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

export default function Register() {
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {};

  return (
    <section className="login_container">
      <h2 className="text text_type_main-medium">Регистрация</h2>
      <div className="login_input_container">
        <Input
          type={"text"}
          placeholder={"Имя"}
          onChange={handleOnChange}
          //   icon={'CurrencyIcon'}
          value={""}
          name={"name"}
          error={false}
          //   ref={inputRef}
          //   onIconClick={onIconClick}
          errorText={"Ошибка"}
          //   size={"small"}
        />
      </div>
      <div className="login_input_container">
        <Input
          type={"email"}
          placeholder={"E-mail"}
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
        <PasswordInput onChange={handleOnChange} value={""} name={"password"} />
      </div>
      <div className="login_button_container">
        <Button type="primary" size="medium">
          Зарегистрироваться
        </Button>
      </div>
      <p className="text text_type_main-default">
        <span>Уже зарегистрированы?</span>
        <Link to={"/"}>Войти</Link>
      </p>
    </section>
  );
}
