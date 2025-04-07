import React, { useState } from 'react';
import Head from 'next/head';
import Globe from '@/components/Globe';
import { Sparkles } from '@/components/Sparkles';
import BackgroundMusic from '@/components/BackgroundMusic';

export default function Home() {
  const [isGithubHovered, setIsGithubHovered] = useState(false);

  return (
    <>
      <Head>
        <title>Glowbe - Interstellar Experience</title>
      </Head>
      <div className="min-h-screen flex flex-col items-center justify-center bg-black-900">
        {/* Render Globe */}
        <Globe />

      {/* Render Sparkles as a background or overlay */}
      <div className="absolute inset-0 z-[2] w-screen h-screen overflow-hidden pt-16 pb-16 [mask-image:radial-gradient(100%_100%,white,transparent)] before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_center,#3273ff,transparent_90%)] before:opacity-40 after:absolute">
        <Sparkles
          density={1800}
          speed={1.2}
          color="#48b6ff"
          direction="top"
          className="absolute inset-x-0 bottom-0 h-full w-full"
        />
      </div>

      {/* Background Music Player */}
      <BackgroundMusic
        audioSrc="/music/interstellar.mp3"
        autoPlay={true}
      />

      {/* GitHub Link Button */}
      <div className="fixed bottom-6 left-6 z-50">
        <div className="relative">
          <a
            href="https://github.com/rakheshkrishna2005/globe"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setIsGithubHovered(true)}
            onMouseLeave={() => setIsGithubHovered(false)}
            className={`
              w-14 h-14
              rounded-full
              bg-black/30
              backdrop-blur-md
              border border-blue-400/30
              flex items-center justify-center
              transition-all duration-300
              shadow-[0_0_20px_8px_rgba(72,182,255,0.5)]
              ${isGithubHovered ? 'shadow-[0_0_25px_10px_rgba(72,182,255,0.6)]' : ''}
            `}
            aria-label="View on GitHub"
          >
            {/* Pulsing background effect */}
            <div className="absolute inset-0 rounded-full bg-blue-500/30 animate-pulse"></div>

            {/* Outer glow ring */}
            <div className={`
              absolute inset-0 rounded-full
              border border-blue-400/50
              scale-110 opacity-70
              transition-all duration-500
            `}></div>

            {/* GitHub Logo */}
            <div className="relative z-10">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
            </div>
          </a>
        </div>
      </div>
    </div>
    </>
  );
}
