import { ChangeEvent, useState } from "react";

export interface UseFormInputResult {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const useFormInput = (initialValue: string = "") => {
  const [value, setValue] = useState(initialValue);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const resetInputValue = () => {
    setValue("");
  };

  return { value, onChange, resetInputValue };
};
