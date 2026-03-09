import { useEffect, useState } from "react"
import { auth, db } from "../firebase"
import { doc, getDoc } from "firebase/firestore"
import { onAuthStateChanged } from "firebase/auth"

export default function useAdmin() {

  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, async (user) => {

      if (!user) {
        setIsAdmin(false)
        setLoading(false)
        return
      }

      try {

        const ref = doc(db, "users", user.uid)
        const snap = await getDoc(ref)

        if (snap.exists()) {
          const data = snap.data()
          setIsAdmin(data.role === "admin")
        } else {
          setIsAdmin(false)
        }

      } catch (error) {
        console.error(error)
        setIsAdmin(false)
      }

      setLoading(false)

    })

    return () => unsubscribe()

  }, [])

  return { isAdmin, loading }
}
