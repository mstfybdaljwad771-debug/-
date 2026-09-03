import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Brain, CheckCircle2, XCircle, Sparkles, RefreshCw, Trophy } from 'lucide-react';
import { QuizQuestion } from '../types';
import { soundEngine } from '../utils/sound';

const QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'مين اللي أخد خطوة الارتباط الأولى يوم 4/9/2025؟',
    options: [
      {
        text: 'منى (بشجاعتك وخطوتك اللي نورت حياتي)',
        isCorrect: true,
        reaction: 'صح يا قمر! إنتي اللي بدأتي.. وأنا كنت مبهور بيكي وندمان إني مخدتش الخطوة بدري ❤️',
      },
      {
        text: 'مصطفى (كنت متردد وخايف أكون بحلم)',
        isCorrect: false,
        reaction: 'لا غلط يا نصابة! إنتي اللي بدأتي وأنا جريت وراكي في ثواني 😂',
      },
      {
        text: 'تليفون أخوكي اللي قرر يرتبط بالنيابة عننا 😂',
        isCorrect: false,
        reaction: 'تليفون أخوكي صاحب الفضل كله بس إنتي صاحبة القرار الجريء 😂',
      },
    ],
  },
  {
    id: 2,
    question: 'لما صاحبتك كلمتني برقم غريب عشان تختبريني.. قفشت المقلب في قد إيه؟',
    options: [
      {
        text: 'في أقل من دقيقة واحدة لأن خطتكم كانت مكشوفة أوي 😂',
        isCorrect: true,
        reaction: 'بالظبط! قفشتكم في ثواني وموت من الضحك.. محدش يقدر يختبر حب مصطفى ليكي!',
      },
      {
        text: 'صدقت المقلب ووقعت في الفخ',
        isCorrect: false,
        reaction: 'تؤ تؤ! أنا أذكى من كده بكتير.. خطة كحيانة اتكشفت في ثانية 😂',
      },
      {
        text: 'افتكرتها مسابقة كسبت فيها عربية',
        isCorrect: false,
        reaction: 'عربية إيه بس! ده كان مقلب مفضوح من أول مسج 😂',
      },
    ],
  },
  {
    id: 3,
    question: 'لما أكون مخنوق وتيجي تعامليني كأني طفل صغير.. إيه اللي بيحصل؟',
    options: [
      {
        text: 'بتعصب وبستفز أكتر بس في سري دايب في حنيتك وتفهمك 😂❤️',
        isCorrect: true,
        reaction: 'صح مليون في المية! بتعصبني في لحظتها، بس قلبي مبيقدرش يقاوم حنيتك دي.',
      },
      {
        text: 'بهدى وبنام فوراً زي الأطفال',
        isCorrect: false,
        reaction: 'يا ريت! أنا بتعصب الأول شوية بعدين أسلم لقلبك الأبيض 😂',
      },
      {
        text: 'بطلب مصاصة وبسكوت',
        isCorrect: false,
        reaction: 'ناقص أطلب ببرونة 😂 هو أنا أه بتدلع بس مش للدرجة دي!',
      },
    ],
  },
  {
    id: 4,
    question: 'الكلمة السرية الخاصة اللي بنقولها لبعض وسط الضحك؟',
    options: [
      {
        text: '«كحيانه» 😂❤️',
        isCorrect: true,
        reaction: 'أيوة هي دي! كحيانة قلبي اللي بموت فيها وفي عياطها وهزارها.',
      },
      {
        text: '«يا دكتورة»',
        isCorrect: false,
        reaction: 'دكتورة مين! إحنا بتوع الشفرات الشعبية العميقة 😂',
      },
      {
        text: '«يا فندم»',
        isCorrect: false,
        reaction: 'رسميات إيه بعد سنة كاملة! فين كلمة السر بتاعتنا؟ 😂',
      },
    ],
  },
  {
    id: 5,
    question: 'مين أكتر واحد بيحب التاني ومقدر وجوده؟',
    options: [
      {
        text: 'منى بتقول هي.. ومصطفى بيقول: "أنا اللي بعشقك والموقع ده إثباتي" ❤️',
        isCorrect: true,
        reaction: 'وهو ده الإثبات! كل سطر وكل فكرة هنا اتعملت عشان أقولك إني بحبك أكتر مما تتخيلي.',
      },
      {
        text: 'إحنا الاتنين بنحب الأكل أكتر من بعض',
        isCorrect: false,
        reaction: 'الأكل مهم صحيح بس إنتي أغلى من أي حاجة في الدنيا ❤️',
      },
      {
        text: 'تليفون أخوكي اللي لسه شاهد على العصر',
        isCorrect: false,
        reaction: 'تليفون أخوكي يستاهل جايزة نوبل للسلام العاطفي 😂',
      },
    ],
  },
];

export const MemoryQuiz: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [score, setScore] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const currentQ = QUESTIONS[currentIdx];

  const handleSelect = (optIdx: number) => {
    if (selectedOpt !== null) return;
    setSelectedOpt(optIdx);

    const option = currentQ.options[optIdx];
    if (option.isCorrect) {
      soundEngine.playSuccessChord();
      setScore((prev) => prev + 1);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#ff2d75', '#ec4899', '#a855f7', '#ffffff'],
      });
    } else {
      soundEngine.playChime(300);
    }
  };

  const handleNext = () => {
    setSelectedOpt(null);
    if (currentIdx + 1 < QUESTIONS.length) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      setIsCompleted(true);
      confetti({
        particleCount: 100,
        spread: 100,
        origin: { y: 0.5 },
      });
    }
  };

  const resetQuiz = () => {
    setCurrentIdx(0);
    setSelectedOpt(null);
    setScore(0);
    setIsCompleted(false);
  };

  return (
    <section id="memory-quiz-section" className="relative py-16 px-4 max-w-3xl mx-auto z-10">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-950/60 border border-pink-500/30 text-pink-300 text-xs tracking-wider mb-3">
          <Brain className="w-3.5 h-3.5 text-purple-400" />
          <span>فاكرة ولا نسيتي؟ • اختبار الـ 365 يوم</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-black text-white">
          امتحان في <span className="text-pink-400">تاريخ حكايتنا</span> 🧠
        </h2>
        <p className="text-slate-400 text-sm mt-1">
          يلا نختبر ذاكرة مونمون.. هل فاكرة كل تفصيلة زي ما أنا فاكرها؟
        </p>
      </div>

      <div className="p-6 md:p-8 rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-purple-500/30 shadow-[0_15px_40px_rgba(0,0,0,0.6)]">
        {!isCompleted ? (
          <div>
            {/* Progress indicator */}
            <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-4">
              <span>السؤال {currentIdx + 1} من {QUESTIONS.length}</span>
              <span className="text-pink-400 font-bold">النتيجة: {score} نقاط</span>
            </div>
            <div className="w-full h-1.5 bg-slate-800 rounded-full mb-6 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-pink-500 to-purple-500 transition-all duration-300"
                style={{ width: `${((currentIdx + 1) / QUESTIONS.length) * 100}%` }}
              />
            </div>

            {/* Question title */}
            <h3 className="text-xl md:text-2xl font-bold text-white mb-6 leading-relaxed">
              {currentQ.question}
            </h3>

            {/* Options list */}
            <div className="space-y-3 mb-6">
              {currentQ.options.map((opt, oIdx) => {
                const isPicked = selectedOpt === oIdx;
                let btnStyle = 'bg-slate-950/70 border-purple-500/20 text-slate-200 hover:border-pink-500/40';

                if (selectedOpt !== null) {
                  if (opt.isCorrect) {
                    btnStyle = 'bg-emerald-950/60 border-emerald-500/80 text-emerald-200 ring-1 ring-emerald-500';
                  } else if (isPicked) {
                    btnStyle = 'bg-rose-950/60 border-rose-500/80 text-rose-200 ring-1 ring-rose-500';
                  } else {
                    btnStyle = 'bg-slate-950/40 border-slate-800 text-slate-500 opacity-60';
                  }
                }

                return (
                  <button
                    key={oIdx}
                    id={`quiz-opt-${oIdx}`}
                    onClick={() => handleSelect(oIdx)}
                    disabled={selectedOpt !== null}
                    className={`w-full text-right p-4 rounded-xl border font-medium text-sm md:text-base transition-all duration-200 flex items-center justify-between cursor-pointer ${btnStyle}`}
                  >
                    <span>{opt.text}</span>
                    {selectedOpt !== null && (
                      <span className="shrink-0 mr-2">
                        {opt.isCorrect ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                        ) : isPicked ? (
                          <XCircle className="w-5 h-5 text-rose-400" />
                        ) : null}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Feedback & Next Button */}
            <AnimatePresence>
              {selectedOpt !== null && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-xl bg-purple-950/40 border border-purple-500/40 flex flex-col sm:flex-row items-center justify-between gap-4"
                >
                  <p className="text-sm text-purple-200">
                    {currentQ.options[selectedOpt].reaction}
                  </p>
                  <button
                    id="btn-quiz-next"
                    onClick={handleNext}
                    className="shrink-0 px-6 py-2.5 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white font-bold text-sm shadow-md transition-transform active:scale-95 cursor-pointer"
                  >
                    {currentIdx + 1 < QUESTIONS.length ? 'السؤال التالي ←' : 'عرض النتيجة 🏆'}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          /* Quiz Completed Screen */
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-pink-500 to-purple-600 flex items-center justify-center mx-auto shadow-[0_0_25px_rgba(236,72,153,0.5)]">
              <Trophy className="w-8 h-8 text-white" />
            </div>

            <h3 className="text-2xl md:text-3xl font-black text-white">
              مبروك يا أحلى مونمون! 🎉
            </h3>

            <p className="text-pink-300 font-bold text-lg">
              جبتي {score} من {QUESTIONS.length} في امتحان حبنا!
            </p>

            <p className="text-slate-300 text-sm max-w-md mx-auto leading-relaxed">
              سواء جاوبتي صح أو غلط.. المهم إن كل الذكريات دي عشناها سوا بحلوها ومرها، ومحفورة في قلبي طول العمر ❤️
            </p>

            <div className="pt-3">
              <button
                onClick={resetQuiz}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold transition-colors cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                <span>إعادة الاختبار للضحك تاني</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
