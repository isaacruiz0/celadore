import type { VideoItem } from '../../../../../../shared/types/API';
import { Link } from '@tanstack/react-router';
import { Play } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { Route } from '@/routes/experiences/youtube/themes/$themeName';
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
  const { id } = Route.useSearch();

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
          <div className="flex justify-between">
            <div className="flex flex-col gap-1">
              <p className="text-sm opacity-60">{formattedDate}</p>
              <p className="text-sm opacity-60">By {videoItem.channelName}</p>
            </div>
            <div className="flex flex-col gap-2 md:flex-row">
              <Link
                to="/experiences/youtube/themes/watch"
                search={{ id: videoItem.id, themeId: id }}
                className="py-2 cursor-pointer opacity-60 flex items-center gap-1 rounded-md border border-gray-500 bg-gray-50/5 px-3.5 text-base font-medium text-gray-900 select-none hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-blue-800 active:bg-gray-100"
              >
                <span>Play</span>
                <Play size={15} />
              </Link>
              {/*<button className="cursor-pointer h-10 items-center justify-center rounded-md border border-gray-200 bg-gray-50/5 px-3.5 text-base font-medium text-gray-900 select-none hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-blue-800 active:bg-gray-100">
                <span className="opacity-60">Watch later</span>
              </button>*/}
            </div>
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
