import { InputHTMLAttributes } from "react";

interface CommentInputProps extends InputHTMLAttributes<HTMLInputElement> {}

export default function CommentInput({ ...rest }: CommentInputProps) {
  return (
    <input
      className="border-b w-full text-sm py-1 focus:outline-none focus:border-gray-900 bg-brand placeholder:text-[#575757]"
      {...rest}
    />
  );
}
