import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { getResetPassword } from "../../../api/agent";
import { useInitFields } from "../hooks/use-init-fields";
import { LOGIN_PATH } from "../../../routes/constants-path";

enum nameFields {
  Password = "password",
  Code = "code",
}

export default function ResetPassword() {
  const history = useHistory();
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
  const [isShowPassword, setIsShowPassword] = useState(false);
  const handleOnIconClick = () => {
    setIsShowPassword(!isShowPassword);
  };
  const handleOnSendData = async (e: React.SyntheticEvent<Element, Event>) => {
    Object.keys(fields).forEach((name) => {
      if (!fields[name as nameFields].length) {
        setErrors({ ...errors, [name]: "Обязательно к заполнению" });
        setIsBlocked(true);
      }
    });

    setIsSent(true);
  };

  useEffect(() => {
    const send = async () => {
      if (!isBlocked && isSend) {
        setIsBlocked(false);
        try {
          const result = await getResetPassword(
            fields[nameFields.Password],
            fields[nameFields.Code]
          );

          if (result.success) {
            history.push(LOGIN_PATH);
          }
        } catch (error) {
          const [errorSuccess, errorMessage] = (error as Error).message.split(
            "==="
          );
          alert(errorMessage);
          console.log(errorSuccess);
          console.log(error);
        }
      }
    };

    send();
  }, [isSend, isBlocked, fields, setIsSent, setIsBlocked, history]);

  return (
    <section className="login_container">
      <h2 className="text text_type_main-medium">Восстановление пароля</h2>
      <form onSubmit={handleOnSendData}>
        <div className="login_input_container">
          <Input
            type={isShowPassword ? "text" : "password"}
            placeholder={"Введите новый пароль"}
            onChange={handleOnChange}
            icon={isShowPassword ? "HideIcon" : "ShowIcon"}
            value={fields[nameFields.Password]}
            name={nameFields.Password}
            error={false}
            onIconClick={handleOnIconClick}
            errorText={"Ошибка"}
          />
        </div>
        <div className="login_input_container">
          <Input
            type={"text"}
            placeholder={"Введите код из письма"}
            onChange={handleOnChange}
            value={fields[nameFields.Code]}
            name={nameFields.Code}
            error={false}
            errorText={"Ошибка"}
          />
        </div>
        <button type="submit" style={{ display: "none" }}>
          Submit
        </button>
      </form>

      <div className="login_button_container">
        <Button type="primary" size="medium" onClick={handleOnSendData}>
          Сохранить
        </Button>
      </div>
      <p className="text text_type_main-default">
        <span>Вспомнили пароль?</span>
        <Link to={LOGIN_PATH}>Войти</Link>
      </p>
    </section>
  );
}
