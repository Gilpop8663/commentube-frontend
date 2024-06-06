import { Video } from "../../../types/video";
import YoutubeVideo from "../YoutubeVideo";
import EmptyLike from "../../icons/EmptyLike";
import EmptyDislike from "../../icons/EmptyDislike";
import Button from "../../Button";
import { useLikeVideo } from "../../../hooks/mutation/useLikeVideo";
import { useDislikeVideo } from "../../../hooks/mutation/useDislikeVideo";
import FillLike from "../../icons/FillLike";
import FillDislike from "../../icons/FillDislike";

interface VideoDetailProps {
  videoData: Video;
}

export default function VideoDetail({ videoData }: VideoDetailProps) {
  const { handleLikeVideo, liked } = useLikeVideo();
  const { handleDislikeVideo, disliked } = useDislikeVideo();

  return (
    <div>
      <YoutubeVideo videoUrl={videoData.videoUrl} />
      <div className="flex space-x-2 items-center mt-4">
        <div className="flex space-x-1 items-center">
          <Button onClick={handleLikeVideo} isPrimary={false}>
            {liked ? <FillLike /> : <EmptyLike />}
          </Button>
          <span className="text-lg">{videoData.likes}</span>
        </div>
        <div className="flex space-x-1 items-center">
          <Button onClick={handleDislikeVideo} isPrimary={false}>
            {disliked ? <FillDislike /> : <EmptyDislike />}
          </Button>
          <span className="text-lg">{videoData.dislikes}</span>
        </div>
      </div>
    </div>
  );
}
