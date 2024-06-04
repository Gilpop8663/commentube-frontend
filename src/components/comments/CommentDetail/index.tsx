import { UseCreateCommentResult } from "../../../hooks/mutation/useCreateComment";
import { Comment } from "../../../types/comment";
import CommentSortingOption from "../CommentBase/CommentSotingOption";
import CommentForm from "../CommentForm";
import CommentList from "../CommentList";

interface CommentDetailProps {
  commentData: Comment[];
  sortingOption: "popular" | "newest";
  createCommentProps: UseCreateCommentResult;
}

export default function CommentDetail({
  commentData,
  sortingOption,
  createCommentProps,
}: CommentDetailProps) {
  return (
    <div>
      <div className="flex items-center space-x-3">
        <span className="text-lg font-bold">댓글 {commentData.length}개</span>
        <CommentSortingOption currentOption={sortingOption} />
      </div>
      <div className="py-8">
        <CommentForm
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
