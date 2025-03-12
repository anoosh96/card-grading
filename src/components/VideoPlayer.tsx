'use client'

import React, { useState, useRef } from "react";
import ReactPlayer from "react-player";
import { FaPlay, FaPause } from "react-icons/fa";

interface VideoPlayerProps {
  url: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ url }) => {
  const playerRef = useRef<ReactPlayer | null>(null);
  const [playing, setPlaying] = useState(false);
  // const [progress, setProgress] = useState(0);
  // const [duration, setDuration] = useState(0);
  // const [currentTime, setCurrentTime] = useState(0);

  // Toggle Play/Pause
  const togglePlay = () => setPlaying(!playing);

  // Update Progress Bar
  // const handleProgress = (state: { playedSeconds: number; played: number }) => {
  //   setCurrentTime(state.playedSeconds);
  //   setProgress(state.played * 100);
  // };

  // Format time (MM:SS)
  // const formatTime = (seconds: number) => {
  //   const mins = Math.floor(seconds / 60);
  //   const secs = Math.floor(seconds % 60);
  //   return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  // };

  return (
    <div className="relative w-full mx-auto rounded-lg overflow-hidden shadow-lg">
      {/* Video Player */}
      <ReactPlayer
        ref={playerRef}
        url={url}
        playing={playing}
        controls={true}
        width="100%"
        height="100%"
        // onProgress={handleProgress}
        // onDuration={(d) => setDuration(d)}
      />

      {/* Play/Pause Button */}
      <button
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full w-16 h-16 flex items-center justify-center"
        onClick={togglePlay}
      >

        {playing ? <FaPause size={30} /> : <FaPlay size={30} />}
      </button>

      {/* Progress Bar */}
      {/* <div className="absolute bottom-0 left-0 w-full bg-black/70 text-white px-4 py-2 flex items-center">
        <span className="text-sm">{formatTime(currentTime)}</span>
        <div className="relative w-full h-1 mx-3 bg-gray-400 rounded">
          <div className="absolute top-0 left-0 h-1 bg-red-500 rounded" style={{ width: `${progress}%` }} />
        </div>
        <span className="text-sm">{formatTime(duration)}</span>
        <FaExpand className="ml-3 cursor-pointer" />
      </div> */}
    </div>
  );
};

export default VideoPlayer;
