import { Reply } from "../../../../types/comment";
import CommentBase from "../../CommentBase";
import ReplyButton from "../../ReplyButton";
import ReplyList from "../../ReplyList";
import { useDeleteComment } from "../../../../hooks/mutation/useDeleteComment";
import useOpen from "../../../../hooks/useOpen";

interface CommentItemProps {
  id: number;
  nickname: string;
  createdAt: string;
  updatedAt: string;
  likes: number;
  dislikes: number;
  content: string;
  replies: Reply[];
}

export default function CommentItem(commentData: CommentItemProps) {
  const { handleDeleteComment } = useDeleteComment(commentData.id);

  const { isOpen, toggleOpen } = useOpen();

  return (
    <div>
      <CommentBase
        commentId={commentData.id}
        replyType="comment"
        {...commentData}
        handleDeleteComment={handleDeleteComment}
      />
      {commentData.replies.length > 0 && (
        <ReplyButton
          isActive={isOpen}
          replyCount={commentData.replies.length}
          onClick={toggleOpen}
        />
      )}
      <div className="relative pl-12 mt-2">
        {isOpen && (
          <ReplyList replies={commentData.replies} commentId={commentData.id} />
        )}
      </div>
    </div>
  );
}
