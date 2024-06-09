import { Suspense } from "react";
import Header from "../../components/Header";
import VideoDetailFetcher from "../../fetchers/VideoDetailFetcher";
import CommentFetcher from "../../fetchers/CommentFetcher";
import ErrorBoundary from "../../components/ErrorBoundary";

export default function VideoPage() {
  return (
    <div className="px-60 bg-brand">
      <Header />
      <div className="py-20">
        <ErrorBoundary
          fallback={<span>비디오 정보를 불러오지 못했습니다.</span>}
        >
          <Suspense fallback={"로딩중..."}>
            <VideoDetailFetcher />
          </Suspense>
        </ErrorBoundary>
        <ErrorBoundary fallback={<span>댓글을 불러오지 못했습니다.</span>}>
          <Suspense fallback={"로딩중..."}>
            <CommentFetcher />
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
}
