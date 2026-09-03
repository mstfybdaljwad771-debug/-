import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { KeyRound, Sparkles, Star, Heart, Lock, Unlock } from 'lucide-react';
import { soundEngine } from '../utils/sound';

interface StarNode {
  id: number;
  x: number;
  y: number;
  label: string;
}

const CONSTELLATION_STARS: StarNode[] = [
  { id: 1, x: 20, y: 70, label: 'M' },
  { id: 2, x: 35, y: 30, label: 'O' },
  { id: 3, x: 50, y: 65, label: '❤️' },
  { id: 4, x: 65, y: 30, label: 'N' },
  { id: 5, x: 80, y: 70, label: 'A' },
];

export const SecretConstellation: React.FC = () => {
  const [activatedStars, setActivatedStars] = useState<number[]>([]);
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false);

  const handleStarClick = (id: number) => {
    if (activatedStars.includes(id)) return;
    soundEngine.playChime(400 + id * 80);
    const updated = [...activatedStars, id];
    setActivatedStars(updated);

    if (updated.length === CONSTELLATION_STARS.length) {
      setTimeout(() => {
        soundEngine.playSuccessChord();
        setIsUnlocked(true);
      }, 400);
    }
  };

  const handleReset = () => {
    setActivatedStars([]);
    setIsUnlocked(false);
  };

  return (
    <section id="secret-constellation-section" className="relative py-16 px-4 max-w-4xl mx-auto z-10">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-300 text-xs tracking-wider mb-3">
          <KeyRound className="w-3.5 h-3.5 text-pink-400" />
          <span>كود النجوم السري • لغز للمونمون</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-black text-white">
          كوكبة <span className="text-pink-400">الرسالة المخفية</span> 🌌
        </h2>
        <p className="text-slate-400 text-sm mt-1">
          وصلي نجوم اسمك بالترتيب عشان تفتحي الخزنة السرية للسنة التانية!
        </p>
      </div>

      <div className="relative p-6 md:p-10 rounded-3xl bg-slate-900/60 backdrop-blur-xl border border-purple-500/30 overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.6)]">
        {/* Sky Constellation Canvas Box */}
        <div className="relative h-64 sm:h-72 w-full rounded-2xl bg-[#040108] border border-purple-500/20 overflow-hidden mb-6 flex items-center justify-center">
          {/* Subtle grid and lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {/* Draw lines between activated stars */}
            {CONSTELLATION_STARS.map((star, idx) => {
              if (idx === 0) return null;
              const prev = CONSTELLATION_STARS[idx - 1];
              const isLineActive =
                activatedStars.includes(star.id) && activatedStars.includes(prev.id);
              return (
                <line
                  key={`line-${idx}`}
                  x1={`${prev.x}%`}
                  y1={`${prev.y}%`}
                  x2={`${star.x}%`}
                  y2={`${star.y}%`}
                  stroke={isLineActive ? '#f43f5e' : '#33204a'}
                  strokeWidth={isLineActive ? '2.5' : '1'}
                  strokeDasharray={isLineActive ? 'none' : '4 4'}
                  className="transition-all duration-500"
                />
              );
            })}
          </svg>

          {/* Interactive Stars */}
          {CONSTELLATION_STARS.map((star) => {
            const isLit = activatedStars.includes(star.id);
            return (
              <motion.div
                key={star.id}
                id={`constellation-star-${star.id}`}
                whileHover={{ scale: 1.25 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleStarClick(star.id)}
                style={{ left: `${star.x}%`, top: `${star.y}%` }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 z-10 ${
                  isLit
                    ? 'bg-pink-500 text-white shadow-[0_0_20px_rgba(236,72,153,1)] ring-4 ring-pink-400/40'
                    : 'bg-slate-900 border border-purple-500/40 text-purple-300 hover:border-pink-400'
                }`}
              >
                {isLit ? (
                  <Star className="w-5 h-5 fill-white text-white animate-spin-slow" />
                ) : (
                  <span className="text-xs font-bold font-mono">{star.label}</span>
                )}
              </motion.div>
            );
          })}

          {/* Lock status pill */}
          <div className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/80 border border-purple-500/30 text-xs font-mono text-slate-300">
            {isUnlocked ? (
              <>
                <Unlock className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-300">UNLOCKED</span>
              </>
            ) : (
              <>
                <Lock className="w-3.5 h-3.5 text-pink-400" />
                <span>
                  {activatedStars.length} / {CONSTELLATION_STARS.length} نجوم
                </span>
              </>
            )}
          </div>
        </div>

        {/* Unlocked Content / Vault */}
        <AnimatePresence>
          {isUnlocked ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="p-6 rounded-2xl bg-gradient-to-br from-pink-950/50 via-purple-950/50 to-slate-950/90 border border-pink-500/50 shadow-[0_0_30px_rgba(236,72,153,0.3)] space-y-4"
            >
              <div className="flex items-center gap-2 text-pink-400 font-bold text-lg">
                <Sparkles className="w-5 h-5" />
                <span>الرسالة السرية فُتِحت بنجاح! 💌</span>
              </div>

              <div className="text-slate-200 text-sm md:text-base leading-relaxed space-y-3 font-light">
                <p>
                  يا منى.. لو كنتي وصلتي لهنا، فده معناه إنك صبرتي وحليتي اللغز زي ما بتصبري عليا دايماً.
                </p>
                <p>
                  السنة اللي فاتت كانت أجمل سنة في عمري، والسر اللي عايز أقولهولك هنا هو إن حبي ليكي مش واقف عند الـ 365 يوم دول.. أنا كل يوم بصحى فيه بختارك إنتي، وبكتشف فيكي حاجات بتخليني أتمسك بيكي أكتر.
                </p>
                <p className="text-pink-300 font-medium italic">
                  «وعد مني.. السنة التانية هتكون سنة تحقيق كل اللي بنحلم بيه سوا، وهفضل دايماً ضهرك وسندك وأكتر إنسان بيحبك في الكون كله.»
                </p>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-xs text-slate-400 font-mono">
                  بصمة ديشا السرية • لا تُنسى
                </span>
                <button
                  onClick={handleReset}
                  className="text-xs text-slate-400 hover:text-white transition-colors"
                >
                  إعادة قفل الخزنة
                </button>
              </div>
            </motion.div>
          ) : (
            <div className="text-center py-2 text-xs text-slate-400">
              اضغطي على كل النجوم الخمسة في السماء بالترتيب عشان تشوفي إيه اللي ديشا مخبيه ليكي هنا!
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
