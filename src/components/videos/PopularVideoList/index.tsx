import { Link } from "react-router-dom";
import { Video } from "../../../types/video";
import VideoItem from "./VideoItem";

interface PopularVideoListProps {
  videoData: Video[];
}

export default function PopularVideoList({ videoData }: PopularVideoListProps) {
  return (
    <div className="border border-[#C9C9C9] shadow-lg rounded flex flex-col items-center bg-white">
      <span className="text-xl text-gray-500 pt-3 font-base">
        지금 인기 많은 동영상
      </span>
      <div className="w-full flex flex-col gap-4 p-4 ">
        {videoData.length === 0 && (
          <span className="text-center">인기 비디오가 존재하지 않습니다</span>
        )}
        {videoData.map((item) => (
          <Link key={item.id} to={`/videos/${item.id}`}>
            <VideoItem
              likes={item.likes}
              dislikes={item.dislikes}
              comments={item.comments.length}
              videoUrl={item.videoUrl}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
