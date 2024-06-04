import { ApolloError, useMutation } from "@apollo/client";
import { CREATE_COMMENT } from "../../gql/mutation";
import { GET_COMMENT_BY_ID } from "../../gql/query";
import { UseFormInputResult, useFormInput } from "../useInput";
import { FormEvent } from "react";
import { GetCommentsByVideoId, SortingType } from "../query/useCommentById";
import { Comment } from "../../types/comment";

interface CreateCommentResult {
  createComment: {
    ok: boolean;
    error: null | string;
    commentId: number;
  };
}

interface UseCreateCommentProps {
  videoId: number;
  sortingType: SortingType;
}

export interface UseCreateCommentResult {
  handleCreateComment: (event: FormEvent) => Promise<void>;
  data: CreateCommentResult | undefined | null;
  error: ApolloError | undefined;
  content: UseFormInputResult;
  nickname: UseFormInputResult;
  password: UseFormInputResult;
}

export const useCreateComment = ({
  videoId,
  sortingType,
}: UseCreateCommentProps): UseCreateCommentResult => {
  const content = useFormInput();
  const nickname = useFormInput();
  const password = useFormInput();
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

        console.log([newComment, ...existingComments.getCommentsByVideoId]);

        cache.updateQuery(
          { query: GET_COMMENT_BY_ID, variables: { videoId, sortingType } },
          (data) => ({
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
