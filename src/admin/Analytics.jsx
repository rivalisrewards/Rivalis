import { useEffect, useState } from "react"
import { db } from "../firebase"
import { collection, getDocs } from "firebase/firestore"

export default function Analytics() {

  const [stats, setStats] = useState({
    users: 0,
    matches: 0,
    messages: 0,
    leaderboards: 0
  })

  const [loading, setLoading] = useState(true)

  useEffect(() => {

    async function loadAnalytics() {

      try {

        const usersSnap = await getDocs(collection(db, "users"))
        const matchesSnap = await getDocs(collection(db, "matches"))
        const chatSnap = await getDocs(collection(db, "globalChat"))
        const leaderboardSnap = await getDocs(collection(db, "leaderboards"))

        setStats({
          users: usersSnap.size,
          matches: matchesSnap.size,
          messages: chatSnap.size,
          leaderboards: leaderboardSnap.size
        })

      } catch (error) {
        console.error("Analytics load error:", error)
      }

      setLoading(false)

    }

    loadAnalytics()

  }, [])

  if (loading) {
    return (
      <div className="admin-page">
        <h1>Analytics</h1>
        <p>Loading...</p>
      </div>
    )
  }

  return (

    <div className="admin-page">

      <h1>Platform Analytics</h1>

      <div className="analytics-grid">

        <div className="analytics-card">
          <h3>Total Users</h3>
          <p>{stats.users}</p>
        </div>

        <div className="analytics-card">
          <h3>Total Matches</h3>
          <p>{stats.matches}</p>
        </div>

        <div className="analytics-card">
          <h3>Global Messages</h3>
          <p>{stats.messages}</p>
        </div>

        <div className="analytics-card">
          <h3>Leaderboards</h3>
          <p>{stats.leaderboards}</p>
        </div>

      </div>

    </div>

  )
}
