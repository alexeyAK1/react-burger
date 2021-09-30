import {
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
import FormWrapper from "../form-wrapper/form-wrapper";
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
      <FormWrapper
        onSubmit={handleSubmit}
        title="Восстановление пароля"
        buttonName="Восстановить"
      >
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
      </FormWrapper>
      <p className="text text_type_main-default">
        <span>Вспомнили пароль?</span>
        <Link to={LOGIN_PATH}>Войти</Link>
      </p>
    </section>
  );
}
