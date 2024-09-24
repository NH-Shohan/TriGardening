"use client";

import videos from "@/data/videos.json";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

const TopVideos = ({ direction = "left", speed = "", pauseOnHover = true }) => {
  const containerRef = React.useRef(null);
  const scrollerRef = React.useRef(null);
  const [start, setStart] = useState(false);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    addAnimation();
  }, []);

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }

  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards"
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse"
        );
      }
    }
  };

  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "180s");
      }
    }
  };

  const handleClick = (video) => {
    setSelected(video);
  };

  const handleOutsideClick = () => {
    setSelected(null);
  };

  return (
    <div className="h-fit mb-24">
      <h3>
        Top <span className="text-green-600">Videos</span>
      </h3>

      <div
        ref={containerRef}
        className="scroller relative z-20 overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]"
      >
        <ul
          ref={scrollerRef}
          className={cn(
            "flex min-w-full shrink-0 gap-10 w-max h-fit mt-8 flex-nowrap",
            start && "animate-scroll ",
            pauseOnHover && "hover:[animation-play-state:paused]"
          )}
        >
          <div className="flex gap-10 overflow-y-hidden overflow-x-scroll no-scrollbar">
            {videos.map((video, index) => (
              <div key={index} className="relative flex items-center h-full">
                <div
                  className={`text-[260px] -mr-8 font-outline font-sf-pro-display text-green-500 cursor-default`}
                >
                  {index + 1}
                </div>

                <motion.iframe
                  className="cursor-pointer rounded-3xl aspect-video h-[22vh] border border-green-500 overflow-hidden"
                  src={video.src}
                  title="YouTube video player"
                  style={{ border: 0 }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />

                <motion.div
                  onClick={() => handleClick(video)}
                  className="absolute inset-0 bg-black opacity-0 hover:opacity-0 transition-opacity cursor-pointer rounded-3xl"
                />
              </div>
            ))}
          </div>
        </ul>
      </div>

      {selected && (
        <>
          <motion.div
            onClick={handleOutsideClick}
            className="fixed top-0 left-0 w-full h-full bg-black/80 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            className="fixed top-[20%] left-[20%] w-[60%] h-[60%] bg-neutral-50 rounded-3xl z-50 shadow-2xl p-2"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
          >
            <motion.iframe
              className="w-full h-full rounded-2xl border"
              src={selected.src}
              title="YouTube player"
              style={{ border: 0 }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </motion.div>
        </>
      )}
    </div>
  );
};

export default TopVideos;
