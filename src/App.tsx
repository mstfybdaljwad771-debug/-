import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, Compass, Star, Mail, Brain, RotateCcw } from 'lucide-react';
import { JourneyStage } from './types';
import { CosmicBackground } from './components/CosmicBackground';
import { SingularityIntro } from './components/SingularityIntro';
import { WarpCountdown } from './components/WarpCountdown';
import { AudioPlayerControl } from './components/AudioPlayerControl';
import { RelationshipCounter } from './components/RelationshipCounter';
import { StoryTimeline } from './components/StoryTimeline';
import { MonaTraits } from './components/MonaTraits';
import { MemoryQuiz } from './components/MemoryQuiz';
import { SecretConstellation } from './components/SecretConstellation';
import { GrandLetter } from './components/GrandLetter';
import { CinematicVideoHero } from './components/CinematicVideoHero';
import { FixedVideoBackground } from './components/FixedVideoBackground';
import { soundEngine } from './utils/sound';

export default function App() {
  const [stage, setStage] = useState<JourneyStage>('main');

  const handleStartJourney = () => {
    setStage('warp');
  };

  const handleFinishWarp = () => {
    soundEngine.playOfficialSong(true);
    setStage('main');
  };

  const handleRestartJourney = () => {
    soundEngine.playHeartbeat();
    setStage('singularity');
  };

  const scrollToSection = (id: string) => {
    soundEngine.playChime(500);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#05020a] text-slate-100 selection:bg-pink-500 selection:text-white font-['Cairo',sans-serif] relative overflow-x-hidden">
      {/* Fixed Full-Screen Video Background for the entire website */}
      <FixedVideoBackground videoSrc="/hero-video.mp4" />

      {/* Dynamic Cosmic Background Canvas (Overlaid transparently with stars & warp effect) */}
      <CosmicBackground isWarping={stage === 'warp'} warpIntensity={stage === 'warp' ? 1.5 : 0.6} hasVideoBackground={true} />

      <AnimatePresence mode="wait">
        {stage === 'singularity' && (
          <motion.div
            key="stage-singularity"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <SingularityIntro onStart={handleStartJourney} />
          </motion.div>
        )}

        {stage === 'warp' && (
          <motion.div
            key="stage-warp"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <WarpCountdown onComplete={handleFinishWarp} />
          </motion.div>
        )}

        {stage === 'main' && (
          <motion.div
            key="stage-main"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10"
          >
            {/* Audio Control Pill */}
            <AudioPlayerControl />

            {/* Quick Experience Navigation Header */}
            <header className="sticky top-0 z-40 bg-[#05020a]/80 backdrop-blur-lg border-b border-purple-500/20 px-4 py-3">
              <div className="max-w-6xl mx-auto flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-pink-500 to-purple-600 flex items-center justify-center shadow-[0_0_12px_rgba(236,72,153,0.5)]">
                    <Heart className="w-4 h-4 text-white fill-white" />
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-white leading-tight">
                      مصطفى × منى
                    </div>
                    <div className="text-[10px] text-pink-400 font-mono">
                      365 DAYS ANNIVERSARY
                    </div>
                  </div>
                </div>

                {/* Navigation Pills */}
                <nav className="hidden md:flex items-center gap-1 text-xs">
                  <button
                    onClick={() => scrollToSection('relationship-counter-section')}
                    className="px-3 py-1.5 rounded-full hover:bg-purple-950/60 text-slate-300 hover:text-pink-300 transition-colors cursor-pointer"
                  >
                    العداد
                  </button>
                  <button
                    onClick={() => scrollToSection('story-timeline-section')}
                    className="px-3 py-1.5 rounded-full hover:bg-purple-950/60 text-slate-300 hover:text-pink-300 transition-colors cursor-pointer"
                  >
                    المحطات
                  </button>
                  <button
                    onClick={() => scrollToSection('mona-traits-section')}
                    className="px-3 py-1.5 rounded-full hover:bg-purple-950/60 text-slate-300 hover:text-pink-300 transition-colors cursor-pointer"
                  >
                    صفاتك
                  </button>
                  <button
                    onClick={() => scrollToSection('memory-quiz-section')}
                    className="px-3 py-1.5 rounded-full hover:bg-purple-950/60 text-slate-300 hover:text-pink-300 transition-colors cursor-pointer"
                  >
                    الامتحان
                  </button>
                  <button
                    onClick={() => scrollToSection('secret-constellation-section')}
                    className="px-3 py-1.5 rounded-full hover:bg-purple-950/60 text-slate-300 hover:text-pink-300 transition-colors cursor-pointer"
                  >
                    الخزنة السرية
                  </button>
                  <button
                    onClick={() => scrollToSection('grand-letter-section')}
                    className="px-3 py-1.5 rounded-full bg-pink-600/30 border border-pink-500/40 text-pink-200 hover:bg-pink-600/50 transition-colors cursor-pointer"
                  >
                    الرسالة الأخيرة ❤️
                  </button>
                </nav>

                <button
                  onClick={handleRestartJourney}
                  className="p-2 rounded-full bg-slate-900 border border-purple-500/30 text-slate-400 hover:text-pink-400 transition-colors cursor-pointer"
                  title="إعادة تجربة الدخول السينمائي"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </header>

            {/* Main Stage Sections */}
            <main className="space-y-16 pb-24">
              {/* Full-Screen Cinematic Background Video Hero Section */}
              <CinematicVideoHero
                onExploreClick={() => scrollToSection('relationship-counter-section')}
                onLetterClick={() => scrollToSection('grand-letter-section')}
              />

              {/* 1. Live Relationship Counter */}
              <RelationshipCounter />

              {/* 2. Story Timeline */}
              <StoryTimeline />

              {/* 3. Mona's Traits */}
              <MonaTraits />

              {/* 4. Memory Quiz */}
              <MemoryQuiz />

              {/* 5. Secret Constellation Puzzle */}
              <SecretConstellation />

              {/* 6. Grand Master Love Letter & Keepsake Certificate */}
              <GrandLetter />
            </main>

            {/* Aesthetic Footer */}
            <footer className="relative border-t border-purple-500/20 py-8 px-4 text-center text-xs text-slate-500 space-y-2">
              <div className="flex items-center justify-center gap-2 text-slate-400 font-medium">
                <span>مصطفى (ديشا)</span>
                <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-500 animate-pulse" />
                <span>منى (مونمون)</span>
              </div>
              <p className="font-mono text-slate-400">
                4/9/2025 • حكايتنا مستمرة للأبد إن شاء الله
              </p>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
