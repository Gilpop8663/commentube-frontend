import VideoDetail from "../components/videos/VideoDetail";
import { useVideoDetail } from "../hooks/query/useVideoDetail";

interface VideoDetailFetcherProps {
  videoId: number;
}

export default function VideoDetailFetcher({
  videoId,
}: VideoDetailFetcherProps) {
  const { data } = useVideoDetail(videoId);

  return <VideoDetail videoData={data} />;
}
