import React, { useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import VoiceEngine from "./VoiceEngine"
import createVoiceCommands from "./VoiceCommands"

export default function VoiceProvider({ userProfile, children }) {

  const navigate = useNavigate()

  const taps = useRef(0)
  const lastTap = useRef(0)
  const enabled = useRef(false)

  /* Initialize voices + command system */
  useEffect(() => {

    /* iOS / Safari voice initialization */
    speechSynthesis.getVoices()

    const commands = createVoiceCommands(navigate)

    VoiceEngine.init(commands)

  }, [navigate])


  /* 5 tap activation top-left */
  useEffect(() => {

    const handleTap = (e) => {

      const x = e.clientX
      const y = e.clientY

      /* only detect taps in top-left corner */
      if (x > 120 || y > 120) return

      const now = Date.now()

      if (now - lastTap.current > 800) {
        taps.current = 0
      }

      taps.current++
      lastTap.current = now

      if (taps.current >= 5) {

        taps.current = 0
        enabled.current = !enabled.current

        if (enabled.current) {

          VoiceEngine.start()
          VoiceEngine.speak("Voice control activated")

        } else {

          VoiceEngine.stop()
          VoiceEngine.speak("Voice control disabled")

        }

      }

    }

    window.addEventListener("click", handleTap)

    return () =>
      window.removeEventListener("click", handleTap)

  }, [])


  /* Apply user selected voice */
  useEffect(() => {

    if (!userProfile?.selectedVoice) return

    VoiceEngine.setVoice(userProfile.selectedVoice)

  }, [userProfile])


  return children

}
