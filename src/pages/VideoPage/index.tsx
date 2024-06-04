import { Suspense } from "react";
import Header from "../../components/Header";
import VideoDetailFetcher from "../../fetchers/VideoDetailFetcher";
import { useParams } from "react-router-dom";
import CommentFetcher from "../../fetchers/CommentFetcher";

export default function VideoPage() {
  const param = useParams();
  const videoId = Number(param.id);

  return (
    <div className="px-60 bg-brand">
      <Header />
      <div className="py-20">
        <Suspense fallback={"로딩중..."}>
          <VideoDetailFetcher videoId={videoId} />
        </Suspense>
        <Suspense fallback={"로딩중..."}>
          <CommentFetcher videoId={videoId} />
        </Suspense>
      </div>
    </div>
  );
}
