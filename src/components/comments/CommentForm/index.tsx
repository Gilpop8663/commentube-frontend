import { UseCreateCommentResult } from "../../../hooks/mutation/useCreateComment";
import { UseCreateReplyResult } from "../../../hooks/mutation/useCreateReply";
import Button from "../../Button";
import Input from "../../Input";
import CommentInput from "../CommentInput";

interface CommentFormProps {
  commentType: "comment" | "reply";
  createCommentProps?: UseCreateCommentResult;
  createReplyProps?: UseCreateReplyResult;
}

export default function CommentForm({
  commentType,
  createCommentProps,
  createReplyProps,
}: CommentFormProps) {
  const isComment = commentType === "comment";
  const primaryWord = isComment ? "댓글" : "답글";

  const content = isComment
    ? createCommentProps?.content
    : createReplyProps?.content;

  const handleSubmit = isComment
    ? createCommentProps?.handleCreateComment
    : createReplyProps?.handleCreateReply;

  const nickname = isComment
    ? createCommentProps?.nickname
    : createReplyProps?.nickname;

  const password = isComment
    ? createCommentProps?.password
    : createReplyProps?.password;

  return (
    <form onSubmit={handleSubmit}>
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
