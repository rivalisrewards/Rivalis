import { useState } from "react"
import { db } from "../firebase"
import { addDoc, collection } from "firebase/firestore"

export default function BroadcastPanel() {

  const [message, setMessage] = useState("")

  async function sendBroadcast() {

    await addDoc(collection(db, "announcements"), {
      text: message,
      created: Date.now()
    })

    setMessage("")

  }

  return (

    <div>

      <h1>Broadcast Announcement</h1>

      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button onClick={sendBroadcast}>
        Send
      </button>

    </div>

  )
}
