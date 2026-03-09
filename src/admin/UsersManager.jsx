import { useEffect, useState } from "react"
import { db } from "../firebase"
import { collection, getDocs, updateDoc, doc } from "firebase/firestore"

export default function UsersManager() {

  const [users, setUsers] = useState([])

  useEffect(() => {

    async function loadUsers() {

      const snap = await getDocs(collection(db, "users"))

      setUsers(
        snap.docs.map(d => ({
          id: d.id,
          ...d.data()
        }))
      )
    }

    loadUsers()

  }, [])

  async function banUser(uid) {

    await updateDoc(doc(db, "users", uid), {
      banned: true
    })

    alert("User banned")

  }

  return (

    <div>

      <h1>User Management</h1>

      {users.map(user => (

        <div key={user.id} className="admin-user-card">

          <p>{user.displayName}</p>

          <button onClick={() => banUser(user.id)}>
            Ban
          </button>

        </div>

      ))}

    </div>

  )
}
