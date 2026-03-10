export default function createVoiceCommands(navigate){

  const speak = (text)=>{
    const msg = new SpeechSynthesisUtterance(text)
    speechSynthesis.speak(msg)
  }

  return function(command){

    const text = command.toLowerCase()

    /* DASHBOARD */

    if(text.includes("dashboard") || text.includes("home")){
      navigate("/dashboard")
      speak("Opening dashboard")
      return
    }

    /* CHAT */

    if(text.includes("chat")){
      navigate("/chat")
      speak("Opening global chat")
      return
    }

    /* DM */

    if(text.includes("dm") || text.includes("direct message")){
      navigate("/dm")
      speak("Opening direct messages")
      return
    }

    /* LEADERBOARD */

    if(text.includes("leaderboard") || text.includes("rankings")){
      navigate("/leaderboard")
      speak("Opening leaderboard")
      return
    }

    /* PROFILE */

    if(text.includes("profile")){
      navigate("/profile")
      speak("Opening your profile")
      return
    }

    /* FITNESS */

    if(text.includes("fitness")){
      navigate("/fitness")
      speak("Opening fitness dashboard")
      return
    }

    /* SOLO */

    if(text.includes("solo")){
      navigate("/solo")
      speak("Opening solo mode")
      return
    }

    /* BURNOUTS */

    if(text.includes("burnout")){
      navigate("/burnouts")
      speak("Opening burnouts")
      return
    }

    /* LIVE */

    if(text.includes("live") || text.includes("competition")){
      navigate("/live")
      speak("Opening live competition")
      return
    }

    /* SHOP */

    if(text.includes("shop") || text.includes("store")){
      navigate("/shop")
      speak("Opening the shop")
      return
    }

    /* SETTINGS */

    if(text.includes("settings")){
      navigate("/settings")
      speak("Opening settings")
      return
    }

    /* WORKOUT CONTROL */

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

    if(text.includes("start workout") || text.includes("start card")){
      window.dispatchEvent(new Event("voiceStartWorkout"))
      speak("Starting workout")
      return
    }

    /* CARD PROGRESS */

    if(text.includes("cards left") || text.includes("how many cards left")){
      window.dispatchEvent(new Event("voiceCardsRemaining"))
      return
    }

    /* COMMAND HELP */

    if(
      text.includes("what can i say") ||
      text.includes("voice commands") ||
      text.includes("help")
    ){
      speak("Opening voice command list")
      navigate("/settings")
      window.dispatchEvent(new Event("voiceShowCommands"))
      return
    }

    /* SCROLL */

    if(text.includes("scroll down")){
      window.scrollBy({top:500,behavior:"smooth"})
      return
    }

    if(text.includes("scroll up")){
      window.scrollBy({top:-500,behavior:"smooth"})
      return
    }

  }

}
