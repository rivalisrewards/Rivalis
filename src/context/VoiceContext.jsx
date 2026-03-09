import { createContext, useContext, useState } from "react";

const VoiceContext = createContext();

export function VoiceProvider({ children }) {

  const [voiceEnabled, setVoiceEnabled] = useState(false);

  function toggleVoice() {
    setVoiceEnabled((prev) => !prev);
  }

  function stopVoice() {
    setVoiceEnabled(false);
  }

  return (
    <VoiceContext.Provider
      value={{
        voiceEnabled,
        toggleVoice,
        stopVoice
      }}
    >
      {children}
    </VoiceContext.Provider>
  );
}

export function useVoice() {
  return useContext(VoiceContext);
}
