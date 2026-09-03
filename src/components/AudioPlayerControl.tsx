import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Play, Pause, Music, Heart, ChevronDown, ChevronUp, RotateCcw } from 'lucide-react';
import { soundEngine } from '../utils/sound';

export const AudioPlayerControl: React.FC = () => {
  const [audioState, setAudioState] = useState(soundEngine.getState());
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = soundEngine.subscribe((state) => {
      setAudioState(state);
    });
    return unsubscribe;
  }, []);

  const togglePlay = () => {
    soundEngine.toggleOfficialSong();
  };

  const toggleMute = () => {
    soundEngine.toggleMute();
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs < 0) return '00:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    soundEngine.seekOfficialSong(newTime);
  };

  const handleRestart = () => {
    soundEngine.seekOfficialSong(0);
    soundEngine.playOfficialSong(false);
  };

  const isPlaying = audioState.isPlaying && !audioState.isMuted;

  return (
    <div
      id="official-anthem-player"
      className="fixed top-4 left-4 z-50 flex flex-col items-start select-none"
      dir="ltr"
    >
      {/* Compact Capsule Bar */}
      <div className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-slate-950/85 backdrop-blur-md border border-pink-500/40 shadow-[0_4px_25px_rgba(236,72,153,0.25)] transition-all hover:border-pink-400">
        {/* Play/Pause Button */}
        <button
          id="btn-play-pause-anthem"
          onClick={togglePlay}
          className="w-7 h-7 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center text-white shadow-[0_0_12px_rgba(244,63,94,0.5)] hover:scale-110 active:scale-95 transition-transform cursor-pointer"
          title={audioState.isPlaying ? 'إيقاف مؤقت' : 'تشغيل الأغنية الرسمية'}
        >
          {audioState.isPlaying ? (
            <Pause className="w-3.5 h-3.5 fill-white" />
          ) : (
            <Play className="w-3.5 h-3.5 fill-white translate-x-0.5" />
          )}
        </button>

        {/* Equalizer Wave / Music Note Icon */}
        <div className="flex items-center gap-1.5 cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
          {isPlaying ? (
            <div className="flex items-end gap-0.5 h-3.5 px-0.5">
              <span className="w-0.5 h-3 bg-pink-400 rounded-full animate-[bounce_0.8s_infinite]" />
              <span className="w-0.5 h-2 bg-purple-400 rounded-full animate-[bounce_1.1s_infinite_0.2s]" />
              <span className="w-0.5 h-3.5 bg-rose-300 rounded-full animate-[bounce_0.7s_infinite_0.4s]" />
              <span className="w-0.5 h-1.5 bg-pink-400 rounded-full animate-[bounce_0.9s_infinite_0.1s]" />
            </div>
          ) : (
            <Music className="w-3.5 h-3.5 text-pink-400/80" />
          )}

          {/* Song Name & Artist */}
          <div className="text-left leading-tight hidden sm:block">
            <div className="text-[11px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-rose-100 flex items-center gap-1 font-['Cairo',sans-serif]">
              <span>خليك فاكرني</span>
              <Heart className="w-2.5 h-2.5 text-pink-500 fill-pink-500 inline" />
            </div>
            <div className="text-[9px] text-slate-400 font-mono tracking-tight">
              عمرو دياب • الأغنية الرسمية
            </div>
          </div>
        </div>

        {/* Mute Button */}
        <button
          id="btn-toggle-mute"
          onClick={toggleMute}
          className="text-slate-400 hover:text-pink-300 transition-colors p-1 cursor-pointer"
          title={audioState.isMuted ? 'إلغاء كتم الصوت' : 'كتم الصوت'}
        >
          {audioState.isMuted ? (
            <VolumeX className="w-4 h-4 text-rose-400" />
          ) : (
            <Volume2 className="w-4 h-4 text-slate-300" />
          )}
        </button>

        {/* Expand Details Trigger */}
        <button
          id="btn-toggle-player-details"
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-slate-400 hover:text-white p-0.5 cursor-pointer"
          title="تفاصيل المشغل"
        >
          {isExpanded ? (
            <ChevronUp className="w-3.5 h-3.5" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5" />
          )}
        </button>
      </div>

      {/* Expanded Mini Card with Scrubber, Lyrics preview & Time */}
      {isExpanded && (
        <div
          id="anthem-expanded-card"
          className="mt-2 w-72 sm:w-80 p-3.5 rounded-2xl bg-slate-950/95 backdrop-blur-xl border border-pink-500/30 shadow-[0_10px_35px_rgba(0,0,0,0.8)] text-white text-xs space-y-2.5 animate-in fade-in slide-in-from-top-2 duration-200"
        >
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-pink-900/40 border border-pink-500/30 flex items-center justify-center text-pink-400 font-bold">
                <Music className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-pink-200 font-['Cairo',sans-serif]">
                  خليك فاكرني - عمرو دياب
                </h4>
                <p className="text-[10px] text-slate-400 font-['Cairo',sans-serif]">
                  أغنية حكايتنا الرسمية ❤️
                </p>
              </div>
            </div>
            <button
              onClick={handleRestart}
              className="p-1 text-slate-400 hover:text-pink-300 cursor-pointer"
              title="إعادة من البداية"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Lyrics Quote */}
          <div className="px-2.5 py-1.5 rounded-lg bg-pink-950/30 border border-pink-500/20 text-[11px] text-pink-200/90 text-center font-['Cairo',sans-serif] italic" dir="rtl">
            "ده انت في عينيا.. كل اللي ليا.. فرحة شبابي والدنيا ديا"
          </div>

          {/* Progress Slider */}
          <div className="space-y-1">
            <input
              type="range"
              min={0}
              max={audioState.duration || 206}
              value={audioState.currentTime}
              onChange={handleSeek}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-pink-500"
            />
            <div className="flex justify-between text-[10px] font-mono text-slate-400">
              <span>{formatTime(audioState.currentTime)}</span>
              <span>{formatTime(audioState.duration)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
