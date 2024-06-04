import CommentDetail from "../components/comments/CommentDetail";
import { useCreateComment } from "../hooks/mutation/useCreateComment";
import { useCommentById } from "../hooks/query/useCommentById";

interface CommentFetcherProps {
  videoId: number;
}

export default function CommentFetcher({ videoId }: CommentFetcherProps) {
  const { data, sortingOption, handleSortingOptionChange } =
    useCommentById(videoId);

  const createCommentProps = useCreateComment({
    videoId,
    sortingType: sortingOption,
  });

  return (
    <CommentDetail
      commentData={data}
      sortingOption={sortingOption}
      createCommentProps={createCommentProps}
    />
  );
}
