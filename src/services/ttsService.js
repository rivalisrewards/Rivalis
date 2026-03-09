let voicesLoaded = false;
let cachedVoices = [];

function loadVoices() {
  return new Promise((resolve) => {
    const synth = window.speechSynthesis;

    const voices = synth.getVoices();

    if (voices.length) {
      cachedVoices = voices;
      voicesLoaded = true;
      resolve(voices);
      return;
    }

    synth.onvoiceschanged = () => {
      cachedVoices = synth.getVoices();
      voicesLoaded = true;
      resolve(cachedVoices);
    };
  });
}

export async function speak(text) {
  if (!("speechSynthesis" in window)) return;

  if (!voicesLoaded) {
    await loadVoices();
  }

  const utterance = new SpeechSynthesisUtterance(text);

  const preferredVoice =
    cachedVoices.find((v) => v.name.includes("Google")) ||
    cachedVoices.find((v) => v.lang === "en-US") ||
    cachedVoices[0];

  if (preferredVoice) utterance.voice = preferredVoice;

  utterance.rate = 1;
  utterance.pitch = 1;
  utterance.volume = 1;

  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}
