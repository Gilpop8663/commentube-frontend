import React, { InputHTMLAttributes, forwardRef } from "react";

interface CommentInputProps extends InputHTMLAttributes<HTMLInputElement> {}

const CommentInput = forwardRef(
  (
    { ...rest }: CommentInputProps,
    ref: React.ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <input
        ref={ref}
        className="border-b w-full text-sm py-1 focus:outline-none focus:border-gray-900 bg-brand placeholder:text-[#575757]"
        {...rest}
      />
    );
  }
);

export default CommentInput;
