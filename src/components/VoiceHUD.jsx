import React, { useContext } from "react"
import { VoiceContext } from "../voice/VoiceProvider"

export default function VoiceHUD(){

  const { voiceActive } = useContext(VoiceContext)

  if(!voiceActive) return null

  return(

    <div style={styles.container}>

      <div style={styles.pulse}></div>

      <span style={styles.text}>
        Listening...
      </span>

    </div>

  )

}

const styles = {

  container:{
    position:"fixed",
    bottom:20,
    right:20,
    display:"flex",
    alignItems:"center",
    gap:10,
    background:"rgba(0,0,0,0.8)",
    padding:"10px 14px",
    borderRadius:12,
    color:"#fff",
    fontSize:14,
    zIndex:9999
  },

  pulse:{
    width:12,
    height:12,
    borderRadius:"50%",
    background:"#ef4444",
    animation:"voicePulse 1.5s infinite"
  },

  text:{
    fontWeight:500
  }

}
