import { useMutation, useReactiveVar } from "@apollo/client";
import { DISLIKE_REPLY } from "../../gql/mutation";
import { useGetVideoId } from "../useGetVideoId";
import { GET_COMMENT_BY_ID } from "../../gql/query";
import { GetCommentsByVideoId } from "../query/useCommentById";
import { sortOrderVar } from "../../contexts/sortingType";

interface DislikeReplyResult {
  dislikeReply: {
    ok: boolean;
    error: null | string;
  };
}

interface UseDislikeReplyProps {
  commentId: number;
  replyId: number;
}

export const useDislikeReply = ({
  commentId,
  replyId,
}: UseDislikeReplyProps) => {
  const { videoId } = useGetVideoId();
  const [dislikeReply, { data, error }] =
    useMutation<DislikeReplyResult>(DISLIKE_REPLY);

  const sortingType = useReactiveVar(sortOrderVar);

  const handleDislikeReply = async (isIncrement: boolean) => {
    await dislikeReply({
      variables: { replyId, isIncrement },
      update: (cache, { data }) => {
        if (!data?.dislikeReply.ok) return;

        const existingComments: GetCommentsByVideoId | null = cache.readQuery({
          query: GET_COMMENT_BY_ID,
          variables: { videoId, sortingType },
        });

        if (!existingComments) return;

        const newCommentList = existingComments.getCommentsByVideoId.map(
          (item) => {
            if (item.id !== commentId) return item;

            const newReplyList = item.replies.map((replyItem) => {
              if (replyItem.id !== replyId) return replyItem;

              return { ...replyItem, dislikes: replyItem.dislikes + 1 };
            });

            return { ...item, replies: newReplyList };
          }
        );

        cache.updateQuery(
          { query: GET_COMMENT_BY_ID, variables: { videoId, sortingType } },
          () => ({
            getCommentsByVideoId: newCommentList,
          })
        );
      },
    });
  };

  return { handleDislikeReply, data, error };
};
