import { ForwardedRef, InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef(
  ({ ...rest }: InputProps, ref: ForwardedRef<HTMLInputElement>) => {
    return (
      <input
        ref={ref}
        className="border border-gray-300 border-1 text-center py-1 rounded-sm text-sm bg-[#F8F8F8]"
        {...rest}
      />
    );
  }
);

export default Input;
