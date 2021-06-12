import React, { createContext, useContext, useEffect, useState } from "react"
import { db } from "./firebase/config"

const NotesContext = createContext()

export const useNotes = () => {
  return useContext(NotesContext)
}

function NotesProvider({ children }) {
  const [notes, setNotes] = useState(null)

  useEffect(() => {
    return (
      db
        .collection("notes")
        // .orderBy("updatedAt", "desc")
        .onSnapshot((snap) => {
          const notes = snap.docs.map((doc) => {
            return { ...doc.data(), id: doc.id }
          })
          setNotes(notes)
        })
    )
  }, [])

  return <NotesContext.Provider value={notes}>{children}</NotesContext.Provider>
}

export default NotesProvider
