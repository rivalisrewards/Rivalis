export default function createVoiceCommands(navigate){

  const speak = (text)=>{

    const msg = new SpeechSynthesisUtterance(text)

    speechSynthesis.speak(msg)

  }

  return function(command){

    const text = command.toLowerCase()

    if(text.includes("dashboard") || text.includes("home")){

      navigate("/dashboard")
      speak("Opening dashboard")
      return

    }

    if(text.includes("chat")){

      navigate("/chat")
      speak("Opening global chat")
      return

    }

    if(text.includes("direct message") || text.includes("dm")){

      navigate("/dm")
      speak("Opening direct messages")
      return

    }

    if(text.includes("leaderboard")){

      navigate("/leaderboard")
      speak("Opening leaderboard")
      return

    }

    if(text.includes("profile")){

      navigate("/profile")
      speak("Opening profile")
      return

    }

    if(text.includes("fitness")){

      navigate("/fitness")
      speak("Opening fitness dashboard")
      return

    }

    if(text.includes("solo")){

      navigate("/solo")
      speak("Opening solo mode")
      return

    }

    if(text.includes("burnout")){

      navigate("/burnouts")
      speak("Opening burnouts")
      return

    }

    if(text.includes("live")){

      navigate("/live")
      speak("Opening live competition")
      return

    }

    if(text.includes("shop")){

      navigate("/shop")
      speak("Opening shop")
      return

    }

    if(text.includes("settings")){

      navigate("/settings")
      speak("Opening settings")
      return

    }

    if(text.includes("pause workout")){

      window.dispatchEvent(new Event("voicePauseWorkout"))
      speak("Workout paused")
      return

    }

    if(text.includes("resume workout")){

      window.dispatchEvent(new Event("voiceResumeWorkout"))
      speak("Resuming workout")
      return

    }

    if(text.includes("exit workout")){

      window.dispatchEvent(new Event("voiceExitWorkout"))
      speak("Exiting workout")
      return

    }

    if(text.includes("cards left")){

      window.dispatchEvent(new Event("voiceCardsRemaining"))
      return

    }

  }

}
