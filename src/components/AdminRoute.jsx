import { Navigate } from "react-router-dom"
import useAdmin from "../hooks/useAdmin"

export default function AdminRoute({ children }) {

  const { isAdmin, loading } = useAdmin()

  if (loading) return null

  if (!isAdmin) {
    return <Navigate to="/dashboard" />
  }

  return children
}
