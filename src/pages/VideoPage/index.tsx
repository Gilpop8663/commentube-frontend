import { Suspense } from "react";
import Header from "../../components/Header";
import VideoDetailFetcher from "../../fetchers/VideoDetailFetcher";
import CommentFetcher from "../../fetchers/CommentFetcher";

export default function VideoPage() {
  return (
    <div className="px-60 bg-brand">
      <Header />
      <div className="py-20">
        <Suspense fallback={"로딩중..."}>
          <VideoDetailFetcher />
        </Suspense>
        <Suspense fallback={"로딩중..."}>
          <CommentFetcher />
        </Suspense>
      </div>
    </div>
  );
}
