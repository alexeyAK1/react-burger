import { useState } from "react";

export const useInitFields = (nameFields: { [key: string]: string }) => {
  const initialFields: { [key: string]: string } = {};
  const [isBlocked, setIsBlocked] = useState(false);

  Object.keys(nameFields).forEach((name) => {
    initialFields[nameFields[name]] = "";
  });

  const [fields, setFields] = useState({ ...initialFields });
  const [errors, setErrors] = useState({ ...initialFields });

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;

    setIsBlocked(false);
    setFields((state) => ({ ...state, [name]: value }));
    setErrors((state) => ({ ...state, [name]: "" }));
  };

  return {
    isBlocked,
    setIsBlocked,
    fields,
    setFields,
    errors,
    setErrors,
    handleOnChange,
  };
};
