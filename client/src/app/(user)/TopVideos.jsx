import videos from "@/data/videos.json";

const TopVideos = () => {
  return (
    <div className="h-fit mb-24">
      <h3>
        Top <span className="text-green-600">Videos</span>
      </h3>

      <div className="flex gap-5 mt-5 overflow-y-hidden overflow-x-scroll no-scrollbar h-[22vh]">
        {videos.map((video, index) => (
          <div key={index} className="flex items-center h-full">
            <div
              className={`text-[260px] -mr-8 font-outline font-sf-pro-display text-green-500`}
            >
              {index + 1}
            </div>
            <iframe
              className="cursor-pointer rounded-xl aspect-video w-10vw border border-green-500 overflow-hidden"
              src={video.src}
              title="YouTube video player"
              style={{ border: 0 }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopVideos;
