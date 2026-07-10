"use client";

import { useRef, useState } from "react";
import { Play } from "lucide-react";

export interface Story {
  name: string;
  course: string;
  quote: string;
  video: string;
}

export function StoryCard({ story }: { story: Story }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const handlePlay = () => {
    const el = videoRef.current;
    if (!el) return;
    el.play();
    setPlaying(true);
  };

  return (
    <article className="flex w-[260px] flex-shrink-0 snap-start flex-col sm:w-[300px]">
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-muted shadow-sm">
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          controls={playing}
          preload="none"
          playsInline
          onPause={() => setPlaying(false)}
          onEnded={() => setPlaying(false)}
        >
          <source src={story.video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {!playing && (
          <button
            type="button"
            onClick={handlePlay}
            aria-label={`Play ${story.name}'s story`}
            className="absolute inset-0 flex items-center justify-center bg-foreground/10 transition-colors hover:bg-foreground/20"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/80 text-primary-foreground shadow-lg backdrop-blur-sm transition-transform duration-300 group-hover:scale-105 sm:h-20 sm:w-20">
              <Play className="ml-1 h-7 w-7 fill-current sm:h-8 sm:w-8" />
            </span>
          </button>
        )}
      </div>

      <div className="mt-4 px-1">
        <p className="text-lg font-bold text-foreground">{story.name}</p>
        <p className="mt-0.5 text-sm font-medium text-primary">{story.course}</p>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
          {story.quote}
        </p>
      </div>
    </article>
  );
}
