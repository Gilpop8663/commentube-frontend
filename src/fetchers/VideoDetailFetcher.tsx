import VideoDetail from "../components/videos/VideoDetail";
import { useVideoDetail } from "../hooks/query/useVideoDetail";
import { useGetVideoId } from "../hooks/useGetVideoId";

export default function VideoDetailFetcher() {
  const { videoId } = useGetVideoId();
  const { data } = useVideoDetail(videoId);

  return <VideoDetail videoData={data} />;
}
