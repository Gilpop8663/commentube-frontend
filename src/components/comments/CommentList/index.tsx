import { Comment } from "../../../types/comment";
import CommentItem from "./CommentItem";

interface CommentListProps {
  commentData: Comment[];
}

export default function CommentList({ commentData }: CommentListProps) {
  return (
    <div className="flex flex-col space-y-4">
      {commentData.map((item) => (
        <CommentItem key={item.id} {...item} />
      ))}
    </div>
  );
}
