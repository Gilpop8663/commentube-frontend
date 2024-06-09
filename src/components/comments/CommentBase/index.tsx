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
import { useDeleteReply } from "../../../hooks/mutation/useDeleteReply";
import { useLikeComment } from "../../../hooks/mutation/useLikeComment";
import { useDislikeComment } from "../../../hooks/mutation/useDislikeComment";
import { useLikeReply } from "../../../hooks/mutation/useLikeReply";
import { useDislikeReply } from "../../../hooks/mutation/useDislikeReply";
import FillLike from "../../icons/FillLike";
import FillDislike from "../../icons/FillDislike";
import { PASSWORD_MAX_LENGTH } from "../../../validation/constants";
import { timeAgo } from "../../../utils";

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
  const { handleLikeComment, liked: commentLiked } = useLikeComment(commentId);
  const { handleDislikeComment, disliked: commentDisliked } =
    useDislikeComment(commentId);
  const { handleLikeReply, liked: replyLiked } = useLikeReply({
    commentId,
    replyId: id,
  });
  const { handleDislikeReply, disliked: replyDisliked } = useDislikeReply({
    commentId,
    replyId: id,
  });

  const liked = isReply ? replyLiked : commentLiked;
  const disliked = isReply ? replyDisliked : commentDisliked;

  const handleLikeClick = isReply ? handleLikeReply : handleLikeComment;
  const handleDislikeClick = isReply
    ? handleDislikeReply
    : handleDislikeComment;

  const {
    isOpen: IsPasswordInputOpen,
    open: inputOpen,
    close: inputClose,
  } = useOpen();
  const { handleDeleteComment } = useDeleteComment(commentId);
  const { handleDeleteReply } = useDeleteReply({ commentId, replyId: id });
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
  const password = useFormInput({ maxLength: PASSWORD_MAX_LENGTH });
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

  const handleActionClick = async () => {
    if (password.value.trim() === "") {
      password.showErrorMessage("비밀번호를 입력해주세요");
      return;
    }

    let isCorrectPassword: boolean | undefined = false;

    if (option === "edit") {
      if (isReply) {
        const result = await handleCheckReplyPassword(password.value);

        isCorrectPassword = result.data?.checkReplyPassword.ok;
      } else {
        const result = await handleCheckCommentPassword(password.value);

        isCorrectPassword = result.data?.checkCommentPassword.ok;
      }
    }

    if (option === "delete") {
      if (isReply) {
        const result = await handleDeleteReply(password.value);

        isCorrectPassword = result.data?.deleteReply.ok;
      } else {
        const result = await handleDeleteComment(password.value);

        isCorrectPassword = result.data?.deleteComment.ok;
      }
    }

    if (isCorrectPassword) {
      inputClose();
    } else {
      password.showErrorMessage("비밀번호가 맞지 않습니다.");
    }
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
              {timeAgo(createdAt)} {isModified && "(수정됨)"}
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
                  <Input
                    required
                    maxLength={PASSWORD_MAX_LENGTH}
                    placeholder="비밀번호"
                    type="password"
                    {...password}
                  />
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
              <Button onClick={handleLikeClick} isPrimary={false}>
                {liked ? (
                  <FillLike width={16} height={16} />
                ) : (
                  <EmptyLike width={16} height={16} />
                )}
              </Button>
              <span className="text-[#9A9A9A]">{likes}</span>
            </div>
            <div className="flex text-sm items-center">
              <Button onClick={handleDislikeClick} isPrimary={false}>
                {disliked ? (
                  <FillDislike width={16} height={16} />
                ) : (
                  <EmptyDislike width={16} height={16} />
                )}
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
