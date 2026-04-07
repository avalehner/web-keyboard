const keys = {
  KeyA: {
    frequency: 261.63,
    oscillator: null,
    isPlaying: false,
  },
  KeyW: {
    frequency: 277.18,
    oscillator: null,
    isPlaying: false,
  },
  KeyS: {
    frequency: 296.66,
    oscillator: null,
    isPlaying: false,
  },
  KeyE: {
    frequency: 311.13,
    oscillator: null,
    isPlaying: false,
  },
  KeyD: {
    frequency: 329.63,
    oscillator: null,
    isPlaying: false,
  },
  KeyF: {
    frequency: 349.23,
    oscillator: null,
    isPlaying: false,
  },
  KeyT: {
    frequency: 369.99,
    oscillator: null,
    isPlaying: false,
  },
  KeyG: {
    frequency: 392.00,
    oscillator: null,
    isPlaying: false,
  },
  KeyY: {
    frequency: 415.30,
    oscillator: null,
    isPlaying: false,
  },
  KeyH: {
    frequency: 440.00,
    oscillator: null,
    isPlaying: false,
  },
  KeyU: {
    frequency: 466.16,
    oscillator: null,
    isPlaying: false,
  },
  KeyJ: {
    frequency: 493.88,
    oscillator: null,
    isPlaying: false,
  },
  KeyK: {
    frequency: 523.25,
    oscillator: null,
    isPlaying: false,
  }
}

const buildAudioContextAndReturnOscillator = (frequency) => {
  // Create audio context
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

  // Create oscillator
  oscillator = audioCtx.createOscillator();
  oscillator.type = "sine";

  // Create gain node
  const gainNode = audioCtx.createGain();
  gainNode.gain.value = 0.2; // 20% volume - safe for headphones

  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  // Set frequency
  oscillator.frequency.value = frequency;

  return oscillator;
}

// Initialize keys / notes
Object.values(keys).forEach((el) => {
  el.oscillator = buildAudioContextAndReturnOscillator(el.frequency)
})

console.log(keys)

const toKebabCase = (keyCode) => {
  return keyCode.replace(/([A-Z])/g, '-$1').toLowerCase().slice(1);
}

const startKeyPlay = (event) => {
  event.preventDefault();

  const key = keys[event.code];

  if (key) {
    const noteSelectorId = toKebabCase(event.code);

    document.getElementById(noteSelectorId).classList.add('note-pressed')

    if (!key.isPlaying) {
      console.log(`Starting osc for key: ${event.code}...`);
      key.oscillator.start();
      key.isPlaying = true;
    }
  }
}

const stopKeyPlay = (event) => {
  event.preventDefault();

  const notes = document.getElementsByClassName("note");

  for (let index = 0; index < notes.length; index++) {
    notes[index].classList.remove('note-pressed')
  }

  const key = keys[event.code];

  if (key) {
    if (key.isPlaying) {
      console.log("Stopping oscillator...")
      key.oscillator.stop();
      key.isPlaying = false;

      console.log("Building new context...");

      const newOscillator = buildAudioContextAndReturnOscillator(key.frequency);

      key.oscillator = newOscillator;
    }
  }
}

window.addEventListener("keydown", startKeyPlay);

window.addEventListener("keyup", stopKeyPlay);