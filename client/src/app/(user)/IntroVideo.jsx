const IntroVideo = () => {
  return (
    <div className="w-full h-full flex justify-center mb-24">
      <iframe
        className="rounded-[32px] aspect-video w-full md:w-[60vw] border-8 border-green-600 overflow-hidden"
        src={"https://www.youtube.com/embed/RkDTqjqYDxI?si=3NA2hEV9t2bgsPx5"}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    </div>
  );
};

export default IntroVideo;
