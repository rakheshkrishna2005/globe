'use client';
import React, { useEffect, useRef } from 'react';
import createGlobe from 'cobe';
import { cn } from '@/lib/utils';

interface EarthProps {
  className?: string;
  theta?: number;
  dark?: number;
  scale?: number;
  diffuse?: number;
  mapSamples?: number;
  mapBrightness?: number;
  baseColor?: [number, number, number];
  markerColor?: [number, number, number];
  glowColor?: [number, number, number];
}

const Globe: React.FC<EarthProps> = ({
  className,
  theta = 0.25,
  dark = 1,
  scale = 1.1,
  diffuse = 1.2,
  mapSamples = 40000,
  mapBrightness = 6,
  baseColor = [0.4, 0.6509, 1],
  markerColor = [1, 0, 0],
  glowColor = [0.2745, 0.5765, 0.898],
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    let animationFrameId: number = 0;
    let phi = 0;

    const renderGlobe = () => {
      const { width } = container.getBoundingClientRect();
      const globe = createGlobe(canvas, {
        devicePixelRatio: 2,
        width: width * 2,
        height: width * 2,
        phi: 0,
        theta,
        dark,
        scale,
        diffuse,
        mapSamples,
        mapBrightness,
        baseColor,
        markerColor,
        glowColor,
        opacity: 1,
        offset: [0, 0],
        markers: [],
        onRender: (state: Record<string, any>) => {
          state.phi = phi;
          phi += 0.003;
        },
      });

      return globe;
    };

    let globeInstance = renderGlobe();

    const handleResize = () => {
      if (globeInstance) {
        globeInstance.destroy();
      }
      globeInstance = renderGlobe();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      globeInstance?.destroy();
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theta, dark, scale, diffuse, mapSamples, mapBrightness, baseColor, markerColor, glowColor]);

  return (
    <div
      ref={containerRef}
      className={cn(
        'flex items-center justify-center z-[10] w-full max-w-[90vw] sm:max-w-[70vw] md:max-w-[60vw] lg:max-w-[50vw] aspect-square mx-auto',
        className
      )}
    >
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
};

export default Globe;
