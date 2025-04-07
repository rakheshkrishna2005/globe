import React, { useState, useEffect, useRef, useMemo } from 'react';

interface BackgroundMusicProps {
  audioSrc: string;
  autoPlay?: boolean;
}

const BackgroundMusic: React.FC<BackgroundMusicProps> = ({
  audioSrc,
  autoPlay = true,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPlayButtonHovered, setIsPlayButtonHovered] = useState(false);
  const [isWavesButtonHovered, setIsWavesButtonHovered] = useState(false);
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

  // Memoize the sound waves animation to prevent re-renders
  const soundWavesButton = useMemo(() => {
    return (
      <div className="relative mr-4">
        <button
          onMouseEnter={() => setIsWavesButtonHovered(true)}
          onMouseLeave={() => setIsWavesButtonHovered(false)}
          className={`
            w-8 h-8
            rounded-full
            bg-black/30
            backdrop-blur-md
            border border-blue-400/30
            flex items-center justify-center
            transition-all duration-300
            ${isPlaying
              ? 'shadow-[0_0_6px_2px_rgba(72,182,255,0.3)]'
              : 'shadow-[0_0_12px_5px_rgba(72,182,255,0.5)]'
            }
            ${isWavesButtonHovered ? 'shadow-[0_0_15px_6px_rgba(72,182,255,0.6)]' : ''}
          `}
          aria-label="Sound waves visualization"
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

          {/* Sound waves animation */}
          <div className="relative z-10 flex items-center justify-center h-4 w-6">
            {isPlaying ? (
              <div className="flex items-end space-x-0.5">
                <div className={`w-0.5 bg-blue-400 rounded-full animate-sound-wave-1 ${isPlaying ? 'h-4' : 'h-0.5'}`}></div>
                <div className={`w-0.5 bg-blue-400 rounded-full animate-sound-wave-2 ${isPlaying ? 'h-2.5' : 'h-0.5'}`}></div>
                <div className={`w-0.5 bg-blue-400 rounded-full animate-sound-wave-3 ${isPlaying ? 'h-5' : 'h-0.5'}`}></div>
                <div className={`w-0.5 bg-blue-400 rounded-full animate-sound-wave-4 ${isPlaying ? 'h-3' : 'h-0.5'}`}></div>
                <div className={`w-0.5 bg-blue-400 rounded-full animate-sound-wave-5 ${isPlaying ? 'h-4' : 'h-0.5'}`}></div>
              </div>
            ) : (
              <div className="flex items-end space-x-0.5">
                <div className="w-0.5 h-0.5 bg-blue-400 rounded-full"></div>
                <div className="w-0.5 h-0.5 bg-blue-400 rounded-full"></div>
                <div className="w-0.5 h-0.5 bg-blue-400 rounded-full"></div>
                <div className="w-0.5 h-0.5 bg-blue-400 rounded-full"></div>
                <div className="w-0.5 h-0.5 bg-blue-400 rounded-full"></div>
              </div>
            )}
          </div>
        </button>
      </div>
    );
  }, [isPlaying, isWavesButtonHovered]);

  // Memoize the play/pause button to prevent re-renders
  const playPauseButton = useMemo(() => {
    return (
      <div className="relative">
        <button
          onClick={togglePlay}
          onMouseEnter={() => setIsPlayButtonHovered(true)}
          onMouseLeave={() => setIsPlayButtonHovered(false)}
          className={`
            w-8 h-8
            rounded-full
            bg-black/30
            backdrop-blur-md
            border border-blue-400/30
            flex items-center justify-center
            transition-all duration-300
            ${isPlaying
              ? 'shadow-[0_0_6px_2px_rgba(72,182,255,0.3)]'
              : 'shadow-[0_0_12px_5px_rgba(72,182,255,0.5)]'
            }
            ${isPlayButtonHovered ? 'shadow-[0_0_15px_6px_rgba(72,182,255,0.6)]' : ''}
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
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-blue-400">
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-blue-400">
                <path d="M8 5.14v14l11-7-11-7z" />
              </svg>
            )}
          </div>
        </button>
      </div>
    );
  }, [isPlaying, isPlayButtonHovered, togglePlay]);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex">
      <audio
        ref={audioRef}
        src={audioSrc}
        loop
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      {/* Sound Waves Button */}
      {soundWavesButton}

      {/* Play/Pause Button */}
      {playPauseButton}
    </div>
  );
};

export default BackgroundMusic;