import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { getRegisterFetch, setError } from "../../../services/user-slice";
import { useDispatch, useSelector } from "react-redux";
import { useInitFields } from "../hooks/use-init-fields";
import { RootState } from "../../../services/store";
import { LOGIN_PATH } from "../../../routes/constants-path";

enum nameFields {
  Name = "name",
  Email = "email",
  Password = "password",
}

export default function Register() {
  const dispatch = useDispatch();
  const errorText = useSelector((state: RootState) => state.user.errorText);
  const { isBlocked, setIsBlocked, fields, errors, setErrors, handleOnChange } =
    useInitFields(nameFields);

  const handleOnSendData = async (e: React.SyntheticEvent<Element, Event>) => {
    e.preventDefault();
    e.stopPropagation();

    dispatch(setError(""));

    Object.keys(fields).forEach((name) => {
      if (!fields[name].length) {
        setErrors((state) => ({
          ...state,
          [name]: "Обязательно к заполнению",
        }));
        setIsBlocked(true);
      }
    });

    if (!isBlocked) {
      setIsBlocked(true);

      try {
        await dispatch(
          getRegisterFetch({
            email: fields[nameFields.Email],
            password: fields[nameFields.Password],
            name: fields[nameFields.Name],
          })
        );
        setIsBlocked(false);
      } catch (error) {
        console.log(error);
        alert((error as Error).message);
        setIsBlocked(false);
      }
    }
  };

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
      <form onSubmit={handleOnSendData}>
        <div className="login_input_container">
          <Input
            type={"text"}
            placeholder={"Имя"}
            onChange={handleOnChange}
            value={fields[nameFields.Name]}
            name={nameFields.Name}
            error={!!errors[nameFields.Name]}
            errorText={errors[nameFields.Name]}
          />
        </div>
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
