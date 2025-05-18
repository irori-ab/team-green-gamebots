// This file will be used for new sound effects
let audioContext: AudioContext | null = null;

const initAudioContext = () => {
  if (!audioContext) {
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return audioContext;
};

const generateJumpVariation1 = (ctx: AudioContext) => {
  // Classic Mario-style jump
  const mainOsc = ctx.createOscillator();
  const formantOsc = ctx.createOscillator();
  const mainGain = ctx.createGain();
  const formantGain = ctx.createGain();
  const masterGain = ctx.createGain();

  mainOsc.connect(mainGain);
  formantOsc.connect(formantGain);
  mainGain.connect(masterGain);
  formantGain.connect(masterGain);
  masterGain.connect(ctx.destination);

  mainOsc.type = 'sine';
  mainOsc.frequency.setValueAtTime(440, ctx.currentTime);
  mainOsc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.1);

  formantOsc.type = 'triangle';
  formantOsc.frequency.setValueAtTime(660, ctx.currentTime);
  formantOsc.frequency.exponentialRampToValueAtTime(1320, ctx.currentTime + 0.1);

  mainGain.gain.setValueAtTime(0.3, ctx.currentTime);
  formantGain.gain.setValueAtTime(0.2, ctx.currentTime);
  masterGain.gain.setValueAtTime(0.4, ctx.currentTime);
  masterGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);

  mainOsc.start();
  formantOsc.start();
  mainOsc.stop(ctx.currentTime + 0.15);
  formantOsc.stop(ctx.currentTime + 0.15);
};

const generateJumpVariation2 = (ctx: AudioContext) => {
  // Higher pitched, shorter jump
  const mainOsc = ctx.createOscillator();
  const formantOsc = ctx.createOscillator();
  const mainGain = ctx.createGain();
  const formantGain = ctx.createGain();
  const masterGain = ctx.createGain();

  mainOsc.connect(mainGain);
  formantOsc.connect(formantGain);
  mainGain.connect(masterGain);
  formantGain.connect(masterGain);
  masterGain.connect(ctx.destination);

  mainOsc.type = 'square';
  mainOsc.frequency.setValueAtTime(660, ctx.currentTime);
  mainOsc.frequency.exponentialRampToValueAtTime(1320, ctx.currentTime + 0.08);

  formantOsc.type = 'sine';
  formantOsc.frequency.setValueAtTime(880, ctx.currentTime);
  formantOsc.frequency.exponentialRampToValueAtTime(1760, ctx.currentTime + 0.08);

  mainGain.gain.setValueAtTime(0.25, ctx.currentTime);
  formantGain.gain.setValueAtTime(0.15, ctx.currentTime);
  masterGain.gain.setValueAtTime(0.35, ctx.currentTime);
  masterGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.12);

  mainOsc.start();
  formantOsc.start();
  mainOsc.stop(ctx.currentTime + 0.12);
  formantOsc.stop(ctx.currentTime + 0.12);
};

const generateJumpVariation3 = (ctx: AudioContext) => {
  // Lower pitched, longer jump
  const mainOsc = ctx.createOscillator();
  const formantOsc = ctx.createOscillator();
  const mainGain = ctx.createGain();
  const formantGain = ctx.createGain();
  const masterGain = ctx.createGain();

  mainOsc.connect(mainGain);
  formantOsc.connect(formantGain);
  mainGain.connect(masterGain);
  formantGain.connect(masterGain);
  masterGain.connect(ctx.destination);

  mainOsc.type = 'sawtooth';
  mainOsc.frequency.setValueAtTime(330, ctx.currentTime);
  mainOsc.frequency.exponentialRampToValueAtTime(660, ctx.currentTime + 0.15);

  formantOsc.type = 'triangle';
  formantOsc.frequency.setValueAtTime(440, ctx.currentTime);
  formantOsc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15);

  mainGain.gain.setValueAtTime(0.35, ctx.currentTime);
  formantGain.gain.setValueAtTime(0.25, ctx.currentTime);
  masterGain.gain.setValueAtTime(0.45, ctx.currentTime);
  masterGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);

  mainOsc.start();
  formantOsc.start();
  mainOsc.stop(ctx.currentTime + 0.2);
  formantOsc.stop(ctx.currentTime + 0.2);
};

export const generateJumpSound = () => {
  try {
    const ctx = initAudioContext();
    
    // Randomly select a jump variation
    const variations = [
      generateJumpVariation1,
      generateJumpVariation2,
      generateJumpVariation3
    ];
    const randomVariation = variations[Math.floor(Math.random() * variations.length)];
    
    randomVariation(ctx);
  } catch (error) {
    console.error('Error generating jump sound:', error);
  }
};

export const generateAllSounds = () => {
  generateJumpSound();
}; 