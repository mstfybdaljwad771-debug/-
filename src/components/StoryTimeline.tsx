import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MessageSquare,
  Heart,
  PhoneCall,
  Clock,
  Laugh,
  Flame,
  Baby,
  ChevronDown,
  Sparkles,
  Quote,
} from 'lucide-react';
import { TimelineStation } from '../types';
import { soundEngine } from '../utils/sound';

const STATIONS: TimelineStation[] = [
  {
    id: 'station-1',
    number: '01',
    tag: 'البداية الصدفة',
    title: 'شات عادي.. وتليفون أخوكي 📱',
    subtitle: 'لما كل حاجة بدأت بأبسط مما نتخيل',
    dateStr: 'أغسطس 2025',
    description:
      'كنا بنتكلم في شات عادي جداً، وكنتي بتردي عليا من تليفون أخوكي.. مكنتش متوقع إن الرسائل البسيطة دي هتكون بداية أهم وأجمل فصل في حياتي كلها.',
    quote: 'ساعات صدفة صغيرة من غير ترتيب بتكون هي كل الخير اللي مستنيه.',
    mustafaThought: 'من أول شات حسيت بروحك وطاقتك المختلفة اللي خطفتني.',
    iconType: 'chat',
    badgeColor: 'border-pink-500/40 text-pink-300 bg-pink-500/10',
  },
  {
    id: 'station-2',
    number: '02',
    tag: 'يوم العمر',
    title: '4/9/2025 — اليوم اللي ارتبطنا فيه ❤️',
    subtitle: 'خطوتك الجريئة وبداية الحكاية الحقيقية',
    dateStr: '4 سبتمبر 2025',
    description:
      'اليوم ده محفور في قلبي ثانية بثانية.. وإنتي اللي بدأتي خطوة الارتباط! في اللحظة دي اتأكدت إني لقيت الإنسانة اللي كنت بتمناها من سنين: أدب، واحترام، وطيبة، وحب حقيقي. الحاجة الوحيدة اللي ندمان عليها إني مخدتش الخطوة دي بدري.',
    quote: 'من يوم 4/9 وحياتي بقى ليها طعم ومعنى تاني خالص.',
    mustafaThought: 'كنت مبهور بيكي وبشخصيتك، وحسيت إني فزت بأغلى إنسانة.',
    iconType: 'heart',
    badgeColor: 'border-purple-500/40 text-purple-300 bg-purple-500/10',
  },
  {
    id: 'station-3',
    number: '03',
    tag: 'مقلب مقفوش',
    title: 'اختبار الرقم.. والذكاء الفائق 😂',
    subtitle: 'لما اديتي رقمي لصاحبتك عشان تختبريني!',
    dateStr: 'أكتوبر 2025',
    description:
      'لما فكرتي تختبريني واديتي رقمي لصاحبتك عشان تكلمني برقم غريب.. والنتيجة؟ قفشت المقلب في أقل من دقيقة واحدة! وطلعتوا أذكياء أوي في خطتكم العبقرية 😂 وفضلنا نضحك عليها.',
    quote: 'مفيش حد يقدر يختبر قلبي، لأن قلبي مقفول عليكي إنتي وبس.',
    mustafaThought: 'قفشتكم في ثواني وموت من الضحك على طيبتكم!',
    iconType: 'phone',
    badgeColor: 'border-amber-500/40 text-amber-300 bg-amber-500/10',
  },
  {
    id: 'station-4',
    number: '04',
    tag: 'عايزاني 24/7',
    title: '«إنت مشغول ليه؟» ⏰',
    subtitle: 'حبك اللي عايزني معاكي في كل دقيقة',
    dateStr: 'نوفمبر 2025',
    description:
      'لما كنت ببقى مضغوط في الشغل ومش فاضي، وكنتي عايزاني أكلمك علطول وتزعلي لو اتأخرت.. صحيح كنت بتزنق، بس في الحقيقة اهتمامك ده وخوفك عليا كان بيهون عليا تعب اليوم كله.',
    quote: 'حتى وأنا في عز مشغولي، صوتك ورسالتك هما اللي بيرجعوا طاقتي.',
    mustafaThought: 'كنت ببقى فرحان بغيرتك واهتمامك حتى لو كنت مزنوق في الوقت.',
    iconType: 'clock',
    badgeColor: 'border-blue-500/40 text-blue-300 bg-blue-500/10',
  },
  {
    id: 'station-5',
    number: '05',
    tag: 'ذكرى طريفة',
    title: 'أول «هاتِ بوسة».. والرد الصادم 😅',
    subtitle: 'موقف من البدايات مستحيل أنساه',
    dateStr: 'ديسمبر 2025',
    description:
      'أول مرة جربت أقولهالك فيها.. ردك وقتها كان صدمة وزعلني منك جامد 😂 لكن دلوقتي لما بنفتكره مع بعض بنموت من الضحك، وبنشوف إزاي كنا لسه بنتعرف وبنرسم حدودنا مع بعض.',
    quote: 'الذكريات العبيطة دي هي ملح العلاقة اللي بيخلي ليها طعم وروح.',
    mustafaThought: 'وقتها اتضايقت شوية، بس دلوقتي بعتبرها من ألطف مواقفنا.',
    iconType: 'smile',
    badgeColor: 'border-rose-500/40 text-rose-300 bg-rose-500/10',
  },
  {
    id: 'station-6',
    number: '06',
    tag: 'أصعب اختبار وانتصارنا',
    title: '13/2 وما بعدها.. 20 يوم من الشوق 💔❤️',
    subtitle: '«كان ممكن الحكاية متبدأش أو تقف هنا..»',
    dateStr: '13 فبراير 2026',
    description:
      'أصعب محطة مرت علينا في السنة.. حصل موقف وقربنا من الانفصال، وبعدنا أكتر من 20 يوم كاملين. في الفترة دي مكنتيش بتفارقي تفكيري لحظة واحدة. ولما رجعنا لبعض، حسيت بالروح رجعتلي، وتأكدت إن حبنا أكبر من أي زعل أو مسافات.',
    quote: 'البعد بيثبت للناس العاديين إنهم مكملينش.. لكن إحنا أثبتلنا إننا منقدرش نعيش غير لبعض.',
    mustafaThought: 'أكتر لحظة فرحت فيها في السنة كلها لما رجعنا لبعض وإيدينا في إيدين بعض.',
    iconType: 'storm',
    badgeColor: 'border-red-500/40 text-red-300 bg-red-500/10',
  },
  {
    id: 'station-7',
    number: '07',
    tag: 'حنيتك وتفهمك',
    title: 'لما أكون مخنوق.. وتتعاملي كأني طفل 🍼❤️',
    subtitle: 'التناقض اللطيف بين العصبية والحب',
    dateStr: 'دايماً ومستمر',
    description:
      'لما بكون مضايق أو مخنوق وتيجي تحاولي تهديني بطريقة حنونة أوي وكأني طفل صغير.. بتستفزيني وبتعصبيني أكتر في ساعتها 😂 بس في سري وجوه قلبي ببقى دايب في حنيتك وتفهمك ومسامحتك ليا.',
    quote: 'مفيش حد في الدنيا بيعرف يطبطب على قلبي ولا يفهم تقلباتي زيك.',
    mustafaThought: 'أكتر حاجة بحبها فيكي: طيبة قلبك وتسامحك اللي ملوش حدود.',
    iconType: 'baby',
    badgeColor: 'border-pink-500/40 text-pink-300 bg-pink-500/10',
  },
];

export const StoryTimeline: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string>('station-2');

  const toggleExpand = (id: string) => {
    soundEngine.playChime(580);
    setExpandedId(expandedId === id ? '' : id);
  };

  const getStationIcon = (type: TimelineStation['iconType']) => {
    switch (type) {
      case 'chat':
        return <MessageSquare className="w-5 h-5 text-pink-400" />;
      case 'heart':
        return <Heart className="w-5 h-5 text-purple-400 fill-purple-500/20" />;
      case 'phone':
        return <PhoneCall className="w-5 h-5 text-amber-400" />;
      case 'clock':
        return <Clock className="w-5 h-5 text-blue-400" />;
      case 'smile':
        return <Laugh className="w-5 h-5 text-rose-400" />;
      case 'storm':
        return <Flame className="w-5 h-5 text-red-400" />;
      case 'baby':
        return <Baby className="w-5 h-5 text-pink-300" />;
    }
  };

  return (
    <section id="story-timeline-section" className="relative py-16 px-4 max-w-4xl mx-auto z-10">
      <div className="text-center mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-950/60 border border-pink-500/30 text-pink-300 text-xs tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          <span>محطات السنة الحقيقية • خط الزمن</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-black text-white">
          أصل الحكاية.. <span className="text-pink-400">محطة بمحطة</span>
        </h2>
        <p className="text-slate-400 text-sm md:text-base mt-2 max-w-xl mx-auto">
          اضغطي على أي محطة عشان تشوفي الموقف اللي حصل واعترافي اللي مكنتش قولته وقتها.
        </p>
      </div>

      {/* Timeline spine and stations */}
      <div className="relative border-r border-purple-500/20 pr-6 mr-4 sm:pr-8 sm:mr-8 space-y-6">
        {STATIONS.map((st) => {
          const isExpanded = expandedId === st.id;
          return (
            <div key={st.id} id={`timeline-item-${st.id}`} className="relative">
              {/* Timeline marker node */}
              <div
                onClick={() => toggleExpand(st.id)}
                className={`absolute -right-[35px] sm:-right-[43px] top-6 w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 flex items-center justify-center cursor-pointer transition-all duration-300 ${
                  isExpanded
                    ? 'border-pink-400 bg-pink-500/30 shadow-[0_0_15px_rgba(236,72,153,0.7)] scale-110'
                    : 'border-purple-500/40 bg-slate-950/90 hover:border-pink-500/60'
                }`}
              >
                {getStationIcon(st.iconType)}
              </div>

              {/* Station Card */}
              <motion.div
                layout
                onClick={() => toggleExpand(st.id)}
                className={`p-5 sm:p-6 rounded-2xl backdrop-blur-md border transition-all cursor-pointer ${
                  isExpanded
                    ? 'bg-slate-900/90 border-pink-500/50 shadow-[0_10px_35px_rgba(0,0,0,0.6)] ring-1 ring-pink-500/30'
                    : 'bg-slate-950/60 border-purple-500/20 hover:border-purple-500/40'
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-slate-400 tracking-wider">
                      محطة {st.number}
                    </span>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${st.badgeColor}`}
                    >
                      {st.tag}
                    </span>
                  </div>

                  {st.dateStr && (
                    <span className="text-xs text-slate-400 font-mono">
                      {st.dateStr}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">
                      {st.title}
                    </h3>
                    <p className="text-sm text-slate-300">{st.subtitle}</p>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 transition-transform duration-300 shrink-0 ${
                      isExpanded ? 'rotate-180 text-pink-400' : ''
                    }`}
                  />
                </div>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-5 pt-4 border-t border-slate-800/80 space-y-4"
                    >
                      <p className="text-base text-slate-200 leading-relaxed font-light">
                        {st.description}
                      </p>

                      {st.quote && (
                        <div className="p-3.5 rounded-xl bg-purple-950/30 border border-purple-500/20 flex items-start gap-3">
                          <Quote className="w-5 h-5 text-pink-400 shrink-0 mt-0.5 opacity-80" />
                          <p className="text-xs sm:text-sm text-purple-200 italic">
                            «{st.quote}»
                          </p>
                        </div>
                      )}

                      <div className="p-3.5 rounded-xl bg-pink-950/20 border border-pink-500/30 flex items-center justify-between flex-wrap gap-2 text-xs text-pink-300">
                        <span className="font-semibold text-white">اعتراف ديشا:</span>
                        <span>{st.mustafaThought}</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
