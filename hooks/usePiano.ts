import { useCallback, useRef } from 'react';

type Note = {
  freq: number;
  duration: number; 
  gap: number;      
  velocity?: number; // 0 to 1, volume/intensity
};

const NOTES: Record<string, number> = {
  'G3': 196.00, 'A3': 220.00, 'B3': 246.94,
  'C4': 261.63, 'D4': 293.66, 'E4': 329.63, 'F4': 349.23, 'G4': 392.00, 'A4': 440.00, 'B4': 493.88,
  'C5': 523.25, 'D5': 587.33, 'E5': 659.25, 'F5': 698.46, 'G5': 783.99, 'A5': 880.00, 'B5': 987.77,
};

const Q = 0.526;
const E = 0.263;

const TUNES: Note[][] = [
  // Phrase 1: "Never gonna give you up" (with velocity accents)
  [
    { freq: NOTES.G4, duration: E, gap: E, velocity: 0.8 }, 
    { freq: NOTES.A4, duration: E, gap: E, velocity: 0.8 }, 
    { freq: NOTES.C5, duration: E, gap: E, velocity: 1.0 }, // Accent
    { freq: NOTES.A4, duration: E, gap: E, velocity: 0.8 }, 
    { freq: NOTES.E5, duration: Q, gap: Q, velocity: 1.0 }, // Accent
    { freq: NOTES.E5, duration: Q, gap: Q, velocity: 1.0 }, 
    { freq: NOTES.D5, duration: Q * 2, gap: Q * 2, velocity: 0.9 }
  ],
  // Phrase 2: "Never gonna let you down"
  [
    { freq: NOTES.G4, duration: E, gap: E, velocity: 0.8 }, 
    { freq: NOTES.A4, duration: E, gap: E, velocity: 0.8 }, 
    { freq: NOTES.C5, duration: E, gap: E, velocity: 1.0 }, 
    { freq: NOTES.A4, duration: E, gap: E, velocity: 0.8 }, 
    { freq: NOTES.D5, duration: Q, gap: Q, velocity: 1.0 }, 
    { freq: NOTES.D5, duration: Q, gap: Q, velocity: 1.0 }, 
    { freq: NOTES.C5, duration: E, gap: E, velocity: 0.9 },
    { freq: NOTES.B4, duration: E, gap: E, velocity: 0.8 },
    { freq: NOTES.A4, duration: Q * 2, gap: Q * 2, velocity: 0.7 }
  ],
  // Phrase 3: "Never gonna run around"
  [
    { freq: NOTES.G4, duration: E, gap: E, velocity: 0.8 }, 
    { freq: NOTES.A4, duration: E, gap: E, velocity: 0.8 }, 
    { freq: NOTES.C5, duration: E, gap: E, velocity: 1.0 }, 
    { freq: NOTES.A4, duration: E, gap: E, velocity: 0.8 }, 
    { freq: NOTES.C5, duration: Q, gap: Q, velocity: 1.0 }, 
    { freq: NOTES.D5, duration: E, gap: E, velocity: 1.0 }, 
    { freq: NOTES.B4, duration: E, gap: E, velocity: 0.8 },
    { freq: NOTES.A4, duration: E, gap: E, velocity: 0.7 }, 
    { freq: NOTES.G4, duration: Q * 2, gap: Q * 2, velocity: 0.7 }
  ],
];

export function usePiano() {
  const audioCtx = useRef<AudioContext | null>(null);

  const playNote = useCallback((ctx: AudioContext, note: Note, startTime: number) => {
    const velocity = note.velocity || 0.8;
    
    // Fundamental note
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    // Harmonic helper (triangle) for piano timbre
    const harmonic = ctx.createOscillator();
    const hGain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(note.freq, startTime);
    
    harmonic.type = 'triangle';
    harmonic.frequency.setValueAtTime(note.freq, startTime);

    gain.gain.setValueAtTime(0, startTime);
    gain.gain.linearRampToValueAtTime(0.2 * velocity, startTime + 0.005); // Faster attack
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + note.duration);

    hGain.gain.setValueAtTime(0, startTime);
    hGain.gain.linearRampToValueAtTime(0.05 * velocity, startTime + 0.005);
    hGain.gain.exponentialRampToValueAtTime(0.001, startTime + note.duration * 0.5); // Harmonics decay faster

    osc.connect(gain);
    harmonic.connect(hGain);
    
    gain.connect(ctx.destination);
    hGain.connect(ctx.destination);

    osc.start(startTime);
    harmonic.start(startTime);
    
    osc.stop(startTime + note.duration);
    harmonic.stop(startTime + note.duration);
  }, []);

  const playTune = useCallback((index: number) => {
    if (!audioCtx.current) {
      audioCtx.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }

    const ctx = audioCtx.current;
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    const tune = TUNES[index % TUNES.length];
    let nextNoteTime = ctx.currentTime + 0.05; // Tiny buffer

    tune.forEach((note) => {
      playNote(ctx, note, nextNoteTime);
      nextNoteTime += note.gap;
    });
  }, [playNote]);

  return { playTune };
}
