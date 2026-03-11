import React, { useEffect, useState, useContext } from "react"
import { auth, db } from "../firebase"
import { doc, updateDoc } from "firebase/firestore"

import { VoiceContext } from "../voice/VoiceProvider"

export default function Settings({ userProfile }){

  const { speak } = useContext(VoiceContext)

  const [loading,setLoading] = useState(false)

  const [nickname,setNickname] = useState("")
  const [voiceEnabled,setVoiceEnabled] = useState(false)
  const [ttsEnabled,setTtsEnabled] = useState(false)
  const [wakeWord,setWakeWord] = useState("rivalis")
  const [notifications,setNotifications] = useState(true)
  const [darkMode,setDarkMode] = useState(false)

  useEffect(()=>{

    if(!userProfile) return

    setNickname(userProfile.nickname || "")
    setVoiceEnabled(userProfile.voiceEnabled || false)
    setTtsEnabled(userProfile.ttsEnabled || false)
    setWakeWord(userProfile.wakeWord || "rivalis")
    setNotifications(userProfile.notifications ?? true)
    setDarkMode(userProfile.darkMode ?? false)

  },[userProfile])

  async function saveSettings(){

    try{

      setLoading(true)

      const uid = auth.currentUser.uid

      const ref = doc(db,"users",uid)

      await updateDoc(ref,{
        nickname,
        voiceEnabled,
        ttsEnabled,
        wakeWord,
        notifications,
        darkMode
      })

      if(ttsEnabled){

        speak("Settings saved")

      }

    }catch(err){

      console.error("Settings save error",err)

    }finally{

      setLoading(false)

    }

  }

  function testVoice(){

    speak("Voice system is active and ready")

  }

  return(

    <div style={styles.page}>

      <h1 style={styles.title}>Settings</h1>

      {/* Nickname */}

      <div style={styles.section}>
        <label>Nickname</label>

        <input
          value={nickname}
          onChange={(e)=>setNickname(e.target.value)}
          style={styles.input}
        />
      </div>


      {/* Voice Control */}

      <div style={styles.section}>

        <label>Voice Control</label>

        <input
          type="checkbox"
          checked={voiceEnabled}
          onChange={(e)=>setVoiceEnabled(e.target.checked)}
        />

      </div>


      {/* TTS */}

      <div style={styles.section}>

        <label>Text To Speech</label>

        <input
          type="checkbox"
          checked={ttsEnabled}
          onChange={(e)=>setTtsEnabled(e.target.checked)}
        />

      </div>


      {/* Wake Word */}

      <div style={styles.section}>

        <label>Wake Word</label>

        <input
          value={wakeWord}
          onChange={(e)=>setWakeWord(e.target.value)}
          style={styles.input}
        />

      </div>


      {/* Notifications */}

      <div style={styles.section}>

        <label>Notifications</label>

        <input
          type="checkbox"
          checked={notifications}
          onChange={(e)=>setNotifications(e.target.checked)}
        />

      </div>


      {/* Dark Mode */}

      <div style={styles.section}>

        <label>Dark Mode</label>

        <input
          type="checkbox"
          checked={darkMode}
          onChange={(e)=>setDarkMode(e.target.checked)}
        />

      </div>


      {/* Voice Test */}

      <button
        onClick={testVoice}
        style={styles.secondaryButton}
      >
        Test Voice
      </button>


      {/* Save */}

      <button
        onClick={saveSettings}
        disabled={loading}
        style={styles.primaryButton}
      >

        {loading ? "Saving..." : "Save Settings"}

      </button>

    </div>

  )

}

const styles = {

  page:{
    maxWidth:600,
    margin:"40px auto",
    padding:20,
    color:"#fff"
  },

  title:{
    fontSize:32,
    marginBottom:30
  },

  section:{
    marginBottom:20,
    display:"flex",
    justifyContent:"space-between",
    alignItems:"center"
  },

  input:{
    padding:8,
    borderRadius:6,
    border:"1px solid #555",
    background:"#111",
    color:"#fff"
  },

  primaryButton:{
    width:"100%",
    padding:14,
    marginTop:20,
    background:"#e11d48",
    border:"none",
    borderRadius:8,
    color:"#fff",
    fontSize:16,
    cursor:"pointer"
  },

  secondaryButton:{
    width:"100%",
    padding:12,
    marginTop:10,
    background:"#333",
    border:"none",
    borderRadius:8,
    color:"#fff",
    cursor:"pointer"
  }

}
