import React, { useEffect, useState } from "react"
import { auth, db } from "../firebase"
import { doc, getDoc, updateDoc } from "firebase/firestore"

export default function Settings(){

  const [loading,setLoading] = useState(true)
  const [wakeWord,setWakeWord] = useState("rival")
  const [saving,setSaving] = useState(false)

  const user = auth.currentUser

  useEffect(()=>{

    const loadSettings = async ()=>{

      if(!user){
        setLoading(false)
        return
      }

      try{

        const ref = doc(db,"users",user.uid)
        const snap = await getDoc(ref)

        if(snap.exists()){

          const data = snap.data()

          if(data.wakeWord)
            setWakeWord(data.wakeWord)

        }

      }catch(error){

        console.error("Settings load error:",error)

      }

      setLoading(false)

    }

    loadSettings()

  },[user])

  const saveWakeWord = async ()=>{

    if(!user) return

    const cleaned = wakeWord.trim().toLowerCase()

    if(cleaned.length < 2) return

    try{

      setSaving(true)

      const ref = doc(db,"users",user.uid)

      await updateDoc(ref,{
        wakeWord: cleaned
      })

    }catch(error){

      console.error("Wake word update failed:",error)

    }

    setSaving(false)

  }

  if(loading)
    return (
      <div style={{padding:"2rem"}}>
        Loading settings...
      </div>
    )

  return(

    <div
      style={{
        maxWidth:"900px",
        margin:"0 auto",
        padding:"2rem",
        color:"#fff"
      }}
    >

      <h1 style={{marginBottom:"2rem"}}>Settings</h1>

      <section
        style={{
          background:"#111",
          padding:"1.5rem",
          borderRadius:"10px",
          marginBottom:"2rem",
          border:"1px solid rgba(255,0,0,0.2)"
        }}
      >

        <h2 style={{marginBottom:"1rem"}}>Voice Control</h2>

        <div style={{marginBottom:"1rem"}}>

          <label
            style={{
              display:"block",
              marginBottom:"6px",
              fontWeight:"600"
            }}
          >
            Wake Word
          </label>

          <input
            value={wakeWord}
            onChange={(e)=>setWakeWord(e.target.value)}
            style={{
              padding:"10px",
              width:"260px",
              borderRadius:"6px",
              border:"1px solid #333",
              background:"#000",
              color:"#fff"
            }}
          />

        </div>

        <button
          onClick={saveWakeWord}
          disabled={saving}
          style={{
            padding:"10px 18px",
            borderRadius:"6px",
            background:"#ff3030",
            border:"none",
            color:"#fff",
            cursor:"pointer"
          }}
        >
          {saving ? "Saving..." : "Save Wake Word"}
        </button>

      </section>


      <section
        style={{
          background:"#111",
          padding:"1.5rem",
          borderRadius:"10px",
          border:"1px solid rgba(255,0,0,0.2)"
        }}
      >

        <h2 style={{marginBottom:"1rem"}}>Voice Commands</h2>

        <ul style={{lineHeight:"1.8"}}>

          <li>Rival dashboard</li>
          <li>Rival open chat</li>
          <li>Rival open dm</li>
          <li>Rival leaderboard</li>
          <li>Rival open profile</li>
          <li>Rival fitness dashboard</li>
          <li>Rival solo</li>
          <li>Rival burnouts</li>
          <li>Rival live competition</li>
          <li>Rival pause workout</li>
          <li>Rival resume workout</li>
          <li>Rival exit workout</li>
          <li>Rival cards left</li>

        </ul>

      </section>

    </div>

  )

}
