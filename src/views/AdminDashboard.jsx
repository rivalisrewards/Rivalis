import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {

  const navigate = useNavigate();

  const [stats, setStats] = useState({
    users: 0,
    matches: 0,
    messages: 0,
    leaderboards: 0
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    async function loadStats() {

      try {

        const usersSnap = await getDocs(collection(db, "users"));
        const matchesSnap = await getDocs(collection(db, "matches"));
        const chatSnap = await getDocs(collection(db, "globalChat"));
        const leaderboardSnap = await getDocs(collection(db, "leaderboards"));

        setStats({
          users: usersSnap.size,
          matches: matchesSnap.size,
          messages: chatSnap.size,
          leaderboards: leaderboardSnap.size
        });

      } catch (err) {
        console.error(err);
      }

      setLoading(false);
    }

    loadStats();

  }, []);

  if (loading) {
    return (
      <div className="admin-container">
        <h1>Admin Dashboard</h1>
        <p>Loading...</p>
      </div>
    );
  }

  return (

    <div className="admin-container">

      <h1>Rivalis Admin Control</h1>

      <div className="admin-stats">

        <div className="admin-card">
          <h3>Total Users</h3>
          <p>{stats.users}</p>
        </div>

        <div className="admin-card">
          <h3>Total Matches</h3>
          <p>{stats.matches}</p>
        </div>

        <div className="admin-card">
          <h3>Chat Messages</h3>
          <p>{stats.messages}</p>
        </div>

        <div className="admin-card">
          <h3>Leaderboards</h3>
          <p>{stats.leaderboards}</p>
        </div>

      </div>

      <div className="admin-actions">

        <button onClick={() => navigate("/admin/users")}>
          User Manager
        </button>

        <button onClick={() => navigate("/admin/chat")}>
          Chat Moderation
        </button>

        <button onClick={() => navigate("/admin/matches")}>
          Live Matches
        </button>

        <button onClick={() => navigate("/admin/analytics")}>
          Analytics
        </button>

      </div>

    </div>

  );
}
