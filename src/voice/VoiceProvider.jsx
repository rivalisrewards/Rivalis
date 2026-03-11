import React, { createContext, useEffect, useState, useRef } from "react"
import { useNavigate, useLocation } from "react-router-dom"

import WakeWordEngine from "./WakeWordEngine"
import createVoiceCommands from "./VoiceCommands"

export const VoiceContext = createContext()

export default function VoiceProvider({ children, userProfile }) {

  const navigate = useNavigate()
  const location = useLocation()

  const synthRef = useRef(window.speechSynthesis)

  const [voiceActive, setVoiceActive] = useState(false)
  const [tapCount, setTapCount] = useState(0)

  const ttsEnabled = userProfile?.ttsEnabled ?? false
  const voiceEnabled = userProfile?.voiceEnabled ?? false

  const speak = (text) => {

    if (!ttsEnabled) return
    if (!text) return

    const synth = synthRef.current
    if (!synth) return

    synth.cancel()

    const utterance = new SpeechSynthesisUtterance(text)

    utterance.rate = 1
    utterance.pitch = 1
    utterance.volume = 1

    synth.speak(utterance)

  }

  const stop = () => {

    const synth = synthRef.current
    if (!synth) return

    synth.cancel()

  }

  useEffect(() => {

    const commands = createVoiceCommands(navigate)
    WakeWordEngine.init(commands)

  }, [navigate])

  useEffect(() => {

    if (userProfile?.wakeWord) {
      WakeWordEngine.setWakeWord(userProfile.wakeWord)
    }

  }, [userProfile])

  useEffect(() => {

    if (!voiceEnabled) {
      WakeWordEngine.stop()
      return
    }

    if (voiceActive) {
      WakeWordEngine.start()
    }

    return () => WakeWordEngine.stop()

  }, [voiceActive, voiceEnabled])

  useEffect(() => {

    if (!ttsEnabled) return

    const timeout = setTimeout(() => {

      const mainContent = document.querySelector("main") || document.body
      if (!mainContent) return

      const text = mainContent.innerText
      if (text) speak(text.slice(0, 600))

    }, 600)

    return () => clearTimeout(timeout)

  }, [location.pathname])

  useEffect(() => {

    const handleTap = (e) => {

      if (e.clientX < 120 && e.clientY < 120) {

        const newCount = tapCount + 1
        setTapCount(newCount)

        if (newCount === 5) {

          setVoiceActive(prev => !prev)
          setTapCount(0)

        }

        setTimeout(() => setTapCount(0), 1000)

      }

    }

    window.addEventListener("click", handleTap)

    return () => window.removeEventListener("click", handleTap)

  }, [tapCount])

  return (

    <VoiceContext.Provider value={{ voiceActive, speak, stop }}>

      {children}

    </VoiceContext.Provider>

  )

}
