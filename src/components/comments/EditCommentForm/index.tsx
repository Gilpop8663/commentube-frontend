import { UseCreateReplyResult } from "../../../hooks/mutation/useCreateReply";
import { UseEditCommentResult } from "../../../hooks/mutation/useEditComment";
import Button from "../../Button";
import CommentInput from "../CommentInput";

interface EditCommentFormProps {
  commentType: "comment" | "reply";
  editCommentProps?: UseEditCommentResult;
  editReplyProps?: UseCreateReplyResult;
  password: string;
}

export default function EditCommentForm({
  commentType,
  editCommentProps,
  editReplyProps,
  password,
}: EditCommentFormProps) {
  const isComment = commentType === "comment";
  const primaryWord = isComment ? "댓글" : "답글";

  const content = isComment
    ? editCommentProps?.content
    : editReplyProps?.content;

  const handleSubmit = isComment
    ? editCommentProps?.handleEditComment
    : editReplyProps?.handleCreateReply;

  const handleClose = isComment
    ? editCommentProps?.close
    : editReplyProps?.handleCloseClick;

  if (!handleSubmit) return;

  return (
    <form onSubmit={(event) => handleSubmit(event, password)}>
      <CommentInput
        type="text"
        placeholder={`${primaryWord} 추가...`}
        {...content}
        autoFocus
      />
      <div className="flex justify-between mt-3">
        <div className="flex space-x-2">
          <Button onClick={handleClose} isPrimary={false} type="reset">
            취소
          </Button>
          <Button isPrimary type="submit">
            {primaryWord}
          </Button>
        </div>
      </div>
    </form>
  );
}
