import { Reply } from "../../../types/comment";
import CommentBase from "../CommentBase";

interface ReplyList {
  commentId: number;
  replies: Reply[];
}

export default function ReplyList({ commentId, replies }: ReplyList) {
  return (
    <div className="flex flex-col space-y-3">
      {replies.map((item) => (
        <CommentBase
          replyType="reply"
          key={item.id}
          {...item}
          commentId={commentId}
        />
      ))}
    </div>
  );
}
