import { ApolloError, useMutation, useReactiveVar } from "@apollo/client";
import { CREATE_COMMENT } from "../../gql/mutation";
import { GET_COMMENT_BY_ID } from "../../gql/query";
import { UseFormInputResult, useFormInput } from "../useInput";
import { FormEvent } from "react";
import { GetCommentsByVideoId } from "../query/useCommentById";
import { Comment } from "../../types/comment";
import { sortOrderVar } from "../../contexts/sortingType";
import { useGetVideoId } from "../useGetVideoId";

interface CreateCommentResult {
  createComment: {
    ok: boolean;
    error: null | string;
    commentId: number;
  };
}

export interface UseCreateCommentResult {
  handleCreateComment: (event: FormEvent) => Promise<void>;
  data: CreateCommentResult | undefined | null;
  error: ApolloError | undefined;
  content: UseFormInputResult;
  nickname: UseFormInputResult;
  password: UseFormInputResult;
}

export const useCreateComment = (): UseCreateCommentResult => {
  const { videoId } = useGetVideoId();
  const content = useFormInput();
  const nickname = useFormInput();
  const password = useFormInput();
  const sortingType = useReactiveVar(sortOrderVar);

  const [createComment, { data, error }] =
    useMutation<CreateCommentResult>(CREATE_COMMENT);

  const handleCreateComment = async (event: FormEvent) => {
    event.preventDefault();

    const input = {
      content: content.value,
      nickname: nickname.value,
      password: password.value,
    };

    await createComment({
      variables: { input, videoId },

      update: (cache, { data }) => {
        if (!data?.createComment.ok) return;

        const existingComments: GetCommentsByVideoId | null = cache.readQuery({
          query: GET_COMMENT_BY_ID,
          variables: { videoId, sortingType },
        });

        if (!existingComments) return;

        const newComment: Comment = {
          id: data.createComment.commentId, // This should be a unique identifier for the new comment
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          nickname: nickname.value,
          content: content.value,
          likes: 0,
          dislikes: 0,
          replies: [],
        };

        cache.updateQuery(
          { query: GET_COMMENT_BY_ID, variables: { videoId, sortingType } },
          () => ({
            getCommentsByVideoId: [
              newComment,
              ...existingComments.getCommentsByVideoId,
            ],
          })
        );
      },
    });

    content.resetInputValue();
  };

  return { handleCreateComment, data, error, content, nickname, password };
};
