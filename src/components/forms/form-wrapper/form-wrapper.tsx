import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { FC, FormEvent } from "react";

interface IProps {
  title?: string;
  onSubmit: (e: FormEvent<Element>) => Promise<void>;
  buttonName?: string;
}

const FormWrapper: FC<IProps> = ({ onSubmit, title, buttonName, children }) => {
  return (
    <>
      {title ? <h2 className="text text_type_main-medium">{title}</h2> : null}
      <form onSubmit={onSubmit}>
        {children}
        {buttonName ? (
          <div className="login_button_container">
            <Button type="primary" size="medium">
              Войти
            </Button>
          </div>
        ) : null}
      </form>
    </>
  );
};

export default FormWrapper;
