import React, { useState } from "react";
import { Link } from "react-router-dom";

import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./profile.module.css";

enum fieldsName {
  Name = "name",
  Login = "login",
  Password = "password",
}

export default function Profile() {
  const [focusedName, setFocusedName] = useState("");
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {};
  const handleOnFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocusedName(e.currentTarget.name);
  };
  const handleOnIconClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault();
    e.stopPropagation();

    console.log(e.currentTarget);
  };
  const handleOnBlur = () => {
    setFocusedName("");
  };
  const handleOnSendData = (e: React.SyntheticEvent<Element, Event>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <section className="login_container">
      <form onSubmit={handleOnSendData}>
        <div className="login_input_container">
          <Input
            type={"text"}
            placeholder={"Имя"}
            onChange={handleOnChange}
            icon={focusedName === fieldsName.Name ? "CloseIcon" : "EditIcon"}
            value={""}
            name={fieldsName.Name}
            error={false}
            onFocus={handleOnFocus}
            onBlur={handleOnBlur}
            //   ref={inputRef}
            onIconClick={handleOnIconClick}
            errorText={"Ошибка"}
            //   size={"small"}
          />
        </div>
        <div className="login_input_container">
          <Input
            type={"text"}
            placeholder={"Логин"}
            onChange={handleOnChange}
            icon={focusedName === fieldsName.Login ? "CloseIcon" : "EditIcon"}
            value={""}
            name={fieldsName.Login}
            error={false}
            onFocus={handleOnFocus}
            onBlur={handleOnBlur}
            //   ref={inputRef}
            onIconClick={handleOnIconClick}
            errorText={"Ошибка"}
            //   size={"small"}
          />
        </div>
        <div className="login_input_container">
          <Input
            type={"password"}
            placeholder={"Пароль"}
            onChange={handleOnChange}
            icon={
              focusedName === fieldsName.Password ? "CloseIcon" : "EditIcon"
            }
            value={""}
            name={fieldsName.Password}
            error={false}
            onFocus={handleOnFocus}
            onBlur={handleOnBlur}
            //   ref={inputRef}
            onIconClick={handleOnIconClick}
            errorText={"Ошибка"}
            //   size={"small"}
          />
        </div>
        <button type="submit" style={{ display: "none" }}>
          Submit
        </button>
      </form>
      <div className={`login_input_container ${styles.buttons_container}`}>
        <div>
          <Link to={"#"}>Отмена</Link>
        </div>
        <Button type="primary" size="medium" onClick={handleOnSendData}>
          Сохранить
        </Button>
      </div>
    </section>
  );
}
