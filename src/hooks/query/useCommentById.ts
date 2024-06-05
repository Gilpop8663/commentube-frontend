import { useReactiveVar, useSuspenseQuery } from "@apollo/client";
import { Comment } from "../../types/comment";
import { GET_COMMENT_BY_ID } from "../../gql/query";
import { sortOrderVar } from "../../contexts/sortingType";
import { useParams } from "react-router-dom";
import { useGetVideoId } from "../useGetVideoId";

export interface GetCommentsByVideoId {
  getCommentsByVideoId: Comment[];
}

export type SortingType = "popular" | "newest";

export const useCommentById = () => {
  const { videoId } = useGetVideoId();

  const sortingType = useReactiveVar(sortOrderVar);
  const { data } = useSuspenseQuery<GetCommentsByVideoId>(GET_COMMENT_BY_ID, {
    variables: { videoId, sortingType },
  });

  return {
    data: data.getCommentsByVideoId,
    sortingOption: sortingType,
  };
};
