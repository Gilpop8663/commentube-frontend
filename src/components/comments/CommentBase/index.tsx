import { useCreateReply } from "../../../hooks/mutation/useCreateReply";
import Button from "../../Button";
import EmptyDislike from "../../icons/EmptyDislike";
import EmptyLike from "../../icons/EmptyLike";
import CommentForm from "../CommentForm";
import CommentWritingOption from "./CommentWritingOption";

interface CommentBaseProps {
  commentId: number;
  nickname: string;
  createdAt: string;
  updatedAt: string;
  likes: number;
  dislikes: number;
  content: string;
  handleDeleteComment?: (isIncrement: boolean) => void;
  replyType: "comment" | "reply";
}

export default function CommentBase({
  commentId,
  nickname,
  createdAt,
  updatedAt,
  likes,
  dislikes,
  content,
  handleDeleteComment,
  replyType,
}: CommentBaseProps) {
  const isModified = createdAt !== updatedAt;
  const createReplyProps = useCreateReply(commentId);

  const { isOpen, toggleOpen } = createReplyProps;

  const isReply = replyType === "reply";

  const toggleReplyOpen = () => {
    if (isReply) {
      createReplyProps.content.setValue(`@${nickname} `);
    }

    toggleOpen();
  };

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
        <CommentWritingOption handleDeleteComment={handleDeleteComment} />
      </div>
      <div className="flex space-x-2 mt-1 items-center">
        <div className="flex text-sm items-center">
          <Button isPrimary={false}>
            <EmptyLike width={16} height={16} />
          </Button>
          <span className="text-[#9A9A9A]">{likes}</span>
        </div>
        <div className="flex text-sm items-center">
          <Button isPrimary={false}>
            <EmptyDislike width={16} height={16} />
          </Button>
          <span className="text-[#9A9A9A]">{dislikes}</span>
        </div>
        <Button isPrimary={false} onClick={toggleReplyOpen}>
          답글
        </Button>
      </div>
      {isOpen && (
        <div className="pl-4 pr-8">
          <CommentForm
            commentType="reply"
            createReplyProps={createReplyProps}
          />
        </div>
      )}
    </div>
  );
}
