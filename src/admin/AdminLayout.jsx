import { Link, Outlet } from "react-router-dom"

export default function AdminLayout() {

  return (

    <div className="admin-layout">

      <aside className="admin-sidebar">

        <h2>Rivalis Admin</h2>

        <Link to="/admin">Dashboard</Link>
        <Link to="/admin/users">Users</Link>
        <Link to="/admin/chat">Chat</Link>
        <Link to="/admin/matches">Live Matches</Link>
        <Link to="/admin/leaderboards">Leaderboards</Link>
        <Link to="/admin/broadcast">Broadcast</Link>
        <Link to="/admin/analytics">Analytics</Link>

      </aside>

      <main className="admin-content">
        <Outlet />
      </main>

    </div>

  )
}
