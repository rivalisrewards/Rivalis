import { useRef } from "react";
import { useVoice } from "../context/VoiceContext";

export default function VoiceTrigger() {

  const { toggleVoice } = useVoice();

  const tapCount = useRef(0);
  const lastTap = useRef(0);

  function handleTap() {

    const now = Date.now();

    if (now - lastTap.current > 2000) {
      tapCount.current = 0;
    }

    tapCount.current += 1;
    lastTap.current = now;

    if (tapCount.current >= 5) {
      toggleVoice();
      tapCount.current = 0;
    }

  }

  return (
    <div
      onClick={handleTap}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "80px",
        height: "80px",
        zIndex: 9999,
        opacity: 0
      }}
    />
  );
}
