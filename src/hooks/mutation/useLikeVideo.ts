import { useMutation } from "@apollo/client";
import { LIKE_VIDEO } from "../../gql/mutation";
import { useGetVideoId } from "../useGetVideoId";
import { GetVideoDetailByIdResponse } from "../query/useVideoDetail";
import { GET_VIDEO_DETAIL } from "../../gql/query";

interface LikeVideoResult {
  likeVideo: {
    ok: boolean;
    error: null | string;
  };
}

export const useLikeVideo = () => {
  const { videoId } = useGetVideoId();
  const [likeVideo, { data, error }] = useMutation<LikeVideoResult>(LIKE_VIDEO);

  const handleLikeVideo = async (isIncrement: boolean) => {
    await likeVideo({
      variables: { videoId, isIncrement },
      update: (cache, { data }) => {
        if (!data?.likeVideo.ok) return;

        const existingVideo: GetVideoDetailByIdResponse | null =
          cache.readQuery({
            query: GET_VIDEO_DETAIL,
            variables: { videoId },
          });

        if (!existingVideo) return;

        const video = existingVideo.getVideoDetailById;

        const newVideo = { ...video, likes: video.likes + 1 };

        cache.updateQuery(
          { query: GET_VIDEO_DETAIL, variables: { videoId } },
          () => ({
            getVideoDetailById: newVideo,
          })
        );
      },
    });
  };

  return { handleLikeVideo, data, error };
};
