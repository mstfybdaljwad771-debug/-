import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Heart, Clock, Sparkles, Flame, ShieldAlert, Infinity } from 'lucide-react';
import { soundEngine } from '../utils/sound';

export const RelationshipCounter: React.FC = () => {
  const [timeTogether, setTimeTogether] = useState({
    days: 364,
    hours: 0,
    minutes: 0,
    seconds: 0,
    totalSeconds: 31449600,
  });

  useEffect(() => {
    // Exact relationship start date: 4 September 2025 (4/9/2025)
    const startDate = new Date('2025-09-04T00:00:00').getTime();

    const updateTimer = () => {
      const now = Date.now();
      let diff = now - startDate;

      // Handle if device time is before start date or near 1-year anniversary
      if (diff < 0) {
        // Fallback for devices with older clocks: display 365 days live
        const secondsToday = Math.floor((now % 86400000) / 1000);
        diff = (364 * 86400000) + (secondsToday * 1000);
      }

      const totalSeconds = Math.floor(diff / 1000);
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeTogether({
        days,
        hours,
        minutes,
        seconds,
        totalSeconds,
      });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  const heartbeats = (timeTogether.totalSeconds * 1.25).toLocaleString('ar-EG', {
    maximumFractionDigits: 0,
  });

  return (
    <section id="relationship-counter-section" className="relative py-12 px-4 max-w-5xl mx-auto z-10">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-900/40 border border-purple-500/30 text-purple-300 text-xs tracking-wider mb-3">
          <Clock className="w-3.5 h-3.5 text-pink-400" />
          <span>عداد الحب الحي • منذ 4 سبتمبر 2025</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-white">
          كل ثانية عدت وإنتِ معايا.. <span className="text-pink-400">كانت عمر جديد</span>
        </h2>
        <p className="text-slate-400 text-sm md:text-base mt-2 max-w-xl mx-auto">
          العداد ده مبيحسبش بس وقت.. ده بيحسب نبضات قلب، وضحكات، ومواقف حفرت مكانها جوانا.
        </p>
      </div>

      {/* Main Clock Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6 mb-8">
        {[
          { label: 'يــوم', value: timeTogether.days, color: 'from-pink-500/20 to-pink-900/10', border: 'border-pink-500/40', text: 'text-pink-400' },
          { label: 'سـاعـة', value: timeTogether.hours, color: 'from-purple-500/20 to-purple-900/10', border: 'border-purple-500/40', text: 'text-purple-400' },
          { label: 'دقيقـة', value: timeTogether.minutes, color: 'from-rose-500/20 to-rose-900/10', border: 'border-rose-500/40', text: 'text-rose-400' },
          { label: 'ثانيـة', value: timeTogether.seconds, color: 'from-fuchsia-500/20 to-fuchsia-900/10', border: 'border-fuchsia-500/40', text: 'text-fuchsia-400' },
        ].map((item, idx) => (
          <motion.div
            key={item.label}
            id={`counter-card-${idx}`}
            whileHover={{ y: -4, scale: 1.02 }}
            className={`relative p-5 rounded-2xl bg-gradient-to-b ${item.color} backdrop-blur-md border ${item.border} text-center flex flex-col items-center justify-center shadow-[0_8px_30px_rgba(0,0,0,0.4)]`}
          >
            <div className={`text-4xl md:text-6xl font-black font-mono ${item.text} tracking-tight drop-shadow-[0_0_15px_rgba(236,72,153,0.3)]`}>
              {String(item.value).padStart(2, '0')}
            </div>
            <div className="text-xs md:text-sm font-medium text-slate-300 mt-2 tracking-wide">
              {item.label}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Secondary Insight Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          whileHover={{ y: -3 }}
          onClick={() => soundEngine.playHeartbeat()}
          className="p-4 rounded-xl bg-slate-900/60 border border-pink-500/20 flex items-center gap-4 cursor-pointer hover:border-pink-500/50 transition-colors"
        >
          <div className="w-12 h-12 rounded-lg bg-pink-500/10 border border-pink-500/30 flex items-center justify-center shrink-0">
            <Heart className="w-6 h-6 text-pink-400 fill-pink-500/20 animate-pulse" />
          </div>
          <div>
            <div className="text-xs text-slate-400">نبضات قلب دقت باسمك</div>
            <div className="text-lg font-bold text-pink-300 font-mono">
              + {heartbeats} نبضة
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -3 }}
          className="p-4 rounded-xl bg-slate-900/60 border border-purple-500/20 flex items-center gap-4 hover:border-purple-500/50 transition-colors"
        >
          <div className="w-12 h-12 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center shrink-0">
            <ShieldAlert className="w-6 h-6 text-purple-400" />
          </div>
          <div>
            <div className="text-xs text-slate-400">أيام البعد اللي انتصرنا عليها</div>
            <div className="text-lg font-bold text-purple-300">
              20+ يوم أثبتوا إننا لبعض
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -3 }}
          className="p-4 rounded-xl bg-slate-900/60 border border-rose-500/20 flex items-center gap-4 hover:border-rose-500/50 transition-colors"
        >
          <div className="w-12 h-12 rounded-lg bg-rose-500/10 border border-rose-500/30 flex items-center justify-center shrink-0">
            <Infinity className="w-6 h-6 text-rose-400" />
          </div>
          <div>
            <div className="text-xs text-slate-400">رصيد حبنا للسنة التانية</div>
            <div className="text-lg font-bold text-rose-300 flex items-center gap-1">
              <span>بلا نهاية</span>
              <Sparkles className="w-4 h-4 text-pink-400" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
