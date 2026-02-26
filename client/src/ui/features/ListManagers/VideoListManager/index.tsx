import type { VideoItem } from '../types';
export default function VideoListManager({
  videoItemsList,
}: {
  videoItemsList: VideoItem[];
}) {
  return (
    <div>
      {videoItemsList.map((videoItem, index) => {
        const formattedDate = new Intl.DateTimeFormat('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }).format(new Date(videoItem.datePublished));
        return (
          <div
            key={videoItem.id}
            className="px-10 py-5 flex flex-col gap-2 bg-transparent backdrop-blur-md text-[#224] border-b-2 border-[#1a1a1a]/20 hover:border-[#1a1a1a]/50 transition-all duration-500 relative overflow-hidden"
            style={{
              animation: 'fadeInUp 0.5s ease-out forwards',
              animationDelay: `${index * 0.1}s`,
              opacity: 0,
              boxShadow:
                '0 0 25px rgba(26, 26, 26, 0.12), inset 0 0 25px rgba(242, 213, 166, 0.2)',
            }}
          >
            <div className="flex flex-col-reverse gap-0 md:flex-row md:gap-6">
              <div className="flex flex-col gap-5 md:max-w-[66%]">
                <p className="text-xl">{videoItem.title}</p>
                <p className="text-md truncate">{videoItem.description}</p>
                <div className="flex flex-col gap-1">
                  <p className="text-sm opacity-60">{formattedDate}</p>
                  <p className="text-sm opacity-60">
                    By {videoItem.channelName}
                  </p>
                </div>
              </div>
              <img
                src={videoItem.thumbnailURL}
                className="rounded-5xl"
                style={{
                  clipPath: 'inset( 13.5% 0px 13.5% 0px)',
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
