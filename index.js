console.log("Hello!");

const keys = {
  KeyA: {
    frequency: 262
  },
}

window.addEventListener("keydown", (event) => {
  const key = keys[event.code];

  if (key) {
    console.log(key.frequency);
  }
});
