import VoiceEngine from "../voice/VoiceEngine"

export default function useVoice(userProfile) {

  const speak = (text) => {

    if (!userProfile?.ttsEnabled) return

    VoiceEngine.speak(
      text,
      userProfile.voiceRate || 1,
      userProfile.voicePitch || 1
    )

  }

  return { speak }

}
