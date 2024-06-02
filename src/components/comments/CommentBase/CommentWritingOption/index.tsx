import Button from "../../../Button";
import DeleteTrash from "../../../icons/DeleteTrash";
import EditPencil from "../../../icons/EditPencil";
import EllipsisVertical from "../../../icons/EllipsisVertical";

export default function CommentWritingOption() {
  return (
    <div className="relative w-96">
      <Button isPrimary={false}>
        <EllipsisVertical />
      </Button>
      <div className="absolute py-2 bottom-0 flex flex-col border">
        <button className="flex w-full px-4 py-2 bg-none hover:bg-[#e5e5e5] active:bg-[#cecece]">
          <EditPencil />
          <span className="ml-4">수정하기</span>
        </button>
        <button className="flex w-full px-4 py-2 bg-none hover:bg-[#e5e5e5] active:bg-[#cecece]">
          <DeleteTrash />
          <span className="ml-4">삭제하기</span>
        </button>
      </div>
    </div>
  );
}
