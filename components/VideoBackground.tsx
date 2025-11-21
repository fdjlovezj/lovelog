
import React from 'react';

const VideoBackground: React.FC = () => {
  // 使用 raw.githubusercontent.com 链接以确保视频能直接播放
  // 原链接: https://github.com/fdjlovezj/fdjlovezj/blob/main/06d7a3887fdc2e0d25c5aec047ece9fa.mp4
  const videoUrl = "https://raw.githubusercontent.com/fdjlovezj/fdjlovezj/main/06d7a3887fdc2e0d25c5aec047ece9fa.mp4";

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-rose-950">
      {/* 暖色调遮罩，使背景不那么死板的黑色 */}
      <div className="absolute inset-0 bg-rose-900/30 z-10 backdrop-blur-[2px] mix-blend-multiply" />
      <div className="absolute inset-0 bg-black/20 z-10" />
      
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto object-cover -translate-x-1/2 -translate-y-1/2 opacity-80"
      >
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoBackground;