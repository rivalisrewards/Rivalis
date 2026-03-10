import React, { createContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import WakeWordEngine from "./WakeWordEngine"
import createVoiceCommands from "./VoiceCommands"

export const VoiceContext = createContext()

export default function VoiceProvider({ children, userProfile }){

  const navigate = useNavigate()

  const [voiceActive,setVoiceActive] = useState(false)
  const [tapCount,setTapCount] = useState(0)

  useEffect(()=>{

    const commands = createVoiceCommands(navigate)

    WakeWordEngine.init(commands)

  },[navigate])

  useEffect(()=>{

    if(userProfile?.wakeWord){

      WakeWordEngine.setWakeWord(userProfile.wakeWord)

    }

  },[userProfile])

  useEffect(()=>{

    if(!voiceActive) return

    WakeWordEngine.start()

    return ()=>WakeWordEngine.stop()

  },[voiceActive])

  useEffect(()=>{

    const handleTap = (e)=>{

      if(e.clientX < 120 && e.clientY < 120){

        const newCount = tapCount + 1

        setTapCount(newCount)

        if(newCount === 5){

          setVoiceActive(prev=>!prev)

          setTapCount(0)

        }

        setTimeout(()=>setTapCount(0),1000)

      }

    }

    window.addEventListener("click",handleTap)

    return ()=>window.removeEventListener("click",handleTap)

  },[tapCount])

  return(

    <VoiceContext.Provider value={{voiceActive}}>

      {children}

    </VoiceContext.Provider>

  )

}
