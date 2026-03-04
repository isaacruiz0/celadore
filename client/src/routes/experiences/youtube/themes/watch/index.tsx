import { createFileRoute } from '@tanstack/react-router';
import { useState, useEffect, useRef } from 'react';

export const Route = createFileRoute('/experiences/youtube/themes/watch/')({
  component: Watch,
  validateSearch: (search) => ({
    id: String(search.id ?? ''),
    themeId: String(search.themeId ?? ''),
    description: String(search.description ?? ''),
    title: String(search.title ?? ''),
    date: String(search.date ?? ''),
    channelName: String(search.channelName ?? ''),
  }),
});

function Watch() {
  const { id, themeId, date, description, title, channelName } =
    Route.useSearch();
  const [readMore, setReadMore] = useState<boolean>(false);
  const [showReadMore, setShowReadMore] = useState<boolean>(false);
  const elementRef = useRef<HTMLDivElement>(null);

  const formattedDate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date));

  useEffect(() => {
    if (elementRef.current) {
      setShowReadMore(
        elementRef.current.scrollHeight > elementRef.current.clientHeight,
      );
    }
  }, [readMore]);
  return (
    <div className="min-h-screen bg-linear-to-br from-[#F2D5A6] via-white to-[#F2D5A6] py-10 md:flex md:items-center md:justify-center">
      <div className="px-5 md:max-w-[50%] flex flex-col gap-6 justify-center items-center md:gap-6">
        <iframe
          src={`https://www.youtube.com/embed/${id}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="aspect-video rounded-2xl"
        />
        <div className="flex flex-col gap-10">
          <p className="text-xl md:text-3xl">{title}</p>
          <p
            onClick={function () {
              setReadMore(!readMore);
            }}
          >
            <span
              className={(readMore ? null : 'line-clamp-3') + ' text-md'}
              ref={elementRef}
            >
              {description}
            </span>
            <span className="cursor-pointer">
              {showReadMore ? '...more' : null}
            </span>
          </p>
          <div className="flex justify-between">
            <div className="flex flex-col gap-1">
              <p className="text-sm opacity-60">{formattedDate}</p>
              <p className="text-sm opacity-60">By {channelName}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
