import type { VideoItem } from '../types';
export default function VideoListManager({
  videoItemsList,
}: {
  videoItemsList: VideoItem[];
}) {
  return (
    <div>
      {videoItemsList.map((videoItem, index) => {
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
            <div className="flex gap-2">
              <img
                src={videoItem.thumbnailURL}
                className="w-60 h-40 rounded object-cover"
              />
              <div className="flex flex-col gap-1">
                <p className="text-3xl">{videoItem.title}</p>
                <p className="text-sm opacity-60">{videoItem.channelName}</p>
              </div>
            </div>
            <div className="px-5 py-2 bg-[#224]/5 rounded">
              <p className="text-md truncate">{videoItem.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
