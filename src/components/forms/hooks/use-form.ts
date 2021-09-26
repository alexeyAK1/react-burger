import { ChangeEvent, FormEvent, useState } from "react";
import { ErrorRecord, IUseForm } from "../../../models/forms";

export const useForm = <T extends Record<keyof T, any> = {}>(
  options: IUseForm<T>
) => {
  const [data, setData] = useState<T>((options?.initialValues || {}) as T);
  const [errors, setErrors] = useState<ErrorRecord<T>>({});

  const handleChange =
    <S extends unknown>(key: keyof T, sanitizeFn?: (value: string) => S) =>
    (e: ChangeEvent<HTMLInputElement & HTMLSelectElement>) => {
      const value = sanitizeFn ? sanitizeFn(e.target.value) : e.target.value;
      setErrors({ ...errors, [key]: "" });
      setData({
        ...data,
        [key]: value,
      });
    };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const valid = isValidForm();

    if (!valid) {
      return;
    }

    setErrors({});

    if (options?.onSubmit) {
      options.onSubmit();
    }
  };

  const isValidForm = () => {
    let valid = true;

    const validations = options?.validations;

    if (validations) {
      const newErrors = {} as ErrorRecord<T>;
      for (const key in validations) {
        const value = data[key];
        const validation = validations[key];

        const pattern = validation?.pattern;
        if (pattern?.value && !pattern.value.test(value)) {
          valid = false;
          newErrors[key] = pattern.message;
        }

        const custom = validation?.custom;
        if (custom?.isValid && !custom.isValid(value)) {
          valid = false;
          newErrors[key] = custom.message;
        }

        if (validation?.required?.value && !value) {
          valid = false;
          newErrors[key] = validation?.required?.message;
        }
      }

      if (!valid) {
        setErrors(newErrors);
      }
    }

    return valid;
  };

  return {
    data,
    setData,
    handleChange,
    handleSubmit,
    setErrors,
    errors,
  };
};
