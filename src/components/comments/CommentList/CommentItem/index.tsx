import { useState } from "react";
import { Reply } from "../../../../types/comment";
import CommentBase from "../../CommentBase";
import ReplyButton from "../../ReplyButton";
import ReplyList from "../../ReplyList";
import useOpen from "../../../../hooks/useOpen";

interface CommentItemProps {
  nickname: string;
  createdAt: string;
  updatedAt: string;
  likes: number;
  dislikes: number;
  content: string;
  replies: Reply[];
}

export default function CommentItem(commentData: CommentItemProps) {
  const { isOpen, toggleOpen } = useOpen();

  return (
    <div>
      <CommentBase {...commentData} />
      {commentData.replies.length > 0 && (
        <ReplyButton
          isActive={isOpen}
          replyCount={commentData.replies.length}
          onClick={toggleOpen}
        />
      )}
      <div className="relative pl-12 mt-2">
        {isOpen && <ReplyList replies={commentData.replies} />}
      </div>
    </div>
  );
}
