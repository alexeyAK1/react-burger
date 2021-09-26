export interface Validation {
  required?: {
    value: boolean;
    message: string;
  };
  pattern?: {
    value: RegExp;
    message: string;
  };
  custom?: {
    isValid: (value: string) => boolean;
    message: string;
  };
}

export type Validations<T extends {}> = Partial<Record<keyof T, Validation>>;

export interface IUseForm<T> {
  validations?: Validations<T>;
  initialValues?: Partial<T>;
  onSubmit?: () => void;
}

export type ErrorRecord<T> = Partial<Record<keyof T, string>>;
