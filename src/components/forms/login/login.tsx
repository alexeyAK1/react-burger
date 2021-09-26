import {
  Button,
  Input,
  PasswordInput
} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  FORGOT_PASSWORD_PATH,
  REGISTER_PATH
} from "../../../routes/constants-path";
import { RootState } from "../../../services/store";
import { getLoginFetch } from "../../../services/user-slice";
import { nameFields } from "../common/names-forms";
import { validations } from "../common/validate-form";
import { useForm } from "../hooks/use-form";

interface ILoginForm {
  [nameFields.Email]: string;
  [nameFields.Password]: string;
}

export default function Login() {
  const dispatch = useDispatch();
  const isLoading = useSelector((state: RootState) => state.user.isLoading);
  const { handleSubmit, handleChange, data, errors } = useForm<ILoginForm>({
    initialValues: {
      [nameFields.Email]: "",
      [nameFields.Password]: "",
    },
    validations: {
      [nameFields.Email]: validations[nameFields.Email],
      [nameFields.Password]: validations[nameFields.Password],
    },
    onSubmit: async () => {
      if (!isLoading) {
        await dispatch(
          getLoginFetch({
            email: data[nameFields.Email],
            password: data[nameFields.Password],
          })
        );
      }
    },
  });

  return (
    <section className="login_container">
      <h2 className="text text_type_main-medium">Вход</h2>
      <form onSubmit={handleSubmit}>
        <div className="login_input_container">
          <Input
            type={"email"}
            placeholder={"E-mail"}
            onChange={handleChange(nameFields.Email)}
            value={data[nameFields.Email] || ""}
            name={nameFields.Email}
            error={!!errors[nameFields.Email]}
            errorText={errors[nameFields.Email]}
          />
        </div>
        <div className="login_input_container">
          <PasswordInput
            onChange={handleChange(nameFields.Password)}
            value={data[nameFields.Password] || ""}
            name={nameFields.Password}
          />
        </div>
        <button type="submit" style={{ display: "none" }}>
          Submit
        </button>
      </form>

      <div className="login_button_container">
        <Button type="primary" size="medium" onClick={handleSubmit}>
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
