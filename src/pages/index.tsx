import React from 'react';
import Head from 'next/head';
import Globe from '@/components/Globe';
import { Sparkles } from '@/components/Sparkles';
import BackgroundMusic from '@/components/BackgroundMusic';

export default function Home() {
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
        audioSrc="/music/background-music.mp3"
        autoPlay={true}
      />
    </div>
    </>
  );
}
