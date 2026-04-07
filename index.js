const keys = {
  KeyA: {
    frequency: 261.63,
  },
  KeyW: {
    frequency: 277.18,
  },
  KeyS: {
    frequency: 296.66,
  },
  KeyE: {
    frequency: 311.13
  },
  KeyD: {
    frequency: 329.63,
  },
  KeyF: {
    frequency: 349.23,
  },
  KeyT: {
    frequency: 369.99,
  },
  KeyG: {
    frequency: 392.00,
  },
  KeyY: {
    frequency: 415.30,
  },
  KeyH: {
    frequency: 440.00,
  },
  KeyU: {
    frequency: 466.16,
  },
  KeyJ: {
    frequency: 493.88,
  },
  KeyK: {
    frequency: 523.25, 
  }
}

const contexts = [];

const createAudioCtxAndStart = (frequency) => {
    // Create audio context
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    // Create oscillator
    osc = audioCtx.createOscillator();
    osc.type = "sine";

    // Create gain node
    const gainNode = audioCtx.createGain();
    gainNode.gain.value = 0.2; // 20% volume - safe for headphones

    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    // Set frequency
    osc.frequency.value = parseFloat(frequency);

    osc.start();

    contexts.push(audioCtx);
}

const closeAllAudioContexts = () => {
  contexts.forEach(ctx => ctx.close())
}

let oscOff = true;

const toKebabCase = (keyCode) => {
  return keyCode.replace(/([A-Z])/g, '-$1').toLowerCase().slice(1);
}

window.addEventListener("keydown", (event) => {
  event.preventDefault();

  const key = keys[event.code];

  if (key) {
    const noteSelectorId = toKebabCase(event.code);

    document.getElementById(noteSelectorId).classList.add('note-pressed')

    console.log(noteSelectorId);
    console.log(key.frequency);

    if (oscOff) {
      console.log("Starting osc...")
      createAudioCtxAndStart(key.frequency);
      oscOff = false;
    }
  }
});

window.addEventListener("keyup", (event) => {
  event.preventDefault();

  const notes = document.getElementsByClassName("note");

  for (let index = 0; index < notes.length; index++) {
    notes[index].classList.remove('note-pressed')
  }

  if (!oscOff) {
    console.log("Stopping osc...")
    closeAllAudioContexts();
    oscOff = true;
  }
});