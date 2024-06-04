import { useSuspenseQuery } from "@apollo/client";
import { Video } from "../../types/video";
import { GET_VIDEO_DETAIL } from "../../gql/query";

interface GetVideoDetailByIdResponse {
  getVideoDetailById: Video;
}

export const useVideoDetail = (videoId: number) => {
  const { data } = useSuspenseQuery<GetVideoDetailByIdResponse>(
    GET_VIDEO_DETAIL,
    { variables: { videoId } }
  );

  return { data: data.getVideoDetailById };
};
