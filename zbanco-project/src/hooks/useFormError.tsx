import type { ParseKeys } from "i18next";
import { useState } from "react";
import type { FormState, FieldValues } from "react-hook-form";

type UseFormErrorReturn = {
  apiErrorMessage: ParseKeys | undefined;
  setApiErrorMessage: React.Dispatch<React.SetStateAction<ParseKeys | undefined>>;
};

const useFormError = <T extends FieldValues>(
  formState: FormState<T>,
): UseFormErrorReturn => {
  const [apiErrorMessage, setApiErrorMessage] = useState<ParseKeys | undefined>();

  const finalError = formState.isSubmitting
    ? undefined
    : apiErrorMessage;

  return {
    apiErrorMessage: finalError,
    setApiErrorMessage
  };
};

export default useFormError;