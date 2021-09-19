import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useInitFields } from "../hooks/use-init-fields";
import { getLoginFetch } from "../../../services/user-slice";
import {
  FORGOT_PASSWORD_PATH,
  REGISTER_PATH,
} from "../../../routes/constants-path";

enum nameFields {
  Email = "email",
  Password = "password",
}

export default function Login() {
  const dispatch = useDispatch();
  const {
    isBlocked,
    setIsBlocked,
    fields,
    errors,
    setErrors,
    isSend,
    setIsSent,
    handleOnChange,
  } = useInitFields(nameFields);

  const handleOnSendData = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    Object.keys(fields).forEach((name) => {
      if (fields[name].length <= 0) {
        setIsBlocked(true);
        setErrors((state) => ({
          ...state,
          [name]: "Обязательно к заполнению",
        }));
      }
    });

    setIsSent(true);
  };

  useEffect(() => {
    const send = async () => {
      if (!isBlocked && isSend) {
        setIsSent(false);
        await dispatch(
          getLoginFetch({
            email: fields[nameFields.Email],
            password: fields[nameFields.Password],
          })
        );
      }
    };

    send();
  }, [isSend, isBlocked, dispatch, fields, setIsSent]);

  return (
    <section className="login_container">
      <h2 className="text text_type_main-medium">Вход</h2>
      <form onSubmit={handleOnSendData}>
        <div className="login_input_container">
          <Input
            type={"email"}
            placeholder={"E-mail"}
            onChange={handleOnChange}
            value={fields[nameFields.Email]}
            name={nameFields.Email}
            error={!!errors[nameFields.Email]}
            errorText={errors[nameFields.Email]}
          />
        </div>
        <div className="login_input_container">
          <PasswordInput
            onChange={handleOnChange}
            value={fields[nameFields.Password]}
            name={nameFields.Password}
          />
        </div>
        <button type="submit" style={{ display: "none" }}>
          Submit
        </button>
      </form>

      <div className="login_button_container">
        <Button type="primary" size="medium" onClick={handleOnSendData}>
          Войти
        </Button>
      </div>
      <p className="text text_type_main-default">
        <span>Вы — новый пользователь?</span>
        <Link to={REGISTER_PATH}>Зарегистрироваться</Link>
      </p>
      <p className="text text_type_main-default">
        <span>Забыли пароль?</span>
        <Link to={FORGOT_PASSWORD_PATH}>Восстановить пароль</Link>
      </p>
    </section>
  );
}
