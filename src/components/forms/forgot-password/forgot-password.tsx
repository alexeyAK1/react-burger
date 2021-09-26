import {
  Button,
  Input
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { getChangePassword } from "../../../api/agent";
import {
  LOGIN_PATH,
  RESET_PASSWORD_PATH
} from "../../../routes/constants-path";
import { nameFields } from "../common/names-forms";
import { validations } from "../common/validate-form";
import { useForm } from "../hooks/use-form";


interface IForgotPasswordForm {
  [nameFields.Email]: string;
}

export default function ForgotPassword() {
  const history = useHistory();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const { handleSubmit, handleChange, data, errors } =
    useForm<IForgotPasswordForm>({
      initialValues: {
        [nameFields.Email]: "",
      },
      validations: {
        [nameFields.Email]: validations[nameFields.Email],
      },
      onSubmit: async () => {
        if (!isLoading) {
          setIsLoading(true);

          try {
            const result = await getChangePassword(data[nameFields.Email]);
            setIsLoading(false);

            if (result.success) {
              history.push(RESET_PASSWORD_PATH, {
                prevPath: location.pathname,
              });
            }
          } catch (error) {
            setIsLoading(false);
            console.log(error);
          }
        }
      },
    });

  return (
    <section className="login_container">
      <h2 className="text text_type_main-medium">Восстановление пароля</h2>
      <form onSubmit={handleSubmit}>
        <div className="login_input_container">
          <Input
            type={"email"}
            placeholder={"Укажите e-mail"}
            onChange={handleChange(nameFields.Email)}
            value={data[nameFields.Email] || ""}
            name={nameFields.Email}
            error={!!errors[nameFields.Email]}
            errorText={errors[nameFields.Email]}
          />
        </div>
        <button type="submit" style={{ display: "none" }}>
          Submit
        </button>
      </form>
      <div className="login_button_container">
        <Button type="primary" size="medium" onClick={handleSubmit}>
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
