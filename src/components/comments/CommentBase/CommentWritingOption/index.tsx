import usePopup from "../../../../hooks/useModal";
import Button from "../../../Button";
import DeleteTrash from "../../../icons/DeleteTrash";
import EditPencil from "../../../icons/EditPencil";
import EllipsisVertical from "../../../icons/EllipsisVertical";

interface CommentWritingOptionProps {
  handleDeleteComment: (isIncrement: boolean) => void;
}

export default function CommentWritingOption({
  handleDeleteComment,
}: CommentWritingOptionProps) {
  const { togglePopup, isOpen, popupRef } = usePopup<HTMLDivElement>();

  return (
    <div className="relative w-fit" ref={popupRef}>
      <Button isPrimary={false} onClick={togglePopup}>
        <EllipsisVertical />
      </Button>
      {isOpen && (
        <div className="absolute py-2 -bottom-[100px] flex flex-col border w-36 bg-white z-10">
          <button className="flex w-full px-4 py-2 bg-none hover:bg-[#e5e5e5] active:bg-[#cecece]">
            <EditPencil />
            <span className="ml-4">수정하기</span>
          </button>
          <button
            onClick={() => handleDeleteComment(true)}
            className="flex w-full px-4 py-2 bg-none hover:bg-[#e5e5e5] active:bg-[#cecece]"
          >
            <DeleteTrash />
            <span className="ml-4">삭제하기</span>
          </button>
        </div>
      )}
    </div>
  );
}
