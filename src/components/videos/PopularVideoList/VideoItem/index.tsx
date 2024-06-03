import { useYoutubeTitleAndAuthorFetch } from "../../../../hooks/useYoutubeTitleAndAuthorFetch";
import { getYoutubeThumbnailImage } from "../../../../utils/youtube";
import CommentBubble from "../../../icons/CommentBubble";
import EmptyDislike from "../../../icons/EmptyDislike";
import EmptyLike from "../../../icons/EmptyLike";

interface VideoItemProps {
  videoUrl: string;
  likes: number;
  dislikes: number;
  comments: number;
}

export default function VideoItem({
  videoUrl,
  likes,
  dislikes,
  comments,
}: VideoItemProps) {
  const { data } = useYoutubeTitleAndAuthorFetch(videoUrl);
  const thumbnailUrl = getYoutubeThumbnailImage(videoUrl);

  const title =
    data && data.title.length > 30
      ? data?.title.substring(0, 30) + "..."
      : data?.title;

  return (
    <div className="flex border">
      <img className="object-contain" src={thumbnailUrl} />
      <div className="flex flex-col ml-4 space-y-2">
        <span className="">{title}</span>
        <span className="text-sm">{data?.author}</span>
        <div className="flex space-x-2 items-center">
          <div className="flex space-x-1 items-center">
            <EmptyLike />
            <span>{likes}</span>
          </div>
          <div className="flex space-x-1 items-center">
            <EmptyDislike />
            <span>{dislikes}</span>
          </div>
          <div className="flex space-x-1 items-center">
            <CommentBubble width={20} height={20} />
            <span>{comments}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
