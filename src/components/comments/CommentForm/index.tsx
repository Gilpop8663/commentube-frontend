import { UseCreateCommentResult } from "../../../hooks/mutation/useCreateComment";
import Button from "../../Button";
import Input from "../../Input";
import CommentInput from "../CommentInput";

interface CommentFormProps {
  commentType: "comment" | "reply";
  createCommentProps: UseCreateCommentResult;
}

export default function CommentForm({
  commentType,
  createCommentProps,
}: CommentFormProps) {
  const primaryWord = commentType === "comment" ? "댓글" : "답글";

  const { content, handleCreateComment, nickname, password } =
    createCommentProps;

  return (
    <form onSubmit={handleCreateComment}>
      <CommentInput
        type="text"
        placeholder={`${primaryWord} 추가...`}
        {...content}
      />
      <div className="flex justify-between mt-3">
        <div className="flex space-x-2">
          <Input placeholder="닉네임" type="text" {...nickname} />
          <Input
            placeholder="비밀번호"
            type="password"
            autoComplete="cc-csc"
            {...password}
          />
        </div>
        <div className="flex space-x-2">
          <Button isPrimary={false} type="reset">
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
