import { ButtonHTMLAttributes, PropsWithChildren } from "react";
import { cls } from "../../utils";

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    PropsWithChildren {
  isPrimary: boolean;
  rounded?: "sm" | "md" | "lg" | "xl" | "full";
}

export default function Button({
  isPrimary,
  rounded = "full",
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={cls(
        isPrimary
          ? "bg-[#0093E5] text-white disabled:bg-[#f2f2f2] active:bg-[#006198] rounded-sm"
          : `bg-none hover:bg-[#e5e5e5] active:bg-[#cecece] rounded-${rounded}`,
        "p-2 text-sm font-medium"
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
