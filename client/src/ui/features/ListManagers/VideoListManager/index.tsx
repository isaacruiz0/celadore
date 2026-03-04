import type { VideoItem } from '../../../../../../shared/types/API';
import { useState, useEffect, useRef } from 'react';
function VideoCard({
  videoItem,
  index,
}: {
  videoItem: VideoItem;
  index: number;
}) {
  const [readMore, setReadMore] = useState<boolean>(false);
  const [showReadMore, setShowReadMore] = useState<boolean>(false);
  const elementRef = useRef<HTMLDivElement>(null);

  const formattedDate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(videoItem.datePublished));

  useEffect(() => {
    if (elementRef.current) {
      setShowReadMore(
        elementRef.current.scrollHeight > elementRef.current.clientHeight,
      );
    }
  }, [readMore]);

  return (
    <div
      className="px-5 pt-5 pb-10 flex flex-col gap-2 bg-transparent backdrop-blur-md text-[#224] transition-all duration-500 relative overflow-hidden"
      style={{
        animation: 'fadeInUp 0.5s ease-out forwards',
        animationDelay: `${index * 0.1}s`,
        opacity: 0,
      }}
    >
      <div className="flex flex-col-reverse  gap-0 md:flex-row md:items-center md:gap-6">
        <div className="flex flex-col gap-10 md:max-w-[66%] ">
          <p className="text-xl md:text-3xl">{videoItem.title}</p>
          <p
            onClick={function () {
              setReadMore(!readMore);
            }}
          >
            <span
              className={(readMore ? null : 'line-clamp-3') + ' text-md'}
              ref={elementRef}
            >
              {videoItem.description}
            </span>
            <span>{showReadMore ? '...more' : null}</span>
          </p>
          <div className="flex flex-col gap-1">
            <p className="text-sm opacity-60">{formattedDate}</p>
            <p className="text-sm opacity-60">By {videoItem.channelName}</p>
          </div>
        </div>
        <img
          src={videoItem.thumbnailURL}
          className="mt-[-10%] md:mt-0"
          style={{
            clipPath: 'inset(13.5% 0px 13.5% 0px round 12px)',
          }}
        />
      </div>
    </div>
  );
}
export default function VideoListManager({
  videoItemsList,
}: {
  videoItemsList: VideoItem[];
}) {
  return (
    <div>
      {videoItemsList.map((videoItem, index) => (
        <VideoCard key={videoItem.id} videoItem={videoItem} index={index} />
      ))}
    </div>
  );
}
