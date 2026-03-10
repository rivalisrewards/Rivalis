import React, { useEffect, useState } from "react"
import { auth, db } from "../firebase"
import { doc, getDoc, updateDoc } from "firebase/firestore"

export default function Settings(){

const user = auth.currentUser

const [loading,setLoading] = useState(true)
const [saving,setSaving] = useState(false)

const [nickname,setNickname] = useState("")
const [wakeWord,setWakeWord] = useState("rival")

const [ttsEnabled,setTtsEnabled] = useState(true)
const [screenReader,setScreenReader] = useState(false)

const [voiceName,setVoiceName] = useState("")
const [voiceRate,setVoiceRate] = useState(1)
const [voicePitch,setVoicePitch] = useState(1)

const [notificationsEnabled,setNotificationsEnabled] = useState(true)
const [matchAlerts,setMatchAlerts] = useState(true)
const [chatAlerts,setChatAlerts] = useState(true)

const [voices,setVoices] = useState([])

useEffect(()=>{

const loadVoices = ()=>{

const v = speechSynthesis.getVoices()

setVoices(v)

if(v.length && !voiceName){
setVoiceName(v[0].name)
}

}

loadVoices()

speechSynthesis.onvoiceschanged = loadVoices

},[])

useEffect(()=>{

const loadSettings = async()=>{

if(!user){
setLoading(false)
return
}

try{

const ref = doc(db,"users",user.uid)
const snap = await getDoc(ref)

if(snap.exists()){

const data = snap.data()

if(data.nickname) setNickname(data.nickname)
if(data.wakeWord) setWakeWord(data.wakeWord)

if(data.ttsEnabled !== undefined)
setTtsEnabled(data.ttsEnabled)

if(data.screenReader !== undefined)
setScreenReader(data.screenReader)

if(data.selectedVoice)
setVoiceName(data.selectedVoice)

if(data.voiceRate)
setVoiceRate(data.voiceRate)

if(data.voicePitch)
setVoicePitch(data.voicePitch)

if(data.notificationsEnabled !== undefined)
setNotificationsEnabled(data.notificationsEnabled)

if(data.matchAlerts !== undefined)
setMatchAlerts(data.matchAlerts)

if(data.chatAlerts !== undefined)
setChatAlerts(data.chatAlerts)

}

}catch(err){

console.error("Settings load error",err)

}

setLoading(false)

}

loadSettings()

},[user])

const speak = (text)=>{

if(!ttsEnabled) return

const msg = new SpeechSynthesisUtterance(text)

const selected = voices.find(v=>v.name === voiceName)

if(selected) msg.voice = selected

msg.rate = voiceRate
msg.pitch = voicePitch

speechSynthesis.speak(msg)

}

const testVoice = ()=>{

speak("Voice settings updated successfully")

}

const saveSettings = async()=>{

if(!user) return

setSaving(true)

try{

const ref = doc(db,"users",user.uid)

await updateDoc(ref,{

nickname,
wakeWord:wakeWord.toLowerCase(),

ttsEnabled,
screenReader,

selectedVoice:voiceName,
voiceRate,
voicePitch,

notificationsEnabled,
matchAlerts,
chatAlerts

})

speak("Settings saved")

}catch(err){

console.error("Save settings failed",err)

}

setSaving(false)

}

if(loading){
return <div style={{padding:"2rem"}}>Loading settings...</div>
}

return(

<div style={{maxWidth:"900px",margin:"0 auto",padding:"2rem",color:"#fff"}}>

<h1 style={{marginBottom:"2rem"}}>Settings</h1>

{/* PROFILE */}

<section style={{background:"#111",padding:"1.5rem",borderRadius:"10px",marginBottom:"2rem"}}>

<h2>Profile</h2>

<label>Nickname</label>

<input
value={nickname}
onChange={(e)=>setNickname(e.target.value)}
style={{display:"block",marginTop:"6px",padding:"8px"}}
/>

</section>


{/* VOICE */}

<section style={{background:"#111",padding:"1.5rem",borderRadius:"10px",marginBottom:"2rem"}}>

<h2>Voice Assistant</h2>

<label>

<input
type="checkbox"
checked={ttsEnabled}
onChange={(e)=>setTtsEnabled(e.target.checked)}
/>

Enable Voice Feedback

</label>

<br/><br/>

<label>

<input
type="checkbox"
checked={screenReader}
onChange={(e)=>setScreenReader(e.target.checked)}
/>

Read Interface Aloud

</label>

<br/><br/>

<label>Wake Word</label>

<input
value={wakeWord}
onChange={(e)=>setWakeWord(e.target.value)}
style={{marginLeft:"10px"}}
/>

<br/><br/>

<label>Voice</label>

<select
value={voiceName}
onChange={(e)=>setVoiceName(e.target.value)}
style={{marginLeft:"10px"}}
>

{voices.map(v=>(
<option key={v.name} value={v.name}>
{v.name}
</option>
))}

</select>

<br/><br/>

<label>Voice Speed</label>

<input
type="range"
min="0.5"
max="2"
step="0.1"
value={voiceRate}
onChange={(e)=>setVoiceRate(parseFloat(e.target.value))}
/>

<br/><br/>

<label>Voice Pitch</label>

<input
type="range"
min="0.5"
max="2"
step="0.1"
value={voicePitch}
onChange={(e)=>setVoicePitch(parseFloat(e.target.value))}
/>

<br/><br/>

<button onClick={testVoice}>
Test Voice
</button>

</section>


{/* NOTIFICATIONS */}

<section style={{background:"#111",padding:"1.5rem",borderRadius:"10px",marginBottom:"2rem"}}>

<h2>Notifications</h2>

<label>

<input
type="checkbox"
checked={notificationsEnabled}
onChange={(e)=>setNotificationsEnabled(e.target.checked)}
/>

Enable Notifications

</label>

<br/><br/>

<label>

<input
type="checkbox"
checked={matchAlerts}
onChange={(e)=>setMatchAlerts(e.target.checked)}
/>

Match Alerts

</label>

<br/><br/>

<label>

<input
type="checkbox"
checked={chatAlerts}
onChange={(e)=>setChatAlerts(e.target.checked)}
/>

Chat Alerts

</label>

</section>


<button
onClick={saveSettings}
disabled={saving}
style={{
padding:"12px 20px",
background:"#ff3030",
border:"none",
borderRadius:"6px",
color:"#fff",
cursor:"pointer"
}}
>

{saving ? "Saving..." : "Save Settings"}

</button>

</div>

)

}
