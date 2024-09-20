"use client";

import { Button } from "@/components/ui/button";
import { MonitorArrowUp } from "@phosphor-icons/react";
import videos from "../../../../data/videos.json";

const VideosPage = () => {
  return (
    <>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        <Button className="grid place-content-center gap-2 bg-neutral-50 text-green-600 border-2 border-dashed border-green-600 hover:bg-green-600/10 w-full h-full">
          <MonitorArrowUp weight="light" className="h-10 text-center w-full" />{" "}
          <h5>New Article</h5>
        </Button>
        {videos.map((video, index) => (
          <iframe
            key={index}
            className="rounded-xl aspect-video w-full border"
            src={video.src}
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          />
        ))}
      </div>
    </>
  );
};

export default VideosPage;
