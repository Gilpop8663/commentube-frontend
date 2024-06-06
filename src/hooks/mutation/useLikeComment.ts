import { useMutation, useReactiveVar } from "@apollo/client";
import { LIKE_COMMENT } from "../../gql/mutation";
import { useGetVideoId } from "../useGetVideoId";
import { GET_COMMENT_BY_ID } from "../../gql/query";
import { GetCommentsByVideoId } from "../query/useCommentById";
import { sortOrderVar } from "../../contexts/sortingType";

interface LikeCommentResult {
  likeComment: {
    ok: boolean;
    error: null | string;
  };
}

export const useLikeComment = (commentId: number) => {
  const { videoId } = useGetVideoId();
  const [likeComment, { data, error }] =
    useMutation<LikeCommentResult>(LIKE_COMMENT);

  const sortingType = useReactiveVar(sortOrderVar);

  const handleLikeComment = async (isIncrement: boolean) => {
    await likeComment({
      variables: { commentId, isIncrement },
      update: (cache, { data }) => {
        if (!data?.likeComment.ok) return;

        const existingComments: GetCommentsByVideoId | null = cache.readQuery({
          query: GET_COMMENT_BY_ID,
          variables: { videoId, sortingType },
        });

        if (!existingComments) return;

        const newCommentList = existingComments.getCommentsByVideoId.map(
          (item) => {
            if (item.id !== commentId) return item;

            return { ...item, likes: item.likes + 1 };
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

  return { handleLikeComment, data, error };
};
