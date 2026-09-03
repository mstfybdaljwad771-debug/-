import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart, ShieldCheck, Smile, Star, MessageCircleHeart } from 'lucide-react';
import { MonaTrait } from '../types';
import { soundEngine } from '../utils/sound';

const TRAITS: MonaTrait[] = [
  {
    id: 'trait-personality',
    title: 'شخصيتك وأصلك الطيب 🌸',
    subtitle: 'أكتر حاجة بحترمها فيكي',
    description:
      'أدبك، احترامك، حضورك الهادي، وطريقة كلامك.. دي أول حاجات خطفت عيني وعقلي من أول يوم، وحسستني إني لقيت الإنسانة الأصيلة اللي كنت بتمناها من زمان.',
    icon: 'shield',
    secretNote: 'بنت أصول ومتربية على الغالي.. وده مبيتعوضش.',
    color: 'from-pink-500/20 to-purple-900/10 border-pink-500/30 text-pink-400',
  },
  {
    id: 'trait-tolerance',
    title: 'تسامحك الأبيض 🤍',
    subtitle: 'أكتر صفة بحبها وبتدوبني فيكي',
    description:
      'قلبك الأبيض اللي ميعرفش يشيل، وقدرتك على التسامح لما نختلف، وإنك بتفضلي دايماً تبصي لحبنا قبل أي زعل.. ده اللي بيخليني أحس بالأمان معاكي.',
    icon: 'heart',
    secretNote: 'تسامحك ده نعمة بحمد ربنا عليها كل يوم.',
    color: 'from-rose-500/20 to-pink-900/10 border-rose-500/30 text-rose-400',
  },
  {
    id: 'trait-silliness',
    title: 'غبائك اللطيف اللي بيموتني ضحك 😂',
    subtitle: 'أكتر حاجة بتعصبني وبتبسطني في نفس الثانية!',
    description:
      'المواقف العبيطة، والتصرفات التلقائية، وذكائك المفاجئ في المقالب (زي مقلب اختبار الرقم المقفوش 😂).. بتعصبني في لحظتها، بس والله بتخليني أبتسم وأموت ضحك غصب عني!',
    icon: 'smile',
    secretNote: 'عفويتك وغبائك الكيوت هما بهجة أيامي.',
    color: 'from-amber-500/20 to-purple-900/10 border-amber-500/30 text-amber-400',
  },
  {
    id: 'trait-understanding',
    title: 'تفاهمك ووقفتك في ضهري 🤝',
    subtitle: 'أكتر حاجة بتفرحني وتطمني',
    description:
      'لما أكون مضغوط في شغلي أو حياتي، وتستوعبيني وتقفي جنبي وتفهمي اللي في قلبي من غير ما أتكلم كتير.. حسيت معاكي إني مش لوحدي في الدنيا.',
    icon: 'star',
    secretNote: 'وجودك في ضهري هو اللي بيديني القوة أكمل.',
    color: 'from-purple-500/20 to-indigo-900/10 border-purple-500/30 text-purple-400',
  },
  {
    id: 'trait-quote',
    title: '«أنا أكتر واحدة بتحبك وهفضل أحبك» 💌',
    subtitle: 'جملتك اللي محفورة في ذاكرتي',
    description:
      'كل ما بتقوليهالي ببتسم، وبفرح جداً.. بس في الحقيقة أنا اللي بحبك أكتر، ونفسي الموقف ده وكل يوم جاي يثبتلك قد إيه إنتي روحي.',
    icon: 'quote',
    secretNote: 'هتفضلي دايماً إنتي الأولى والأخيرة في قلبي.',
    color: 'from-fuchsia-500/20 to-pink-900/10 border-fuchsia-500/30 text-fuchsia-400',
  },
  {
    id: 'trait-nickname',
    title: '«كحيانه» و«مونمون» 😂❤️',
    subtitle: 'شفراتنا وكلماتنا الخاصة',
    description:
      'من بين كل أسامي الدلع.. "مونمون" هو الاسم الأقرب لنبضي، والكلمة السرية بيننا "كحيانه" اللي بتطلع وسط الضحك والهزار وميفهمهاش غيرنا!',
    icon: 'sparkle',
    secretNote: 'أحلى مونمون في الكون كله، وكحيانة قلبي المفضلة!',
    color: 'from-emerald-500/20 to-purple-900/10 border-emerald-500/30 text-emerald-400',
  },
];

export const MonaTraits: React.FC = () => {
  const [activeTrait, setActiveTrait] = useState<string | null>(null);

  const handleCardClick = (id: string) => {
    soundEngine.playChime(640);
    setActiveTrait(activeTrait === id ? null : id);
  };

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'shield':
        return <ShieldCheck className="w-6 h-6" />;
      case 'heart':
        return <Heart className="w-6 h-6 fill-current" />;
      case 'smile':
        return <Smile className="w-6 h-6" />;
      case 'star':
        return <Star className="w-6 h-6" />;
      case 'quote':
        return <MessageCircleHeart className="w-6 h-6" />;
      default:
        return <Sparkles className="w-6 h-6" />;
    }
  };

  return (
    <section id="mona-traits-section" className="relative py-16 px-4 max-w-5xl mx-auto z-10">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-900/50 border border-purple-500/30 text-purple-300 text-xs tracking-wider mb-3">
          <Heart className="w-3.5 h-3.5 text-pink-400 fill-pink-500/40" />
          <span>منى بعيون مصطفى • تفاصيل مونمون</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-black text-white">
          ليه إنتي بالذات؟ <span className="text-pink-400">صفاتك اللي بعشقها</span>
        </h2>
        <p className="text-slate-400 text-sm md:text-base mt-2 max-w-xl mx-auto">
          اضغطي على أي بطاقة عشان تكشفي السر اللي مكتوب وراها.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {TRAITS.map((t) => {
          const isOpen = activeTrait === t.id;
          return (
            <motion.div
              key={t.id}
              id={`trait-card-${t.id}`}
              layout
              whileHover={{ y: -5 }}
              onClick={() => handleCardClick(t.id)}
              className={`p-6 rounded-2xl bg-gradient-to-b ${t.color} backdrop-blur-md border transition-all duration-300 cursor-pointer flex flex-col justify-between shadow-[0_8px_30px_rgba(0,0,0,0.4)]`}
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-slate-950/60 border border-white/10 flex items-center justify-center mb-4">
                  {renderIcon(t.icon)}
                </div>

                <div className="text-xs font-semibold opacity-75 mb-1">{t.subtitle}</div>
                <h3 className="text-xl font-bold text-white mb-2">{t.title}</h3>
                <p className="text-slate-300 text-sm leading-relaxed font-light mb-4">
                  {t.description}
                </p>
              </div>

              {/* Secret note reveal */}
              <div>
                <button
                  type="button"
                  className="text-xs font-semibold underline underline-offset-4 opacity-80 hover:opacity-100 transition-opacity"
                >
                  {isOpen ? 'إخفاء السر' : 'انقري لكشف سر مصطفى 🤫'}
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-3 p-3 rounded-xl bg-slate-950/80 border border-pink-500/40 text-xs text-pink-300 font-medium leading-normal"
                    >
                      ❤️ {t.secretNote}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
