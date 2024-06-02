import Button from "../../Button";
import EmptyDislike from "../../icons/EmptyDislike";
import EmptyLike from "../../icons/EmptyLike";

interface CommentBaseProps {
  nickname: string;
  createdAt: string;
  updatedAt: string;
  likes: number;
  dislikes: number;
  content: string;
}

export default function CommentBase({
  nickname,
  createdAt,
  updatedAt,
  likes,
  dislikes,
  content,
}: CommentBaseProps) {
  const isModified = createdAt !== updatedAt;

  return (
    <div>
      <div className="flex space-x-2 items-center">
        <span className="text-black text-[13px] font-bold">@{nickname}</span>
        <span className="text-[#9A9A9A] text-[12px]">
          {createdAt} {isModified && "(수정됨)"}
        </span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-[#575757] text-base mt-0.5 whitespace-pre">
          {content}
        </span>
        <Button isPrimary={false}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
            />
          </svg>
        </Button>
      </div>
      <div className="flex space-x-2 mt-1 items-center">
        <div className="flex text-sm items-center">
          <Button isPrimary={false}>
            <EmptyLike />
          </Button>
          <span className="text-[#9A9A9A]">{likes}</span>
        </div>
        <div className="flex text-sm items-center">
          <Button isPrimary={false}>
            <EmptyDislike />
          </Button>
          <span className="text-[#9A9A9A]">{dislikes}</span>
        </div>
        <Button isPrimary={false}>답글</Button>
      </div>
    </div>
  );
}
