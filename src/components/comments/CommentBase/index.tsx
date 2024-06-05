import { useState } from "react";
import { useCreateReply } from "../../../hooks/mutation/useCreateReply";
import { useFormInput } from "../../../hooks/useInput";
import useOpen from "../../../hooks/useOpen";
import Button from "../../Button";
import Input from "../../Input";
import EmptyDislike from "../../icons/EmptyDislike";
import EmptyLike from "../../icons/EmptyLike";
import CommentWritingOption from "./CommentWritingOption";
import { useDeleteComment } from "../../../hooks/mutation/useDeleteComment";
import { useEditComment } from "../../../hooks/mutation/useEditComment";
import { useCheckCommentPassword } from "../../../hooks/mutation/useCheckCommentPassword";
import EditCommentForm from "../EditCommentForm";
import CreateCommentForm from "../CreateCommentForm";
import { useEditReply } from "../../../hooks/mutation/useEditReply";
import { useCheckReplyPassword } from "../../../hooks/mutation/useCheckReplyPassword";

interface CommentBaseProps {
  id: number;
  commentId: number;
  nickname: string;
  createdAt: string;
  updatedAt: string;
  likes: number;
  dislikes: number;
  content: string;
  replyType: "comment" | "reply";
}

export default function CommentBase({
  id,
  commentId,
  nickname,
  createdAt,
  updatedAt,
  likes,
  dislikes,
  content,
  replyType,
}: CommentBaseProps) {
  const isReply = replyType === "reply";
  const {
    isOpen: IsPasswordInputOpen,
    open: inputOpen,
    close: inputClose,
  } = useOpen();
  const { handleDeleteComment } = useDeleteComment(commentId);
  const editCommentProps = useEditComment({
    commentId,
    initialCommentValue: content,
  });
  const { isOpen: isEditCommentInputOpen, open: editCommentInputOpen } =
    editCommentProps;

  const editReplyProps = useEditReply({
    commentId,
    replyId: id,
    initialCommentValue: content,
  });

  const { isOpen: isEditReplyOpen, open: editReplyInputOpen } = editReplyProps;

  const isEditInputOpen = isReply ? isEditReplyOpen : isEditCommentInputOpen;
  const editInputOpen = isReply ? editReplyInputOpen : editCommentInputOpen;

  const { handleCheckCommentPassword } = useCheckCommentPassword({
    commentId,
    editInputOpen,
  });

  const { handleCheckReplyPassword } = useCheckReplyPassword({
    replyId: id,
    editInputOpen,
  });

  const [option, setOption] = useState<"edit" | "delete" | null>(null);
  const password = useFormInput("");
  const isModified = createdAt !== updatedAt;
  const createReplyProps = useCreateReply(commentId);

  const { isOpen, toggleOpen } = createReplyProps;

  const handleWritingOption = (value: "edit" | "delete") => {
    setOption(value);
  };

  const toggleReplyOpen = () => {
    if (isReply) {
      createReplyProps.content.setValue(`@${nickname} `);
    }

    toggleOpen();
  };

  const handleCancelClick = () => {
    inputClose();
  };

  const handleActionClick = () => {
    if (option === "edit") {
      if (isReply) {
        handleCheckReplyPassword(password.value);
      } else {
        handleCheckCommentPassword(password.value);
      }

      inputClose();

      return;
    }

    handleDeleteComment(password.value);
    inputClose();
  };

  return (
    <div>
      {!isEditInputOpen && (
        <>
          <div className="flex space-x-2 items-center">
            <span className="text-black text-[13px] font-bold">
              @{nickname}
            </span>
            <span className="text-[#9A9A9A] text-[12px]">
              {createdAt} {isModified && "(수정됨)"}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[#575757] text-base mt-0.5 whitespace-pre">
              {content}
            </span>
            <div className="relative">
              <CommentWritingOption
                inputOpen={inputOpen}
                inputClose={inputClose}
                handleWritingOption={handleWritingOption}
              />
              {IsPasswordInputOpen && (
                <div className="absolute flex border p-1 bg-white w-fit space-x-1">
                  <Input placeholder="비밀번호" type="password" {...password} />
                  <div className="w-14">
                    <Button onClick={handleActionClick} isPrimary>
                      확인
                    </Button>
                  </div>
                  <div className="w-14">
                    <Button onClick={handleCancelClick} isPrimary={false}>
                      취소
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="flex space-x-2 mt-1 items-center">
            <div className="flex text-sm items-center">
              <Button isPrimary={false}>
                <EmptyLike width={16} height={16} />
              </Button>
              <span className="text-[#9A9A9A]">{likes}</span>
            </div>
            <div className="flex text-sm items-center">
              <Button isPrimary={false}>
                <EmptyDislike width={16} height={16} />
              </Button>
              <span className="text-[#9A9A9A]">{dislikes}</span>
            </div>
            <Button isPrimary={false} onClick={toggleReplyOpen}>
              답글
            </Button>
          </div>
        </>
      )}

      {isOpen && (
        <div className="pl-4 pr-8">
          <CreateCommentForm
            commentType="reply"
            createReplyProps={createReplyProps}
          />
        </div>
      )}
      {isEditInputOpen && (
        <EditCommentForm
          commentType={isReply ? "reply" : "comment"}
          editCommentProps={editCommentProps}
          editReplyProps={editReplyProps}
          password={password.value}
        />
      )}
    </div>
  );
}
