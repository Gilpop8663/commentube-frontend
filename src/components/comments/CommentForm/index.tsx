import Button from "../../Button";
import Input from "../../Input";
import CommentInput from "../CommentInput";

interface CommentFormProps {
  commentType: "comment" | "reply";
}

export default function CommentForm({ commentType }: CommentFormProps) {
  return (
    <div>
      <CommentInput
        type="text"
        placeholder={
          commentType === "comment" ? "댓글 추가..." : "답글 추가..."
        }
      />
      <div className="flex justify-between mt-3">
        <div className="flex space-x-2">
          <Input placeholder="닉네임" type="text" />
          <Input placeholder="비밀번호" type="password" />
        </div>
        <div className="flex space-x-2">
          <Button isPrimary={false}>취소</Button>
          <Button isPrimary>댓글</Button>
        </div>
      </div>
    </div>
  );
}
