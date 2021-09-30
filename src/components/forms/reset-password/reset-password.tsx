import {
  Input
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { getResetPassword } from "../../../api/agent";
import { LOGIN_PATH } from "../../../routes/constants-path";
import { nameFields } from "../common/names-forms";
import { requiredValidation, validations } from "../common/validate-form";
import FormWrapper from "../form-wrapper/form-wrapper";
import { useForm } from "../hooks/use-form";

interface IResetPasswordForm {
  [nameFields.Code]: string;
  [nameFields.Password]: string;
}

export default function ResetPassword() {
  const history = useHistory();
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { handleSubmit, handleChange, data, errors } =
    useForm<IResetPasswordForm>({
      initialValues: {
        [nameFields.Code]: "",
        [nameFields.Password]: "",
      },
      validations: {
        [nameFields.Code]: requiredValidation,
        [nameFields.Password]: validations[nameFields.Password],
      },
      onSubmit: async () => {
        if (!isLoading) {
          setIsLoading(true);
          try {
            const result = await getResetPassword(
              data[nameFields.Password],
              data[nameFields.Code]
            );

            setIsLoading(false);

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
            setIsLoading(false);
          }
        }
      },
    });

  const handleOnIconClick = () => {
    setIsShowPassword(!isShowPassword);
  };

  return (
    <section className="login_container">
      <FormWrapper
        onSubmit={handleSubmit}
        title="Восстановление пароля"
        buttonName="Сохранить"
      >
        <div className="login_input_container">
          <Input
            type={isShowPassword ? "text" : "password"}
            placeholder={"Введите новый пароль"}
            onChange={handleChange(nameFields.Password)}
            icon={isShowPassword ? "HideIcon" : "ShowIcon"}
            value={data[nameFields.Password]}
            name={nameFields.Password}
            onIconClick={handleOnIconClick}
            error={!!errors[nameFields.Password]}
            errorText={errors[nameFields.Password]}
          />
        </div>
        <div className="login_input_container">
          <Input
            type={"text"}
            placeholder={"Введите код из письма"}
            onChange={handleChange(nameFields.Code)}
            value={data[nameFields.Code]}
            name={nameFields.Code}
            error={!!errors[nameFields.Code]}
            errorText={errors[nameFields.Code]}
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
