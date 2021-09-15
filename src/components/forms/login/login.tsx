import React from "react";
import { Link } from "react-router-dom";

import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

export default function Login() {
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {};

  return (
    <section className="login_container">
      <h2 className="text text_type_main-medium">Вход</h2>
      <div className="login_input_container">
        <Input
          type={"email"}
          placeholder={"E-mail"}
          onChange={handleOnChange}
          value={""}
          name={"email"}
          error={false}
          errorText={"Ошибка"}
        />
      </div>
      <div className="login_input_container">
        <PasswordInput onChange={handleOnChange} value={""} name={"password"} />
      </div>
      <div className="login_button_container">
        <Button type="primary" size="medium">
          Войти
        </Button>
      </div>
      <p className="text text_type_main-default">
        <span>Вы — новый пользователь?</span>
        <Link to={"/register"}>Зарегистрироваться</Link>
      </p>
      <p className="text text_type_main-default">
        <span>Забыли пароль?</span>
        <Link to={"/forgot-password"}>Восстановить пароль</Link>
      </p>
    </section>
  );
}
