import {
  Button,
  Input
} from "@ya.praktikum/react-developer-burger-ui-components";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../../services/store";
import { getUserFetch, updateUserFetch } from "../../../services/user-slice";
import Loader from "../../ui/loader/loader";
import { variantsNextRouter } from "../common/animations-form";
import { nameFields } from "../common/names-forms";
import { requiredValidation, validations } from "../common/validate-form";
import FormWrapper from "../form-wrapper/form-wrapper";
import { useForm } from "../hooks/use-form";
import styles from "./profile.module.css";

interface IProfileForm {
  [nameFields.Name]: string;
  [nameFields.Login]: string;
  [nameFields.Password]: string;
}

export default function Profile() {
  const dispatch = useDispatch();
  const [focusedName, setFocusedName] = useState("");
  const isLoading = useSelector((state: RootState) => state.user.isLoading);
  const user = useSelector((state: RootState) => state.user.user);
  const { handleSubmit, handleChange, setData, data, errors } =
    useForm<IProfileForm>({
      initialValues: {
        [nameFields.Name]: "",
        [nameFields.Password]: "",
        [nameFields.Login]: "",
      },
      validations: {
        [nameFields.Name]: requiredValidation,
        [nameFields.Password]: validations[nameFields.Password],
        [nameFields.Login]: requiredValidation,
      },
      onSubmit: async () => {
        if (!isLoading) {
          await dispatch(
            updateUserFetch({
              name: data[nameFields.Name],
              email: data[nameFields.Login],
              password: data[nameFields.Password],
            })
          );
        }
      },
    });

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

  const handleOnCancellation = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    setData((state) => ({
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
      setData((state) => ({
        ...state,
        [nameFields.Name]: user.name,
        [nameFields.Login]: user.email,
      }));
    }
  }, [setData, user]);

  return (
    <motion.section
      className={`login_container ${styles.motion_container}`}
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
            <FormWrapper onSubmit={handleSubmit}>
              <div className="login_input_container">
                <Input
                  type={"text"}
                  placeholder={"Имя"}
                  onChange={handleChange(nameFields.Name)}
                  icon={
                    focusedName === nameFields.Name ? "CloseIcon" : "EditIcon"
                  }
                  value={data[nameFields.Name]}
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
                  onChange={handleChange(nameFields.Login)}
                  icon={
                    focusedName === nameFields.Login ? "CloseIcon" : "EditIcon"
                  }
                  value={data[nameFields.Login]}
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
                  onChange={handleChange(nameFields.Password)}
                  icon={
                    focusedName === nameFields.Password
                      ? "CloseIcon"
                      : "EditIcon"
                  }
                  value={data[nameFields.Password]}
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
              <div
                className={`login_input_container ${styles.buttons_container}`}
              >
                <div>
                  <Link to={"#"} onClick={handleOnCancellation}>
                    Отмена
                  </Link>
                </div>
                <Button type="primary" size="medium">
                  Сохранить
                </Button>
              </div>
            </FormWrapper>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
