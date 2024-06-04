import BarThree from "../../../icons/BarThree";
import { cls } from "../../../../utils";
import Button from "../../../Button";
import usePopup from "../../../../hooks/useModal";

interface CommentSortingOptionProps {
  currentOption: "popular" | "newest";
}

export default function CommentSortingOption({
  currentOption,
}: CommentSortingOptionProps) {
  const { isOpen, togglePopup, popupRef } = usePopup<HTMLDivElement>();

  return (
    <div className="relative" ref={popupRef}>
      <Button isPrimary={false} rounded="sm" onClick={togglePopup}>
        <div className="flex space-x-1">
          <BarThree height={20} width={20} />
          <span className="text-sm">정렬 기준</span>
        </div>
      </Button>
      {isOpen && (
        <div className="absolute py-2 -bottom-24 flex flex-col border w-28 bg-white">
          <button
            className={cls(
              currentOption === "popular"
                ? "bg-[#cbcbcb] hover:bg-[#b7b7b7] active:bg-[#b7b7b7]"
                : "bg-white hover:bg-[#e5e5e5] active:bg-[#cecece] ",
              "flex w-full px-2 py-2 justify-center"
            )}
          >
            <span className="w-full text-sm">인기 댓글순</span>
          </button>
          <button
            className={cls(
              currentOption === "newest"
                ? "bg-[#cbcbcb] hover:bg-[#b7b7b7] active:bg-[#b7b7b7]"
                : "bg-white hover:bg-[#e5e5e5] active:bg-[#cecece]",
              "flex w-full px-2 py-2 justify-center"
            )}
          >
            <span className="w-full text-sm">최신순</span>
          </button>
        </div>
      )}
    </div>
  );
}
