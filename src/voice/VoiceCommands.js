export default function createVoiceCommands(navigate){

  return function(command){

    const text = command.toLowerCase()

    /* DASHBOARD */

    if(
      text.includes("dashboard") ||
      text.includes("home")
    ){
      navigate("/dashboard")
      return
    }

    /* GLOBAL CHAT */

    if(
      text.includes("chat") ||
      text.includes("global chat") ||
      text.includes("open chat") ||
      text.includes("go to chat") ||
      text.includes("show chat")
    ){
      navigate("/chat")
      return
    }

    /* DM */

    if(
      text.includes("dm") ||
      text.includes("direct message") ||
      text.includes("messages") ||
      text.includes("open dm")
    ){
      navigate("/dm")
      return
    }

    /* LEADERBOARD */

    if(
      text.includes("leaderboard") ||
      text.includes("rankings") ||
      text.includes("scores")
    ){
      navigate("/leaderboard")
      return
    }

    /* PROFILE */

    if(
      text.includes("profile") ||
      text.includes("my profile") ||
      text.includes("open profile")
    ){
      navigate("/profile")
      return
    }

    /* FITNESS DASHBOARD */

    if(
      text.includes("fitness") ||
      text.includes("fitness dashboard")
    ){
      navigate("/fitness")
      return
    }

    /* SOLO WORKOUT */

    if(
      text.includes("solo") ||
      text.includes("solo workout") ||
      text.includes("start solo")
    ){
      navigate("/solo")
      return
    }

    /* BURNOUTS */

    if(
      text.includes("burnout") ||
      text.includes("burnouts")
    ){
      navigate("/burnouts")
      return
    }

    /* LIVE MODE */

    if(
      text.includes("live") ||
      text.includes("live match") ||
      text.includes("competition")
    ){
      navigate("/live")
      return
    }

    /* SHOP */

    if(
      text.includes("shop") ||
      text.includes("store") ||
      text.includes("merch")
    ){
      navigate("/shop")
      return
    }

    /* SETTINGS */

    if(
      text.includes("settings") ||
      text.includes("open settings")
    ){
      navigate("/settings")
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
