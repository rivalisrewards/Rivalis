import { useEffect, useState } from "react"
import { auth, db } from "../firebase"
import { doc, getDoc } from "firebase/firestore"
import { onAuthStateChanged } from "firebase/auth"

export default function useAdmin() {

  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    let mounted = true

    const unsubscribe = onAuthStateChanged(auth, async (user) => {

      if (!mounted) return

      if (!user) {
        setIsAdmin(false)
        setLoading(false)
        return
      }

      try {

        const ref = doc(db, "users", user.uid)
        const snap = await getDoc(ref)

        if (!mounted) return

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

      if (mounted) setLoading(false)

    })

    return () => {
      mounted = false
      unsubscribe()
    }

  }, [])

  return { isAdmin, loading }

}
