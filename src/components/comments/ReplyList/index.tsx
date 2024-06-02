import { Reply } from "../../../types/comment";
import CommentBase from "../CommentBase";

interface ReplyList {
  replies: Reply[];
}

export default function ReplyList({ replies }: ReplyList) {
  return (
    <div className="flex flex-col space-y-3">
      {replies.map((item) => (
        <CommentBase key={item.id} {...item} />
      ))}
    </div>
  );
}
