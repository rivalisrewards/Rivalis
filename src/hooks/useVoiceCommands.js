import { useEffect, useRef } from "react";
import { createVoiceRecognizer } from "../services/voiceRecognitionService";
import { parseVoiceCommand } from "../utils/voiceCommandParser";
import { speak } from "../services/ttsService";

export default function useVoiceCommands(active, navigate, onStop) {

  const recognitionRef = useRef(null);

  useEffect(() => {

    if (!active) {

      if (recognitionRef.current) {
        recognitionRef.current.onend = null;
        recognitionRef.current.stop();
        recognitionRef.current = null;
      }

      return;
    }

    function handleCommand(command) {

      const result = parseVoiceCommand(command, navigate);

      if (!result) return;

      if (result === "stop") {
        onStop();
        speak("Voice control disabled");
        return;
      }

      speak(result);
    }

    const recognizer = createVoiceRecognizer(handleCommand);

    if (!recognizer) return;

    recognitionRef.current = recognizer;

    recognizer.start();

    speak("Voice control activated");

    return () => {

      if (recognitionRef.current) {
        recognitionRef.current.onend = null;
        recognitionRef.current.stop();
        recognitionRef.current = null;
      }

    };

  }, [active]);
}
