import React, { useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";

import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { getChangePassword } from "../../../api/agent";
import { reEmail } from "../../../common/constants";
import {
  LOGIN_PATH,
  RESET_PASSWORD_PATH,
} from "../../../routes/constants-path";

export default function ForgotPassword() {
  const history = useHistory();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isBlocked, setIsBlocked] = useState(false);
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    setEmail(e.target.value);
  };
  const handleOnClickRecover = async (
    e: React.SyntheticEvent<Element, Event>
  ) => {
    e.preventDefault();

    if (!isBlocked) {
      if (reEmail.test(email)) {
        setIsBlocked(true);

        try {
          const result = await getChangePassword(email);
          setIsBlocked(false);

          if (result.success) {
            history.push(RESET_PASSWORD_PATH, { prevPath: location.pathname });
          }
        } catch (error) {
          setIsBlocked(false);
          console.log(error);
        }
      } else {
        setError("E-mail не корректный");
      }
    }
  };

  return (
    <section className="login_container">
      <h2 className="text text_type_main-medium">Восстановление пароля</h2>
      <form onSubmit={handleOnClickRecover}>
        <div className="login_input_container">
          <Input
            type={"email"}
            placeholder={"Укажите e-mail"}
            onChange={handleOnChange}
            value={email}
            name={"email"}
            error={!!error}
            errorText={error}
          />
        </div>
        <button type="submit" style={{ display: "none" }}>
          Submit
        </button>
      </form>
      <div className="login_button_container">
        <Button type="primary" size="medium" onClick={handleOnClickRecover}>
          Восстановить
        </Button>
      </div>
      <p className="text text_type_main-default">
        <span>Вспомнили пароль?</span>
        <Link to={LOGIN_PATH}>Войти</Link>
      </p>
    </section>
  );
}
