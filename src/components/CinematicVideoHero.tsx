import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles, ChevronDown, Volume2, VolumeX } from 'lucide-react';
import { soundEngine } from '../utils/sound';

interface CinematicVideoHeroProps {
  onExploreClick: () => void;
  onLetterClick: () => void;
}

export const CinematicVideoHero: React.FC<CinematicVideoHeroProps> = ({
  onExploreClick,
  onLetterClick,
}) => {
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);

  // Subscribe to Sound Engine for official song status
  useEffect(() => {
    const unsub = soundEngine.subscribe((state) => {
      setIsAudioPlaying(state.isPlaying && !state.isMuted);
    });
    return unsub;
  }, []);

  const toggleMusic = () => {
    soundEngine.toggleOfficialSong();
  };

  const handleExplore = () => {
    soundEngine.playOfficialSong(true);
    onExploreClick();
  };

  return (
    <section
      id="hero-cinematic-section"
      className="relative w-full min-h-[92vh] sm:min-h-screen flex flex-col justify-between items-center text-center overflow-hidden select-none z-10"
    >
      {/* Soft Vignette Gradients over the hero section for maximum text readability */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        {/* Top subtle fade */}
        <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-[#05020a]/80 via-[#05020a]/30 to-transparent" />

        {/* Center vignette radial overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at 50% 45%, rgba(5, 2, 10, 0.1) 0%, rgba(5, 2, 10, 0.35) 60%, rgba(5, 2, 10, 0.75) 100%)',
          }}
        />

        {/* Bottom subtle transition into the next section */}
        <div className="absolute bottom-0 inset-x-0 h-36 bg-gradient-to-t from-[#05020a]/90 via-[#05020a]/50 to-transparent" />
      </div>

      {/* TOP BAR: Quick song status & badge */}
      <div className="relative z-20 w-full max-w-6xl mx-auto pt-6 px-4 flex items-center justify-between pointer-events-auto">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-pink-500/25 text-[11px] text-pink-300 font-sans">
            <span className="w-2 h-2 rounded-full bg-pink-500 animate-ping inline-block" />
            <span className="font-semibold tracking-wide">365 DAYS ANNIVERSARY</span>
          </div>
        </div>

        {/* Official Song Toggle */}
        <button
          onClick={toggleMusic}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/40 hover:bg-pink-950/50 backdrop-blur-md border border-pink-500/30 text-pink-200 text-xs transition-all cursor-pointer shadow-lg hover:shadow-pink-500/20 font-['Cairo',sans-serif]"
        >
          {isAudioPlaying ? (
            <>
              <Volume2 className="w-3.5 h-3.5 text-pink-400 animate-pulse" />
              <span>الأغنية: خليك فاكرني 🎵</span>
            </>
          ) : (
            <>
              <VolumeX className="w-3.5 h-3.5 text-slate-400" />
              <span>تشغيل الأغنية الرسمية</span>
            </>
          )}
        </button>
      </div>

      {/* HERO MAIN CONTENT */}
      <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 my-auto py-12 flex flex-col items-center">
        {/* Animated Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/15 border border-pink-500/30 backdrop-blur-md text-pink-200 text-xs sm:text-sm font-medium mb-6 shadow-[0_0_20px_rgba(236,72,153,0.3)]"
        >
          <Sparkles className="w-4 h-4 text-pink-400" />
          <span>سنة كاملة.. 365 يوماً من الحب والذكريات</span>
        </motion.div>

        {/* Main Cinema Title */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: 'easeOut' }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-100 via-pink-200 to-purple-100 tracking-tight leading-[1.15] drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)] font-['Cairo',sans-serif]"
        >
          مصطفى & منى
        </motion.h1>

        {/* Romantic Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: 'easeOut' }}
          className="mt-6 text-base sm:text-xl md:text-2xl text-slate-200 font-light max-w-2xl leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]"
        >
          إلى حبيبتي <span className="text-pink-300 font-bold drop-shadow-[0_0_12px_rgba(244,114,182,0.8)]">«مونمون»</span>..
          أجمل صدفة غيرت عمري كله، وأول سنة في رحلة العمر الطويلة سوا.
        </motion.p>

        {/* Date Anchor */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="mt-4 flex items-center gap-3 text-xs sm:text-sm font-mono tracking-widest text-pink-300/80 drop-shadow-[0_1px_8px_rgba(0,0,0,0.8)]"
        >
          <span>4 SEPTEMBER 2025</span>
          <span>•</span>
          <span>365 DAYS OF LOVE</span>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-8 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <button
            onClick={handleExplore}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-pink-600 via-rose-500 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold text-base shadow-[0_0_25px_rgba(236,72,153,0.6)] hover:shadow-[0_0_35px_rgba(236,72,153,0.8)] transition-all transform hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2"
          >
            <Heart className="w-5 h-5 fill-white" />
            <span>اكتشفي الحكاية والذكريات</span>
          </button>

          <button
            onClick={onLetterClick}
            className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/20 hover:border-pink-500/50 text-white font-medium text-base transition-all transform hover:-translate-y-0.5 cursor-pointer shadow-lg"
          >
            رسالتي الخاصة ليكي 💌
          </button>
        </motion.div>
      </div>

      {/* BOTTOM SCROLL INDICATOR */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="relative z-10 pb-8 flex flex-col items-center gap-2 cursor-pointer"
        onClick={handleExplore}
      >
        <span className="text-xs text-slate-300 font-medium tracking-wide drop-shadow-md">
          اسحبي للأسفل لاكتشاف كل الذكريات
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-5 h-5 text-pink-400 drop-shadow-md" />
        </motion.div>
      </motion.div>
    </section>
  );
};
