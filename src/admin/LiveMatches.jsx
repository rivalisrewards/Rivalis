import { useEffect, useState } from "react"
import { db } from "../firebase"
import { collection, onSnapshot } from "firebase/firestore"

export default function LiveMatches() {

  const [matches, setMatches] = useState([])

  useEffect(() => {

    const unsub = onSnapshot(
      collection(db, "matches"),
      snap => {

        setMatches(
          snap.docs.map(d => ({
            id: d.id,
            ...d.data()
          }))
        )

      }
    )

    return unsub

  }, [])

  return (

    <div>

      <h1>Live Matches</h1>

      {matches.map(match => (

        <div key={match.id}>

          <p>{match.player1} vs {match.player2}</p>

        </div>

      ))}

    </div>

  )
}
