import { ButtonHTMLAttributes, PropsWithChildren } from "react";
import { cls } from "../../utils";

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    PropsWithChildren {
  isPrimary: boolean;
}

export default function Button({ isPrimary, children, ...rest }: ButtonProps) {
  return (
    <button
      className={cls(
        isPrimary
          ? "bg-[#0093E5] text-white disabled:bg-[#f2f2f2] active:bg-[#006198] rounded-sm"
          : "bg-none hover:bg-[#e5e5e5] active:bg-[#cecece] rounded-full",
        "p-2 text-sm font-medium"
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
