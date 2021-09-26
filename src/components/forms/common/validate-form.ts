import { reEmail } from "../../../common/constants";
import {
    getPhraseMustBeMoreThan,
    INVALID_FORMAT,
    REQUIRED_TO_FILL
} from "../../../common/phrases";
import { Validation } from "../../../models/forms";
import { nameFields } from "./names-forms";

export const requiredValidation = {
  required: {
    value: true,
    message: REQUIRED_TO_FILL,
  },
};

export const validations = {
  [nameFields.Email]: {
    requiredValidation,
    pattern: {
      value: reEmail,
      message: INVALID_FORMAT,
    },
  } as Validation,
  [nameFields.Password]: {
    requiredValidation,
    custom: {
      isValid: (value) => value.length > 5,
      message: getPhraseMustBeMoreThan("5-ти"),
    },
  } as Validation,
};
