export function createVoiceRecognizer(onCommand) {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    console.warn("Speech recognition not supported");
    return null;
  }

  const recognition = new SpeechRecognition();

  recognition.continuous = true;
  recognition.lang = "en-US";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.onresult = (event) => {
    const command =
      event.results[event.results.length - 1][0].transcript
        .trim()
        .toLowerCase();

    onCommand(command);
  };

  recognition.onerror = (event) => {
    console.warn("Voice error:", event.error);
  };

  recognition.onend = () => {
    try {
      recognition.start();
    } catch {}
  };

  return recognition;
}
