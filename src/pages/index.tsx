import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Head from 'next/head';
import Globe from '@/components/Globe';
import { Sparkles } from '@/components/Sparkles';
import BackgroundMusic from '@/components/BackgroundMusic';

export default function Home() {
  const [controlState, setControlState] = useState({
    isGithubHovered: false,
    isFullscreenHovered: false,
    isFullscreen: false
  });

  const checkFullscreen = useCallback(() => {
    setControlState(prev => ({
      ...prev,
      isFullscreen: !!document.fullscreenElement
    }));
  }, []);

  useEffect(() => {
    document.addEventListener('fullscreenchange', checkFullscreen);
    return () => {
      document.removeEventListener('fullscreenchange', checkFullscreen);
    };
  }, [checkFullscreen]);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }, []);

  const handleGithubHoverChange = useCallback((isHovered: boolean) => {
    setControlState(prev => ({
      ...prev,
      isGithubHovered: isHovered
    }));
  }, []);

  const handleFullscreenHoverChange = useCallback((isHovered: boolean) => {
    setControlState(prev => ({
      ...prev,
      isFullscreenHovered: isHovered
    }));
  }, []);

  const memoizedGlobe = useMemo(() => <Globe />, []);
  const memoizedSparkles = useMemo(() => (
    <Sparkles
      density={1800}
      speed={1.2}
      color="#48b6ff"
      direction="top"
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  ), []);

  const controlButtons = useMemo(() => {
    const { isGithubHovered, isFullscreenHovered, isFullscreen } = controlState;

    return (
      <div className="fixed bottom-6 left-6 z-50 flex space-x-4">
        {/* GitHub Link Button */}
        <div className="relative">
          <a
            href="https://github.com/rakheshkrishna2005/globe"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => handleGithubHoverChange(true)}
            onMouseLeave={() => handleGithubHoverChange(false)}
            className={`
              w-8 h-8
              rounded-full
              bg-black/30
              backdrop-blur-md
              border border-blue-400/30
              flex items-center justify-center
              transition-all duration-300
              shadow-[0_0_12px_5px_rgba(72,182,255,0.5)]
              ${isGithubHovered ? 'shadow-[0_0_15px_6px_rgba(72,182,255,0.6)]' : ''}
            `}
            aria-label="View on GitHub"
          >
            <div className="absolute inset-0 rounded-full bg-blue-500/30 animate-pulse"></div>
            <div className="absolute inset-0 rounded-full border border-blue-400/50 scale-110 opacity-70 transition-all duration-500"></div>
            <div className="relative z-10">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
            </div>
          </a>
        </div>

        {/* Fullscreen Toggle Button */}
        <div className="relative">
          <button
            onClick={toggleFullscreen}
            onMouseEnter={() => handleFullscreenHoverChange(true)}
            onMouseLeave={() => handleFullscreenHoverChange(false)}
            className={`
              w-8 h-8
              rounded-full
              bg-black/30
              backdrop-blur-md
              border border-blue-400/30
              flex items-center justify-center
              transition-all duration-300
              shadow-[0_0_12px_5px_rgba(72,182,255,0.5)]
              ${isFullscreenHovered ? 'shadow-[0_0_15px_6px_rgba(72,182,255,0.6)]' : ''}
            `}
            aria-label={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
          >
            <div className="absolute inset-0 rounded-full bg-blue-500/30 animate-pulse"></div>
            <div className="absolute inset-0 rounded-full border border-blue-400/50 scale-110 opacity-70 transition-all duration-500"></div>
            <div className="relative z-10">
              {isFullscreen ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
                  <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"></path>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
                  <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>
                </svg>
              )}
            </div>
          </button>
        </div>
      </div>
    );
  }, [controlState, handleGithubHoverChange, handleFullscreenHoverChange, toggleFullscreen]);

  return (
    <>
      <Head>
        <title>Glowbe - Interstellar Experience</title>
      </Head>
      <main className="relative min-h-screen w-full bg-black overflow-hidden">
        {/* Background Sparkles */}
        <div className="absolute inset-0 z-0 [mask-image:radial-gradient(100%_100%,white,transparent)] before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_center,#3273ff,transparent_90%)] before:opacity-40">
          {memoizedSparkles}
        </div>

        {/* Center Globe */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          {memoizedGlobe}
        </div>

        {/* Music */}
        <BackgroundMusic
          audioSrc="/music/interstellar.mp3"
          autoPlay={true}
        />

        {/* Controls */}
        {controlButtons}
      </main>
    </>
  );
}
