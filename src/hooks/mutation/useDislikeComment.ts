import { useMutation, useReactiveVar } from "@apollo/client";
import { DISLIKE_COMMENT } from "../../gql/mutation";
import { useGetVideoId } from "../useGetVideoId";
import { GET_COMMENT_BY_ID } from "../../gql/query";
import { GetCommentsByVideoId } from "../query/useCommentById";
import { sortOrderVar } from "../../contexts/sortingType";

interface DislikeCommentResult {
  dislikeComment: {
    ok: boolean;
    error: null | string;
  };
}

export const useDislikeComment = (commentId: number) => {
  const { videoId } = useGetVideoId();
  const [dislikeComment, { data, error }] =
    useMutation<DislikeCommentResult>(DISLIKE_COMMENT);

  const sortingType = useReactiveVar(sortOrderVar);

  const handleDislikeComment = async (isIncrement: boolean) => {
    await dislikeComment({
      variables: { commentId, isIncrement },
      update: (cache, { data }) => {
        if (!data?.dislikeComment.ok) return;

        const existingComments: GetCommentsByVideoId | null = cache.readQuery({
          query: GET_COMMENT_BY_ID,
          variables: { videoId, sortingType },
        });

        if (!existingComments) return;

        const newCommentList = existingComments.getCommentsByVideoId.map(
          (item) => {
            if (item.id !== commentId) return item;

            return { ...item, dislikes: item.dislikes + 1 };
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

  return { handleDislikeComment, data, error };
};
