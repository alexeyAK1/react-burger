import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";

import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./profile.module.css";
import { RootState } from "../../../services/store";
import Loader from "../../ui/loader/loader";
import { useInitFields } from "../hooks/use-init-fields";
import { getUserFetch, updateUserFetch } from "../../../services/user-slice";
import { variantsNextRouter } from "../common/constants";

enum nameFields {
  Name = "name",
  Login = "login",
  Password = "password",
}

export default function Profile() {
  const dispatch = useDispatch();
  const [focusedName, setFocusedName] = useState("");
  const {
    isBlocked,
    setIsBlocked,
    fields,
    setFields,
    errors,
    setErrors,
    isSend,
    setIsSent,
    handleOnChange,
  } = useInitFields(nameFields);
  const isLoading = useSelector((state: RootState) => state.user.isLoading);
  const user = useSelector((state: RootState) => state.user.user);

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
  const handleOnSendData = async (e: React.SyntheticEvent<Element, Event>) => {
    e.preventDefault();
    e.stopPropagation();

    await Object.keys(fields).forEach(async (name) => {
      if (!fields[name].length) {
        setErrors((state) => ({
          ...state,
          [name]: "Обязательно к заполнению",
        }));
        await setIsBlocked(true);
      }
    });

    setIsSent(true);
  };

  useEffect(() => {
    const send = async () => {
      if (!isBlocked && isSend) {
        setIsSent(false);
        await dispatch(
          updateUserFetch({
            name: fields[nameFields.Name],
            email: fields[nameFields.Login],
            password: fields[nameFields.Password],
          })
        );
      }
    };

    send();
  }, [isSend, isBlocked, dispatch, fields, setIsSent]);

  const handleOnCancellation = () => {
    setFields((state) => ({
      ...state,
      [nameFields.Name]: user.name,
      [nameFields.Login]: user.email,
    }));
  };

  useEffect(() => {
    dispatch(getUserFetch());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (user.name) {
      setFields((state) => ({
        ...state,
        [nameFields.Name]: user.name,
        [nameFields.Login]: user.email,
      }));
    }
  }, [setFields, user]);

  return (
    <motion.section
      className="login_container"
      variants={variantsNextRouter}
      initial="hidden"
      exit="exit"
      animate="visible"
    >
      <AnimatePresence exitBeforeEnter>
        {isLoading ? (
          <Loader />
        ) : (
          <motion.div
            className="login_container"
            variants={variantsNextRouter}
            initial="hidden"
            exit="exit"
            animate="visible"
          >
            <form onSubmit={handleOnSendData}>
              <div className="login_input_container">
                <Input
                  type={"text"}
                  placeholder={"Имя"}
                  onChange={handleOnChange}
                  icon={
                    focusedName === nameFields.Name ? "CloseIcon" : "EditIcon"
                  }
                  value={fields[nameFields.Name]}
                  name={nameFields.Name}
                  error={!!errors[nameFields.Name]}
                  errorText={errors[nameFields.Name]}
                  onFocus={handleOnFocus}
                  onBlur={handleOnBlur}
                  onIconClick={handleOnIconClick}
                />
              </div>
              <div className="login_input_container">
                <Input
                  type={"text"}
                  placeholder={"Логин"}
                  onChange={handleOnChange}
                  icon={
                    focusedName === nameFields.Login ? "CloseIcon" : "EditIcon"
                  }
                  value={fields[nameFields.Login]}
                  name={nameFields.Login}
                  error={!!errors[nameFields.Login]}
                  errorText={errors[nameFields.Login]}
                  onFocus={handleOnFocus}
                  onBlur={handleOnBlur}
                  onIconClick={handleOnIconClick}
                />
              </div>
              <div className="login_input_container">
                <Input
                  type={"password"}
                  placeholder={"Пароль"}
                  onChange={handleOnChange}
                  icon={
                    focusedName === nameFields.Password
                      ? "CloseIcon"
                      : "EditIcon"
                  }
                  value={fields[nameFields.Password]}
                  name={nameFields.Password}
                  error={!!errors[nameFields.Password]}
                  errorText={errors[nameFields.Password]}
                  onFocus={handleOnFocus}
                  onBlur={handleOnBlur}
                  onIconClick={handleOnIconClick}
                />
              </div>
              <button type="submit" style={{ display: "none" }}>
                Submit
              </button>
            </form>
            <div
              className={`login_input_container ${styles.buttons_container}`}
            >
              <div>
                <Link to={"#"} onClick={handleOnCancellation}>
                  Отмена
                </Link>
              </div>
              <Button type="primary" size="medium" onClick={handleOnSendData}>
                Сохранить
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
