import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export default function Input({ ...rest }: InputProps) {
  return (
    <input
      className="border border-gray-300 border-1 text-center py-1 rounded-sm text-sm bg-[#F8F8F8]"
      {...rest}
    />
  );
}
