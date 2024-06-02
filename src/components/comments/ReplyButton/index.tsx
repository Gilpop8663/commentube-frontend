import { ButtonHTMLAttributes } from "react";

interface ReplyButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  replyCount: number;
  isActive: boolean;
}

export default function ReplyButton({
  replyCount,
  isActive,
  ...rest
}: ReplyButtonProps) {
  return (
    <button
      className="hover:bg-[#def1ff] px-4 py-2 rounded-full flex space-x-1 text-sm justify-center items-center text-[#0093E5] active:bg-[#c7d8e5]"
      {...rest}
    >
      {isActive ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1}
          stroke="currentColor"
          className="size-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m4.5 15.75 7.5-7.5 7.5 7.5"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1}
          stroke="currentColor"
          className="size-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m19.5 8.25-7.5 7.5-7.5-7.5"
          />
        </svg>
      )}

      <span>답글 {replyCount}개</span>
    </button>
  );
}
