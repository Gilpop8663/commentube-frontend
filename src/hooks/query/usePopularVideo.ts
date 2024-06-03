import { gql, useSuspenseQuery } from "@apollo/client";
import { Video } from "../../types/video";

const GET_ALL_VIDEOS = gql`
  query {
    getAllVideos {
      id
      videoUrl
      createdAt
      updatedAt
      likes
      dislikes
      comments {
        id
        content
        nickname
      }
    }
  }
`;

interface getAllVideoResponse {
  getAllVideos: Video[];
}

export const usePopularVideo = () => {
  const { data } = useSuspenseQuery<getAllVideoResponse>(GET_ALL_VIDEOS);

  return { data: data.getAllVideos };
};
