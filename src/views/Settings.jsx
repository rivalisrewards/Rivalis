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

  const [coachVoice,setCoachVoice] = useState(true)
  const [accessibilityMode,setAccessibilityMode] = useState(false)

  useEffect(()=>{

    if(!userProfile) return

    setNickname(userProfile.nickname || "")
    setVoiceEnabled(userProfile.voiceEnabled || false)
    setTtsEnabled(userProfile.ttsEnabled || false)
    setWakeWord(userProfile.wakeWord || "rivalis")

    setNotifications(userProfile.notifications ?? true)
    setDarkMode(userProfile.darkMode ?? false)

    setCoachVoice(userProfile.coachVoice ?? true)
    setAccessibilityMode(userProfile.accessibilityMode ?? false)

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
        darkMode,
        coachVoice,
        accessibilityMode

      })

      speak("Settings saved successfully")

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

      {/* PROFILE */}

      <div style={styles.sectionTitle}>Profile</div>

      <div style={styles.row}>
        <label>Nickname</label>

        <input
          value={nickname}
          onChange={(e)=>setNickname(e.target.value)}
          style={styles.input}
        />
      </div>

      {/* VOICE SYSTEM */}

      <div style={styles.sectionTitle}>Voice System</div>

      <div style={styles.row}>
        <label>Voice Control</label>

        <input
          type="checkbox"
          checked={voiceEnabled}
          onChange={(e)=>setVoiceEnabled(e.target.checked)}
        />
      </div>

      <div style={styles.row}>
        <label>Text To Speech</label>

        <input
          type="checkbox"
          checked={ttsEnabled}
          onChange={(e)=>setTtsEnabled(e.target.checked)}
        />
      </div>

      <div style={styles.row}>
        <label>Wake Word</label>

        <input
          value={wakeWord}
          onChange={(e)=>setWakeWord(e.target.value)}
          style={styles.input}
        />
      </div>

      <button
        onClick={testVoice}
        style={styles.secondaryButton}
      >
        Test Voice
      </button>

      {/* AI COACH */}

      <div style={styles.sectionTitle}>AI Coach</div>

      <div style={styles.row}>
        <label>Coach Voice Feedback</label>

        <input
          type="checkbox"
          checked={coachVoice}
          onChange={(e)=>setCoachVoice(e.target.checked)}
        />
      </div>

      {/* ACCESSIBILITY */}

      <div style={styles.sectionTitle}>Accessibility</div>

      <div style={styles.row}>
        <label>Accessibility Mode</label>

        <input
          type="checkbox"
          checked={accessibilityMode}
          onChange={(e)=>setAccessibilityMode(e.target.checked)}
        />
      </div>

      {/* APP SETTINGS */}

      <div style={styles.sectionTitle}>App Settings</div>

      <div style={styles.row}>
        <label>Notifications</label>

        <input
          type="checkbox"
          checked={notifications}
          onChange={(e)=>setNotifications(e.target.checked)}
        />
      </div>

      <div style={styles.row}>
        <label>Dark Mode</label>

        <input
          type="checkbox"
          checked={darkMode}
          onChange={(e)=>setDarkMode(e.target.checked)}
        />
      </div>

      {/* SAVE */}

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

const styles={

  page:{
    maxWidth:700,
    margin:"40px auto",
    padding:20,
    color:"#fff"
  },

  title:{
    fontSize:32,
    marginBottom:20
  },

  sectionTitle:{
    fontSize:18,
    marginTop:30,
    marginBottom:10,
    opacity:.7
  },

  row:{
    display:"flex",
    justifyContent:"space-between",
    alignItems:"center",
    marginBottom:15
  },

  input:{
    padding:8,
    borderRadius:6,
    border:"1px solid #444",
    background:"#111",
    color:"#fff"
  },

  primaryButton:{
    width:"100%",
    marginTop:30,
    padding:14,
    background:"#e11d48",
    border:"none",
    borderRadius:10,
    color:"#fff",
    fontSize:16,
    cursor:"pointer"
  },

  secondaryButton:{
    width:"100%",
    padding:10,
    marginTop:10,
    background:"#333",
    border:"none",
    borderRadius:8,
    color:"#fff",
    cursor:"pointer"
  }

}
