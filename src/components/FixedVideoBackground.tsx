import React, { useRef, useEffect, useState } from 'react';

interface FixedVideoBackgroundProps {
  videoSrc?: string;
}

export const FixedVideoBackground: React.FC<FixedVideoBackgroundProps> = ({
  videoSrc = '/hero-video.mp4',
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [clarityMode, setClarityMode] = useState<'vivid' | 'soft'>('vivid');

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.volume = 0;
    video.playsInline = true;
    video.setAttribute('muted', '');
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');

    const tryPlay = () => {
      try {
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => setIsLoaded(true))
            .catch(() => {
              // Autoplay policy fallback: will play on first interaction
            });
        }
      } catch {
        // Safe failover
      }
    };

    tryPlay();

    const handleInteraction = () => {
      if (video) {
        tryPlay();
      }
    };

    window.addEventListener('click', handleInteraction, { once: true });
    window.addEventListener('touchstart', handleInteraction, { once: true });
    window.addEventListener('scroll', handleInteraction, { once: true });

    return () => {
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
      window.removeEventListener('scroll', handleInteraction);
    };
  }, [videoSrc]);

  return (
    <div
      id="fixed-video-background-layer"
      className="fixed inset-0 w-full h-full pointer-events-none overflow-hidden z-0"
      aria-hidden="true"
    >
      {/* 1. Main Background Video (Fixed behind the entire site) */}
      {!hasError && (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onCanPlay={() => setIsLoaded(true)}
          onLoadedData={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className="absolute inset-0 w-full h-full object-cover object-center transform scale-100 transition-opacity duration-700 pointer-events-none"
          style={{
            opacity: 0.9,
            filter: 'brightness(0.95) contrast(1.05)',
          }}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      )}

      {/* 2. Sleek Vignette Tint to preserve text legibility without burying the video */}
      <div
        className="absolute inset-0 transition-opacity duration-500 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(5, 2, 10, 0.1) 0%, rgba(5, 2, 10, 0.35) 70%, rgba(5, 2, 10, 0.65) 100%)',
        }}
      />

      {/* 3. Subtle Warm Romantic Glow Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-950/20 via-transparent to-[#05020a]/70 pointer-events-none" />
    </div>
  );
};
