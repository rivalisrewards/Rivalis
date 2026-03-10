import React, { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";

export default function Settings({ userProfile }) {

  const [nickname, setNickname] = useState("");
  const [ttsEnabled, setTtsEnabled] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [voiceRate, setVoiceRate] = useState(1);
  const [voicePitch, setVoicePitch] = useState(1);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {

    if (!userProfile) return;

    setNickname(userProfile.nickname || "");
    setTtsEnabled(userProfile.ttsEnabled ?? true);
    setVoiceEnabled(userProfile.voiceControlEnabled ?? false);
    setVoiceRate(userProfile.voiceRate ?? 1);
    setVoicePitch(userProfile.voicePitch ?? 1);

  }, [userProfile]);

  const saveSettings = async () => {

    if (!auth.currentUser) return;

    setSaving(true);
    setSaved(false);

    try {

      const ref = doc(db, "users", auth.currentUser.uid);

      await updateDoc(ref, {
        nickname,
        ttsEnabled,
        voiceControlEnabled: voiceEnabled,
        voiceRate,
        voicePitch
      });

      setSaved(true);

    } catch (err) {
      console.error("Settings save error:", err);
    }

    setSaving(false);

  };

  const testVoice = () => {

    if (!ttsEnabled) return;

    const utterance = new SpeechSynthesisUtterance(
      "Rivalis voice system online."
    );

    utterance.rate = voiceRate;
    utterance.pitch = voicePitch;

    speechSynthesis.speak(utterance);

  };

  return (

    <div style={styles.container}>

      <h1>Settings</h1>

      <div style={styles.card}>

        <h2>Account</h2>

        <label>Nickname</label>

        <input
          value={nickname}
          onChange={(e)=>setNickname(e.target.value)}
          style={styles.input}
        />

      </div>

      <div style={styles.card}>

        <h2>Voice System</h2>

        <div style={styles.row}>

          <label>Text To Speech</label>

          <input
            type="checkbox"
            checked={ttsEnabled}
            onChange={()=>setTtsEnabled(!ttsEnabled)}
          />

        </div>

        <div style={styles.row}>

          <label>Voice Control</label>

          <input
            type="checkbox"
            checked={voiceEnabled}
            onChange={()=>setVoiceEnabled(!voiceEnabled)}
          />

        </div>

        <div style={styles.sliderGroup}>

          <label>Voice Speed</label>

          <input
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            value={voiceRate}
            onChange={(e)=>setVoiceRate(parseFloat(e.target.value))}
          />

          <span>{voiceRate.toFixed(1)}</span>

        </div>

        <div style={styles.sliderGroup}>

          <label>Voice Pitch</label>

          <input
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            value={voicePitch}
            onChange={(e)=>setVoicePitch(parseFloat(e.target.value))}
          />

          <span>{voicePitch.toFixed(1)}</span>

        </div>

        <button style={styles.testButton} onClick={testVoice}>
          Test Voice
        </button>

      </div>

      <button
        style={styles.saveButton}
        onClick={saveSettings}
      >
        {saving ? "Saving..." : "Save Settings"}
      </button>

      {saved && (
        <p style={{color:"#4CAF50",marginTop:"10px"}}>
          Settings saved successfully
        </p>
      )}

    </div>

  );

}

const styles = {

  container:{
    padding:"30px",
    maxWidth:"700px",
    margin:"auto",
    color:"#fff"
  },

  card:{
    background:"#111",
    padding:"20px",
    borderRadius:"10px",
    marginBottom:"20px",
    display:"flex",
    flexDirection:"column",
    gap:"12px",
    border:"1px solid rgba(255,48,80,0.2)"
  },

  input:{
    padding:"10px",
    borderRadius:"6px",
    border:"none",
    background:"#222",
    color:"#fff"
  },

  row:{
    display:"flex",
    justifyContent:"space-between",
    alignItems:"center"
  },

  sliderGroup:{
    display:"flex",
    alignItems:"center",
    gap:"10px"
  },

  testButton:{
    background:"#444",
    border:"none",
    padding:"10px",
    color:"#fff",
    borderRadius:"6px",
    cursor:"pointer"
  },

  saveButton:{
    background:"#ff3050",
    border:"none",
    padding:"12px",
    color:"#fff",
    borderRadius:"8px",
    cursor:"pointer",
    fontWeight:"bold",
    width:"100%"
  }

};
