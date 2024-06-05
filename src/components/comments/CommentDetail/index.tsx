import { useCreateComment } from "../../../hooks/mutation/useCreateComment";
import { Comment } from "../../../types/comment";
import CommentSortingOption from "../CommentBase/CommentSotingOption";
import CommentList from "../CommentList";
import CreateCommentForm from "../CreateCommentForm";

interface CommentDetailProps {
  commentData: Comment[];
}

export default function CommentDetail({ commentData }: CommentDetailProps) {
  const createCommentProps = useCreateComment();

  return (
    <div>
      <div className="flex items-center space-x-3">
        <span className="text-lg font-bold">댓글 {commentData.length}개</span>
        <CommentSortingOption />
      </div>
      <div className="py-8">
        <CreateCommentForm
          commentType="comment"
          createCommentProps={createCommentProps}
        />
      </div>
      <div>
        <CommentList commentData={commentData} />
      </div>
    </div>
  );
}
