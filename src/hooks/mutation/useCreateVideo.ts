import { gql, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

const CREATE_VIDEO = gql`
  mutation CreateVideo($inputs: CreateVideoInput!) {
    createVideo(input: $inputs) {
      ok
      error
      videoId
    }
  }
`;

interface CreateVideoResult {
  createVideo: {
    ok: boolean;
    error: null | string;
    videoId: number;
  };
}

export const useCreateVideo = () => {
  const [createVideo, { data, error }] =
    useMutation<CreateVideoResult>(CREATE_VIDEO);
  const navigate = useNavigate();

  const handleCreateVideo = async (videoUrl: string) => {
    await createVideo({
      variables: { inputs: { videoUrl } },
    }).then((res) => {
      const videoId = res.data?.createVideo.videoId;

      navigate(`/videos/${videoId}`);
    });
  };

  return { handleCreateVideo, data, error };
};
