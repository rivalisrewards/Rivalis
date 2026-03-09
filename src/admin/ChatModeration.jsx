import { useEffect, useState } from "react"
import { db } from "../firebase"
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore"

export default function ChatModeration() {

  const [messages, setMessages] = useState([])

  useEffect(() => {

    const unsub = onSnapshot(
      collection(db, "globalChat"),
      snap => {

        setMessages(
          snap.docs.map(d => ({
            id: d.id,
            ...d.data()
          }))
        )

      }
    )

    return unsub

  }, [])

  async function deleteMessage(id) {

    await deleteDoc(doc(db, "globalChat", id))

  }

  return (

    <div>

      <h1>Chat Moderation</h1>

      {messages.map(msg => (

        <div key={msg.id}>

          <b>{msg.username}</b>

          <p>{msg.text}</p>

          <button onClick={() => deleteMessage(msg.id)}>
            Delete
          </button>

        </div>

      ))}

    </div>

  )
}
