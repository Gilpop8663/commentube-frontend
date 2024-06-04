import { useSuspenseQuery } from "@apollo/client";
import { useState } from "react";
import { Comment } from "../../types/comment";
import { GET_COMMENT_BY_ID } from "../../gql/query";

interface GetCommentsByVideoId {
  getCommentsByVideoId: Comment[];
}

type SortingType = "popular" | "newest";

export const useCommentById = (videoId: number) => {
  const [sortingType, setSortingType] = useState<SortingType>("popular");
  const { data } = useSuspenseQuery<GetCommentsByVideoId>(GET_COMMENT_BY_ID, {
    variables: { videoId, sortingType },
  });

  const handleSortingOptionChange = (value: SortingType) => {
    setSortingType(value);
  };

  return {
    data: data.getCommentsByVideoId,
    sortingOption: sortingType,
    handleSortingOptionChange,
  };
};
