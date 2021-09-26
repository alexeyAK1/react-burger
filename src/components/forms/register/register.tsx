import {
  Button,
  Input,
  PasswordInput
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { LOGIN_PATH } from "../../../routes/constants-path";
import { RootState } from "../../../services/store";
import { getRegisterFetch, setError } from "../../../services/user-slice";
import { requiredValidation, validations } from "../common/validate-form";
import { useForm } from "../hooks/use-form";


enum nameFields {
  Name = "name",
  Email = "email",
  Password = "password",
}

interface IRegisterForm {
  [nameFields.Name]: string;
  [nameFields.Email]: string;
  [nameFields.Password]: string;
}

export default function Register() {
  const dispatch = useDispatch();
  const errorText = useSelector((state: RootState) => state.user.errorText);
  const isLoading = useSelector((state: RootState) => state.user.isLoading);
  const { handleSubmit, handleChange, data, errors } = useForm<IRegisterForm>({
    initialValues: {
      [nameFields.Name]: "",
      [nameFields.Email]: "",
      [nameFields.Password]: "",
    },
    validations: {
      [nameFields.Name]: requiredValidation,
      [nameFields.Email]: validations[nameFields.Email],
      [nameFields.Password]: validations[nameFields.Password],
    },
    onSubmit: async () => {
      if (!isLoading) {
        dispatch(setError(""));
        await dispatch(
          getRegisterFetch({
            email: data[nameFields.Email],
            password: data[nameFields.Password],
            name: data[nameFields.Name],
          })
        );
      }
    },
  });

  useEffect(() => {
    if (errorText) {
      alert(errorText);
    }

    return () => {
      dispatch(setError(""));
    };
  }, [dispatch, errorText]);

  return (
    <section className="login_container">
      <h2 className="text text_type_main-medium">Регистрация</h2>
      <form onSubmit={handleSubmit}>
        <div className="login_input_container">
          <Input
            type={"text"}
            placeholder={"Имя"}
            onChange={handleChange(nameFields.Name)}
            value={data[nameFields.Name]}
            name={nameFields.Name}
            error={!!errors[nameFields.Name]}
            errorText={errors[nameFields.Name]}
          />
        </div>
        <div className="login_input_container">
          <Input
            type={"email"}
            placeholder={"E-mail"}
            onChange={handleChange(nameFields.Email)}
            value={data[nameFields.Email]}
            name={nameFields.Email}
            error={!!errors[nameFields.Email]}
            errorText={errors[nameFields.Email]}
          />
        </div>
        <div className="login_input_container">
          <PasswordInput
            onChange={handleChange(nameFields.Password)}
            value={data[nameFields.Password]}
            name={nameFields.Password}
          />
        </div>
        <button type="submit" style={{ display: "none" }}>
          Submit
        </button>
      </form>
      <div className="login_button_container">
        <Button type="primary" size="medium" onClick={handleSubmit}>
          Зарегистрироваться
        </Button>
      </div>
      <p className="text text_type_main-default">
        <span>Уже зарегистрированы?</span>
        <Link to={LOGIN_PATH}>Войти</Link>
      </p>
    </section>
  );
}
