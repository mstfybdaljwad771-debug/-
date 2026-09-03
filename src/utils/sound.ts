// Web Audio API & Official Anthem Sound Engine
// Official Song: Amr Diab - Khalik Fakerny (خليك فاكرني)

type AudioStateListener = (state: {
  isPlaying: boolean;
  isMuted: boolean;
  currentTime: number;
  duration: number;
  volume: number;
}) => void;

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private isPlayingSynth: boolean = false;
  private masterGain: GainNode | null = null;
  private padGain: GainNode | null = null;
  private intervalId: number | null = null;

  // Official Audio Element
  private officialAudio: HTMLAudioElement | null = null;
  private listeners: Set<AudioStateListener> = new Set();
  private songVolume: number = 0.8;
  private isInitialized: boolean = false;

  constructor() {
    // Only in browser environment
    if (typeof window !== 'undefined') {
      this.initOfficialAudio();
    }
  }

  private initOfficialAudio() {
    if (this.officialAudio) return;
    try {
      this.officialAudio = new Audio('/khalik-fakerny.mp3');
      this.officialAudio.loop = true;
      this.officialAudio.preload = 'none';
      this.officialAudio.volume = this.songVolume;

      this.officialAudio.addEventListener('timeupdate', () => {
        this.notifyListeners();
      });

      this.officialAudio.addEventListener('play', () => {
        this.notifyListeners();
      });

      this.officialAudio.addEventListener('pause', () => {
        this.notifyListeners();
      });

      this.officialAudio.addEventListener('loadedmetadata', () => {
        this.notifyListeners();
      });

      this.officialAudio.addEventListener('error', (e) => {
        console.warn('Audio element error, will fallback to ambient if needed:', e);
      });
    } catch (err) {
      console.warn('Failed to initialize official audio element:', err);
    }
  }

  public subscribe(listener: AudioStateListener): () => void {
    this.listeners.add(listener);
    // immediately call with current state
    listener(this.getState());
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notifyListeners() {
    const state = this.getState();
    this.listeners.forEach((listener) => {
      try {
        listener(state);
      } catch {
        // ignore listener errors
      }
    });
  }

  public getState() {
    return {
      isPlaying: Boolean(this.officialAudio && !this.officialAudio.paused && !this.officialAudio.ended),
      isMuted: this.isMuted,
      currentTime: this.officialAudio ? this.officialAudio.currentTime : 0,
      duration: this.officialAudio && !isNaN(this.officialAudio.duration) ? this.officialAudio.duration : 206, // ~3:26
      volume: this.songVolume,
    };
  }

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.7, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  /**
   * Plays the Official Theme Song: Amr Diab - Khalik Fakerny
   * Called immediately when clicking "اكتشفي الحكاية"
   */
  public async playOfficialSong(fadeIn: boolean = true): Promise<boolean> {
    this.initOfficialAudio();
    this.initContext();

    // Stop synth background music to prevent clashing
    this.stopSynthBackgroundMusic();

    if (!this.officialAudio) return false;

    try {
      this.officialAudio.muted = this.isMuted;

      if (fadeIn) {
        this.officialAudio.volume = 0.05;
        await this.officialAudio.play();
        
        // Smoothly ramp up volume over 1.5 seconds
        let currentVol = 0.05;
        const targetVol = this.songVolume;
        const step = (targetVol - 0.05) / 15;
        const fadeInterval = setInterval(() => {
          if (!this.officialAudio || this.officialAudio.paused) {
            clearInterval(fadeInterval);
            return;
          }
          currentVol = Math.min(targetVol, currentVol + step);
          this.officialAudio.volume = currentVol;
          if (currentVol >= targetVol) {
            clearInterval(fadeInterval);
          }
        }, 100);
      } else {
        this.officialAudio.volume = this.songVolume;
        await this.officialAudio.play();
      }

      this.notifyListeners();
      return true;
    } catch (err) {
      console.warn('Playback error (possibly awaiting user gesture):', err);
      return false;
    }
  }

  public pauseOfficialSong() {
    if (this.officialAudio && !this.officialAudio.paused) {
      this.officialAudio.pause();
      this.notifyListeners();
    }
  }

  public toggleOfficialSong(): boolean {
    if (!this.officialAudio) {
      this.playOfficialSong();
      return true;
    }
    if (this.officialAudio.paused) {
      this.playOfficialSong(false);
      return true;
    } else {
      this.pauseOfficialSong();
      return false;
    }
  }

  public seekOfficialSong(timeInSeconds: number) {
    if (this.officialAudio && !isNaN(timeInSeconds)) {
      this.officialAudio.currentTime = Math.max(0, Math.min(timeInSeconds, this.officialAudio.duration || 206));
      this.notifyListeners();
    }
  }

  public setSongVolume(val: number) {
    this.songVolume = Math.max(0, Math.min(1, val));
    if (this.officialAudio) {
      this.officialAudio.volume = this.songVolume;
    }
    this.notifyListeners();
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;

    // Toggle official audio element
    if (this.officialAudio) {
      this.officialAudio.muted = this.isMuted;
    }

    // Toggle web audio master gain
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.7, this.ctx.currentTime);
    }

    this.notifyListeners();
    return this.isMuted;
  }

  public getMutedStatus(): boolean {
    return this.isMuted;
  }

  public isOfficialSongPlaying(): boolean {
    return Boolean(this.officialAudio && !this.officialAudio.paused);
  }

  // Sound Effects
  public playWarpEffect() {
    try {
      this.initContext();
      if (!this.ctx || !this.masterGain || this.isMuted) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(50, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 2.5);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(200, now);
      filter.frequency.exponentialRampToValueAtTime(4000, now + 2.5);

      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.4, now + 1.8);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 3.0);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 3.1);

      setTimeout(() => {
        this.playDeepBoom();
      }, 2300);
    } catch {
      // ignore audio errors
    }
  }

  public playDeepBoom() {
    try {
      this.initContext();
      if (!this.ctx || !this.masterGain || this.isMuted) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(35, now + 1.2);

      gain.gain.setValueAtTime(0.6, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.5);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 1.6);
    } catch {
      // ignore
    }
  }

  public playChime(pitch: number = 523.25) {
    try {
      this.initContext();
      if (!this.ctx || !this.masterGain || this.isMuted) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(pitch, now);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.9);
    } catch {
      // ignore
    }
  }

  public playSuccessChord() {
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      setTimeout(() => this.playChime(freq), idx * 90);
    });
  }

  public playHeartbeat() {
    try {
      this.initContext();
      if (!this.ctx || !this.masterGain || this.isMuted) return;

      const now = this.ctx.currentTime;
      // thump 1
      const osc1 = this.ctx.createOscillator();
      const gain1 = this.ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(80, now);
      osc1.frequency.exponentialRampToValueAtTime(45, now + 0.15);
      gain1.gain.setValueAtTime(0.35, now);
      gain1.gain.exponentialRampToValueAtTime(0.01, now + 0.16);
      osc1.connect(gain1);
      gain1.connect(this.masterGain);
      osc1.start(now);
      osc1.stop(now + 0.18);

      // thump 2
      const osc2 = this.ctx.createOscillator();
      const gain2 = this.ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(70, now + 0.22);
      osc2.frequency.exponentialRampToValueAtTime(40, now + 0.4);
      gain2.gain.setValueAtTime(0.25, now + 0.22);
      gain2.gain.exponentialRampToValueAtTime(0.01, now + 0.42);
      osc2.connect(gain2);
      gain2.connect(this.masterGain);
      osc2.start(now + 0.22);
      osc2.stop(now + 0.45);
    } catch {
      // ignore
    }
  }

  // Synth Ambient Fallback / Intro Mood
  public startSynthBackgroundMusic() {
    if (this.isPlayingSynth || this.isOfficialSongPlaying()) return;
    try {
      this.initContext();
      if (!this.ctx || !this.masterGain) return;

      this.isPlayingSynth = true;
      this.padGain = this.ctx.createGain();
      this.padGain.gain.setValueAtTime(0.01, this.ctx.currentTime);
      this.padGain.gain.linearRampToValueAtTime(0.2, this.ctx.currentTime + 2);
      this.padGain.connect(this.masterGain);

      const chordProgressions = [
        [146.83, 220.0, 261.63, 329.63, 440.0],
        [116.54, 174.61, 220.0, 261.63, 349.23],
        [174.61, 220.0, 261.63, 329.63, 392.0],
        [164.81, 196.0, 246.94, 329.63, 392.0],
      ];

      let step = 0;
      const playChord = () => {
        if (!this.ctx || !this.padGain || !this.isPlayingSynth || this.isOfficialSongPlaying()) return;
        const currentChord = chordProgressions[step % chordProgressions.length];
        step++;

        const chordNow = this.ctx.currentTime;
        currentChord.forEach((freq) => {
          const osc = this.ctx!.createOscillator();
          const oscGain = this.ctx!.createGain();
          const filter = this.ctx!.createBiquadFilter();

          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, chordNow);

          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(700, chordNow);
          filter.frequency.linearRampToValueAtTime(1100, chordNow + 2);
          filter.frequency.linearRampToValueAtTime(600, chordNow + 4.5);

          oscGain.gain.setValueAtTime(0.001, chordNow);
          oscGain.gain.linearRampToValueAtTime(0.05, chordNow + 1.5);
          oscGain.gain.exponentialRampToValueAtTime(0.001, chordNow + 4.8);

          osc.connect(filter);
          filter.connect(oscGain);
          oscGain.connect(this.padGain!);

          osc.start(chordNow);
          osc.stop(chordNow + 5.0);
        });
      };

      playChord();
      this.intervalId = window.setInterval(playChord, 4500);
    } catch {
      // ignore
    }
  }

  public stopSynthBackgroundMusic() {
    this.isPlayingSynth = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    if (this.padGain && this.ctx) {
      this.padGain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 1);
    }
  }

  // Aliases for backwards compatibility
  public startBackgroundMusic() {
    this.playOfficialSong();
  }

  public stopBackgroundMusic() {
    this.pauseOfficialSong();
    this.stopSynthBackgroundMusic();
  }
}

export const soundEngine = new SoundEngine();
