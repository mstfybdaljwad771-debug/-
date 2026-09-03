import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Heart } from 'lucide-react';
import { soundEngine } from '../utils/sound';

interface SingularityIntroProps {
  onStart: () => void;
}

export const SingularityIntro: React.FC<SingularityIntroProps> = ({ onStart }) => {
  const handleLaunch = () => {
    soundEngine.playHeartbeat();
    soundEngine.playWarpEffect();
    soundEngine.startBackgroundMusic();
    onStart();
  };

  return (
    <div
      id="singularity-screen"
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 z-10 select-none overflow-hidden"
    >
      {/* Background radial glow */}
      <div className="absolute w-[360px] h-[360px] md:w-[540px] md:h-[540px] rounded-full bg-gradient-to-tr from-purple-900/30 via-pink-600/20 to-transparent blur-3xl pointer-events-none animate-pulse" />

      {/* Pulsing Singularity Black Hole Orb */}
      <motion.div
        id="singularity-orb"
        className="relative mb-10 cursor-pointer"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: [0.95, 1.05, 0.95], opacity: 1 }}
        transition={{
          scale: { duration: 3.5, repeat: Infinity, ease: 'easeInOut' },
          opacity: { duration: 1.2 },
        }}
        onClick={handleLaunch}
      >
        {/* Outer accretion ring */}
        <div className="w-28 h-28 md:w-36 md:h-36 rounded-full border border-pink-500/40 p-1 flex items-center justify-center shadow-[0_0_50px_rgba(236,72,153,0.4)] animate-[spin_12s_linear_infinite]">
          <div className="w-full h-full rounded-full border border-purple-400/40 p-1">
            <div className="w-full h-full rounded-full border-t-2 border-pink-400" />
          </div>
        </div>

        {/* Center core: Deep Void with glowing heart icon */}
        <div className="absolute inset-0 m-auto w-20 h-20 md:w-24 md:h-24 rounded-full bg-[#05020a] border border-pink-500/80 flex items-center justify-center shadow-[0_0_35px_rgba(244,63,94,0.6)]">
          <Heart className="w-8 h-8 text-pink-400 fill-pink-500/30 animate-pulse" />
        </div>
      </motion.div>

      {/* Titles & Typography */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="max-w-xl mx-auto space-y-4"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-300 text-xs tracking-widest font-sans">
          <Sparkles className="w-3.5 h-3.5 text-pink-400" />
          <span>365 DAYS • OUR STORY</span>
        </div>

        <h1
          id="main-names-title"
          className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-rose-300 to-purple-400 font-['Cairo',sans-serif] tracking-wide"
        >
          مصطفى × منى
        </h1>

        <p className="text-lg md:text-xl text-slate-300 font-light leading-relaxed">
          يا <span className="text-pink-400 font-semibold">مونمون</span>..
          جاهزة نفتكر كل ثانية في أول سنة عدت بيننا؟
        </p>

        <p className="text-sm text-slate-400 font-normal">
          عندي ليكي رحلة صغيرة هتاخدك جوه تفاصيل ميعرفهاش غيرنا.. مستعدة؟
        </p>
      </motion.div>

      {/* Start Button */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="mt-8"
      >
        <button
          id="btn-start-journey"
          onClick={handleLaunch}
          className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold text-base shadow-[0_0_25px_rgba(236,72,153,0.45)] hover:shadow-[0_0_40px_rgba(236,72,153,0.7)] transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer"
        >
          <span>ابدئي الرحلة</span>
          <Heart className="w-5 h-5 text-white fill-white group-hover:scale-125 transition-transform duration-300" />
        </button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="mt-12 text-xs text-slate-400 font-mono tracking-wider"
      >
        4 SEPTEMBER 2025 → TODAY & FOREVER
      </motion.div>
    </div>
  );
};
