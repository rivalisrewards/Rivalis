import { useEffect, useState } from "react"
import { auth, db } from "../firebase"
import { doc, getDoc } from "firebase/firestore"

export default function useAdmin() {

  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    async function checkRole() {

      if (!auth.currentUser) {
        setLoading(false)
        return
      }

      try {

        const ref = doc(db, "users", auth.currentUser.uid)
        const snap = await getDoc(ref)

        if (snap.exists()) {

          const data = snap.data()

          if (data.role === "admin") {
            setIsAdmin(true)
          }

        }

      } catch (error) {
        console.error(error)
      }

      setLoading(false)

    }

    checkRole()

  }, [])

  return { isAdmin, loading }
}
