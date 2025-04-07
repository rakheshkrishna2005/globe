import React, { useState, useEffect, useRef } from 'react';

interface BackgroundMusicProps {
  audioSrc: string;
  autoPlay?: boolean;
}

const BackgroundMusic: React.FC<BackgroundMusicProps> = ({
  audioSrc,
  autoPlay = true,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Handle play/pause
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(err => {
          console.error('Audio playback failed:', err);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Set volume to 100% and auto-play when component mounts (if enabled)
  useEffect(() => {
    if (audioRef.current) {
      // Set volume to 100%
      audioRef.current.volume = 1.0;

      if (autoPlay) {
        // Most browsers require user interaction before playing audio
        // This will attempt to play but may be blocked by browser policies
        audioRef.current.play().catch(() => {
          console.log('Auto-play was prevented. User interaction required.');
          setIsPlaying(false);
        });
      }
    }
  }, [autoPlay]);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <audio
        ref={audioRef}
        src={audioSrc}
        loop
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      {/* Glowing blue music control button */}
      <div className="relative">
        <button
          onClick={togglePlay}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`
            w-14 h-14
            rounded-full
            bg-black/30
            backdrop-blur-md
            border border-blue-400/30
            flex items-center justify-center
            transition-all duration-300
            ${isPlaying
              ? 'shadow-[0_0_10px_3px_rgba(72,182,255,0.3)]'
              : 'shadow-[0_0_20px_8px_rgba(72,182,255,0.5)]'
            }
            ${isHovered ? 'shadow-[0_0_25px_10px_rgba(72,182,255,0.6)]' : ''}
          `}
          aria-label={isPlaying ? "Pause music" : "Play music"}
        >
          {/* Pulsing background effect */}
          <div className={`
            absolute inset-0 rounded-full
            ${isPlaying
              ? 'bg-blue-500/15 animate-pulse-slow'
              : 'bg-blue-500/30 animate-pulse'
            }
          `}></div>

          {/* Outer glow ring */}
          <div className={`
            absolute inset-0 rounded-full
            border border-blue-400/50
            ${isPlaying ? 'scale-105 opacity-40' : 'scale-110 opacity-70'}
            transition-all duration-500
          `}></div>

          {/* Inner content */}
          <div className="relative z-10">
            {isPlaying ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-blue-400">
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-blue-400">
                <path d="M8 5.14v14l11-7-11-7z" />
              </svg>
            )}
          </div>
        </button>

      </div>
    </div>
  );
};

// Note: These animations should be added to your global CSS file
// and not defined here as an unused variable

export default BackgroundMusic;