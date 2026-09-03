import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import {
  Heart,
  Sparkles,
  Award,
  Upload,
  Image as ImageIcon,
  Check,
  Send,
  Mail,
  FileHeart,
} from 'lucide-react';
import { MemoryPhoto } from '../types';
import { soundEngine } from '../utils/sound';

const DEFAULT_PHOTOS: MemoryPhoto[] = [
  {
    id: 'photo-1',
    title: 'أول ليلة تكلمنا فيها',
    caption: 'الشات العادي اللي غير مجرى كل أيامي',
    date: 'أغسطس 2025',
    placeholderBg: 'from-pink-900/40 to-purple-900/40',
  },
  {
    id: 'photo-2',
    title: '4 سبتمبر 2025',
    caption: 'تاريخ بداية حكايتنا الحقيقية وعقد القلوب',
    date: '4/9/2025',
    placeholderBg: 'from-purple-900/40 to-indigo-900/40',
  },
  {
    id: 'photo-3',
    title: 'ضحكتنا وسط التعب',
    caption: 'لما بنهون على بعض ضغوط الأيام والمشاغل',
    date: 'شتاء 2025',
    placeholderBg: 'from-rose-900/40 to-pink-900/40',
  },
  {
    id: 'photo-4',
    title: 'يوم الرجوع بعد الـ 20 يوم',
    caption: 'أعظم يوم اتأكدنا فيه إن البعد مستحيل يفرقنا',
    date: 'مارس 2026',
    placeholderBg: 'from-fuchsia-900/40 to-purple-900/40',
  },
];

export const GrandLetter: React.FC = () => {
  const [isLetterOpen, setIsLetterOpen] = useState<boolean>(true);
  const [photos, setPhotos] = useState<MemoryPhoto[]>(DEFAULT_PHOTOS);
  const [customPromise, setCustomPromise] = useState<string>('');
  const [savedPromise, setSavedPromise] = useState<string>(
    'أوعدك إني هفضل دايماً سندك وراحتك، وأحبك في كل يوم كأنه أول يوم بيننا ❤️'
  );
  const [isPromiseSaved, setIsPromiseSaved] = useState<boolean>(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    const reader = new FileReader();
    reader.onload = () => {
      soundEngine.playSuccessChord();
      const newPhoto: MemoryPhoto = {
        id: `uploaded-${Date.now()}`,
        title: 'ذكرى جديدة مننا',
        caption: 'صورة من أرشيف حبنا الغالي',
        date: 'اليوم ودائماً',
        imageUrl: reader.result as string,
        placeholderBg: 'from-pink-950 to-purple-950',
      };
      setPhotos((prev) => [newPhoto, ...prev]);
      confetti({
        particleCount: 40,
        spread: 60,
      });
    };
    reader.readAsDataURL(file);
  };

  const handleSavePromise = () => {
    if (!customPromise.trim()) return;
    soundEngine.playSuccessChord();
    setSavedPromise(customPromise);
    setIsPromiseSaved(true);
    confetti({
      particleCount: 70,
      spread: 80,
    });
    setTimeout(() => setIsPromiseSaved(false), 3000);
  };

  const triggerHeartExplosion = () => {
    soundEngine.playHeartbeat();
    confetti({
      particleCount: 120,
      spread: 120,
      origin: { y: 0.6 },
      colors: ['#ff2d75', '#ec4899', '#a855f7', '#ffffff'],
    });
  };

  return (
    <section id="grand-letter-section" className="relative py-20 px-4 max-w-4xl mx-auto z-10">
      {/* Climax Header */}
      <div className="text-center mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-950/60 border border-pink-500/30 text-pink-300 text-xs tracking-wider mb-3">
          <Mail className="w-3.5 h-3.5 text-purple-400" />
          <span>الرسالة الختامية • الموقف الحقيقي</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-black text-white">
          الموقف اللي بيثبت <span className="text-pink-400">حبي ليكي</span>
        </h2>
        <p className="text-slate-300 text-sm md:text-base mt-3 max-w-xl mx-auto leading-relaxed">
          «أنا مش بعرف أعبّر عن حبي ليكي بالكلام.. بس الموقع ده هو الموقف اللي اتعمل مخصوص ليكي عشان أثبتلك قد إيه إنتي غالية.»
        </p>
      </div>

      {/* The Master Love Letter Card */}
      <div className="relative mb-16">
        <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-pink-600 via-rose-500 to-purple-600 blur-lg opacity-40 animate-pulse" />

        <div className="relative p-7 sm:p-10 rounded-3xl bg-slate-950/90 border border-pink-500/40 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
          {/* Header of Letter */}
          <div className="flex items-center justify-between border-b border-pink-500/20 pb-5 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-pink-500/20 border border-pink-500/40 flex items-center justify-center">
                <Heart className="w-5 h-5 text-pink-400 fill-pink-500/30" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">من: مصطفى (ديشا)</h3>
                <p className="text-xs text-pink-300">إلى: مونمون (أغلى إنسانة في حياتي)</p>
              </div>
            </div>
            <div className="text-left font-mono text-xs text-slate-400">
              <div>365 DAYS ANNIVERSARY</div>
              <div className="text-pink-400">4 SEPTEMBER 2025 → 2026</div>
            </div>
          </div>

          {/* Letter Body */}
          <div className="text-slate-200 text-base md:text-lg leading-loose space-y-4 font-light">
            <p>
              <strong className="text-pink-400 font-bold">حبيبتي منى..</strong>
            </p>
            <p>
              كل سنة وإنتي معايا، وكل سنة وإنتي منورة دنيتي. لما فكرت أعملك مفاجأة السنة دي، قولت مش هجيب حاجة عادية ولا هكتب كلمتين وخلاص.. كان لازم أعمل حاجة تكون من صنع إيدي وتعب قلبي، عشان تكون شاهدة على كل لحظة عشناها مع بعض في الـ 365 يوم اللي فاتوا.
            </p>
            <p>
              أنا عارف إني ساعات بكون مش عارف أعبّر بالكلام الحلو، وساعات بكون مضغوط وعصبي، وساعات لما بتطبطبي عليا زي الأطفال بتعصب أكتر 😂.. بس وربنا شاهد عليا، ما في يوم عدى إلا ومكانتك بتكبر في قلبي أكتر وأكتر.
            </p>
            <p>
              السنة دي كانت من أسعد سنين حياتي لأنك كنتي فيها. من أول الشات البسيط اللي كان من تليفون أخوكي، ليوم 4/9 لما شجاعتك بدأت حكايتنا، لمقالبك اللي بتقفشها في دقيقة، لليالي الـ 20 يوم الصعبة اللي حسستني إن الدنيا من غيرك ملهاش لا طعم ولا لون.
            </p>
            <p className="p-4 rounded-2xl bg-gradient-to-r from-pink-950/40 to-purple-950/40 border border-pink-500/30 text-pink-200 font-medium">
              «بحبك يا مونمون.. بحترم أصلك وتربيتك، وبعشق طيبة قلبك وتسامحك، وحتى غبائك اللي بيموتني ضحك. وجودك جنبي هو أكبر مكسب طلع بيه ديشا من الدنيا دي كلها.»
            </p>
            <p className="text-left font-semibold text-pink-400 pt-2">
              — حبيبك، ديشا ❤️
            </p>
          </div>

          {/* Action button in letter */}
          <div className="mt-8 pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <button
              onClick={triggerHeartExplosion}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-pink-600 hover:bg-pink-500 text-white font-bold text-sm shadow-[0_0_20px_rgba(236,72,153,0.5)] transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Heart className="w-4 h-4 fill-white" />
              <span>إرسال نبضات حب لـ ديشا ❤️</span>
            </button>

            <span className="text-xs text-slate-400 font-mono">
              VERIFIED WITH LOVE • 100% UNCONDITIONAL
            </span>
          </div>
        </div>
      </div>

      {/* Memory Polaroid Gallery with Photo Uploader */}
      <div className="mb-16">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-2xl font-bold text-white">معرض ذكرياتنا 📸</h3>
            <p className="text-xs sm:text-sm text-slate-400">
              تقدري تضيفي صوركم الخاصة هنا في أي وقت عشان تحتفظوا بيها سوا!
            </p>
          </div>

          <label
            htmlFor="photo-upload-input"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-900/60 hover:bg-purple-800/80 border border-purple-500/40 text-purple-200 text-xs font-semibold cursor-pointer transition-colors"
          >
            <Upload className="w-4 h-4 text-pink-400" />
            <span>إضافة صورة لينا 💖</span>
            <input
              id="photo-upload-input"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileUpload}
            />
          </label>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {photos.map((p) => (
            <motion.div
              key={p.id}
              whileHover={{ y: -6, rotate: Math.random() > 0.5 ? 1 : -1 }}
              className="p-3 bg-slate-900/90 border border-purple-500/20 rounded-2xl shadow-lg flex flex-col justify-between"
            >
              <div className="w-full h-44 rounded-xl overflow-hidden bg-[#0a0515] border border-white/5 flex items-center justify-center relative">
                {p.imageUrl ? (
                  <img
                    src={p.imageUrl}
                    alt={p.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div
                    className={`w-full h-full bg-gradient-to-tr ${p.placeholderBg} flex flex-col items-center justify-center p-4 text-center`}
                  >
                    <ImageIcon className="w-8 h-8 text-pink-400/70 mb-2" />
                    <span className="text-xs text-pink-200/80 font-medium">
                      {p.title}
                    </span>
                  </div>
                )}
                <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-black/70 text-[10px] text-slate-300 font-mono">
                  {p.date}
                </span>
              </div>

              <div className="mt-3 px-1">
                <h4 className="text-sm font-bold text-white truncate">{p.title}</h4>
                <p className="text-xs text-slate-400 mt-0.5 line-clamp-2">{p.caption}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Year Two Promise & Certificate */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-purple-950/40 via-slate-950/70 to-slate-950 border border-purple-500/40 text-center">
        <div className="w-14 h-14 rounded-2xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center mx-auto mb-4">
          <Award className="w-8 h-8 text-pink-400" />
        </div>

        <h3 className="text-2xl sm:text-3xl font-black text-white mb-2">
          وثيقة وعهد السنة الثانية 📜
        </h3>
        <p className="text-slate-300 text-xs sm:text-sm max-w-md mx-auto mb-6">
          توثيق رسمي لمرور 365 يوماً من الحب الصادق، وتجديد العهد لسنين جاية طويلة سوا.
        </p>

        {/* Current Active Promise Box */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-pink-500/30 max-w-xl mx-auto mb-6 text-pink-200 text-sm md:text-base font-medium">
          « {savedPromise} »
        </div>

        {/* Custom Promise Writer */}
        <div className="max-w-md mx-auto space-y-3">
          <div className="flex gap-2">
            <input
              type="text"
              value={customPromise}
              onChange={(e) => setCustomPromise(e.target.value)}
              placeholder="اكتبي أو اكتب وعد جديد للسنة التانية.."
              className="flex-1 px-4 py-2.5 rounded-xl bg-slate-900 border border-purple-500/30 text-white text-xs sm:text-sm placeholder-slate-500 focus:outline-none focus:border-pink-500"
            />
            <button
              onClick={handleSavePromise}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer shrink-0"
            >
              <Send className="w-3.5 h-3.5" />
              <span>تثبيت الوعد</span>
            </button>
          </div>

          {isPromiseSaved && (
            <div className="text-xs text-emerald-400 font-semibold flex items-center justify-center gap-1">
              <Check className="w-3.5 h-3.5" />
              <span>تم حفظ الوعد في سجل القلوب بنجاح!</span>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-xs text-slate-400 gap-2">
          <span>صُنِع بكل حب بواسطة: مصطفى (ديشا) ❤️</span>
          <span>مهداة إلى: منى (مونمون) • 4/9/2025</span>
        </div>
      </div>
    </section>
  );
};
