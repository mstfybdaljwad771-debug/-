import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { soundEngine } from '../utils/sound';

interface WarpCountdownProps {
  onComplete: () => void;
}

export const WarpCountdown: React.FC<WarpCountdownProps> = ({ onComplete }) => {
  const [currentDay, setCurrentDay] = useState<number>(365);
  const [phase, setPhase] = useState<'counting' | 'message1' | 'message2' | 'ready'>('counting');

  useEffect(() => {
    // Fast rewind animation from 365 down to 1
    let day = 365;
    const interval = setInterval(() => {
      day -= Math.floor(Math.random() * 12) + 6;
      if (day <= 1) {
        day = 1;
        clearInterval(interval);
        setCurrentDay(1);
        soundEngine.playDeepBoom();

        // Sequence of cinematic reveals
        setTimeout(() => {
          setPhase('message1');
          soundEngine.playChime(440);
        }, 800);

        setTimeout(() => {
          setPhase('message2');
          soundEngine.playChime(523.25);
        }, 2600);

        setTimeout(() => {
          setPhase('ready');
          soundEngine.playSuccessChord();
        }, 4400);
      } else {
        setCurrentDay(day);
      }
    }, 45);

    return () => clearInterval(interval);
  }, []);

  const handleEnterStory = () => {
    soundEngine.playSuccessChord();
    soundEngine.playOfficialSong(true);
    onComplete();
  };

  return (
    <div
      id="warp-screen"
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 z-20 select-none overflow-hidden"
    >
      {/* Intense center tunnel glow during warp */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[320px] h-[320px] md:w-[600px] md:h-[600px] rounded-full bg-gradient-to-r from-pink-600/30 to-purple-600/30 blur-[90px] animate-pulse" />
      </div>

      <AnimatePresence mode="wait">
        {phase === 'counting' && (
          <motion.div
            key="counter"
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: [1, 1.05, 1], opacity: 1 }}
            exit={{ scale: 1.5, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center justify-center space-y-4"
          >
            <div className="text-xs uppercase tracking-[0.35em] text-pink-400 font-mono">
              RETURNING TO DAY ZERO
            </div>
            <div className="text-7xl md:text-9xl font-black font-mono tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-pink-200 to-purple-400 drop-shadow-[0_0_35px_rgba(236,72,153,0.8)]">
              {currentDay}
            </div>
            <div className="text-lg md:text-xl font-light text-purple-200 tracking-widest font-['Cairo',sans-serif]">
              {currentDay === 1 ? 'اليوم الأول • 4 سبتمبر 2025' : 'يوم من الذكريات...'}
            </div>
          </motion.div>
        )}

        {phase === 'message1' && (
          <motion.div
            key="msg1"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl px-6 py-8"
          >
            <h2 className="text-3xl md:text-5xl font-black text-white leading-relaxed font-['Cairo',sans-serif]">
              بس السنة دي مش مجرد <span className="text-pink-400">365 يوم</span> عادية..
            </h2>
          </motion.div>
        )}

        {phase === 'message2' && (
          <motion.div
            key="msg2"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl px-6 py-8 space-y-3"
          >
            <h2 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-rose-200 to-purple-400 font-['Cairo',sans-serif]">
              دي 365 يوم من أجمل حكاية عيشتها في حياتي.
            </h2>
            <p className="text-lg text-slate-300 font-light">
              حكاية اتكتبت بحبنا، ضحكنا، وحتى زعلنا اللي بيخلينا نرجع أقوى ❤️
            </p>
          </motion.div>
        )}

        {phase === 'ready' && (
          <motion.div
            key="ready"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl px-6 py-8 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-900/50 border border-purple-500/40 text-purple-200 text-sm">
              <Sparkles className="w-4 h-4 text-pink-400" />
              <span>MUSTAFA × MONA</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-black text-white font-['Cairo',sans-serif] leading-tight">
              سنة واحدة.. ولسه البداية
            </h1>

            <p className="text-base md:text-lg text-slate-300 max-w-lg mx-auto">
              ادخلي شوفي الحكاية بعيوني.. وافتكري كل محطة عدينا عليها مع بعض.
            </p>

            <div className="pt-4">
              <button
                id="btn-enter-main-story"
                onClick={handleEnterStory}
                className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white font-bold text-base shadow-[0_0_30px_rgba(244,63,94,0.5)] hover:shadow-[0_0_45px_rgba(244,63,94,0.8)] transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span>اكتشفي الحكاية</span>
                <ArrowLeft className="w-5 h-5 text-white group-hover:-translate-x-1.5 transition-transform" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
