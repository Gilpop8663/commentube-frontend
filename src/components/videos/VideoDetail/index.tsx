import { Video } from "../../../types/video";
import YoutubeVideo from "../YoutubeVideo";
import EmptyLike from "../../icons/EmptyLike";
import EmptyDislike from "../../icons/EmptyDislike";
import Button from "../../Button";

interface VideoDetailProps {
  videoData: Video;
}

export default function VideoDetail({ videoData }: VideoDetailProps) {
  return (
    <div>
      <YoutubeVideo videoUrl={videoData.videoUrl} />
      <div className="flex space-x-2 items-center mt-4">
        <div className="flex space-x-1 items-center">
          <Button isPrimary={false}>
            <EmptyLike />
          </Button>
          <span className="text-lg">{videoData.likes}</span>
        </div>
        <div className="flex space-x-1 items-center">
          <Button isPrimary={false}>
            <EmptyDislike />
          </Button>
          <span className="text-lg">{videoData.dislikes}</span>
        </div>
      </div>
    </div>
  );
}
