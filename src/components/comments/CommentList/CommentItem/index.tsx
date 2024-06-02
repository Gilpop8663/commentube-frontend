import { Reply } from "../../../../types/comment";
import CommentBase from "../../CommentBase";
import ReplyButton from "../../ReplyButton";

interface CommentItemProps {
  nickname: string;
  createdAt: string;
  updatedAt: string;
  likes: number;
  dislikes: number;
  content: string;
  replies: Reply[];
}

export default function CommentItem(commentData: CommentItemProps) {
  return (
    <div>
      <CommentBase {...commentData} />
      {commentData.replies.length > 0 && (
        <ReplyButton isActive={false} replyCount={commentData.replies.length} />
      )}
    </div>
  );
}
