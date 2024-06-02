import React from "react";
import BarThree from "../../../icons/BarThree";
import { cls } from "../../../../utils";

interface CommentSortingOptionProps {
  currentOption: "popular" | "newest";
}

export default function CommentSortingOption({
  currentOption,
}: CommentSortingOptionProps) {
  return (
    <div className="relative">
      <div className="flex">
        <BarThree />
        <span>정렬 기준</span>
      </div>
      <div className="absolute py-2 -bottom-28 flex flex-col border ">
        <button
          className={cls(
            currentOption === "popular"
              ? "bg-[#cbcbcb] hover:bg-[#b7b7b7] active:bg-[#b7b7b7]"
              : "bg-none hover:bg-[#e5e5e5] active:bg-[#cecece]",
            "flex w-full px-2 py-2 justify-center"
          )}
        >
          <span className="">인기 댓글순</span>
        </button>
        <button
          className={cls(
            currentOption === "newest"
              ? "bg-[#cbcbcb] hover:bg-[#b7b7b7] active:bg-[#b7b7b7]"
              : "bg-none hover:bg-[#e5e5e5] active:bg-[#cecece]",
            "flex w-full px-2 py-2 justify-center"
          )}
        >
          <span className="">최신순</span>
        </button>
      </div>
    </div>
  );
}
