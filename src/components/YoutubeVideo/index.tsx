interface YoutubeVideoProps {
  videoUrl: string;
}

export default function YoutubeVideo({ videoUrl }: YoutubeVideoProps) {
  return (
    <div className="w-full relative pb-[56.25%]">
      <iframe
        className="absolute top-0 left-0"
        width="100%"
        height="100%"
        src={`https://www.youtube.com/embed/${videoUrl}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    </div>
  );
}
