import React, { useState, useEffect } from "react"
import { Switch, Route } from "react-router-dom"
import "./App.css"
import Home from "./components/Home"
import { db} from "./firebase/config"
import NotePage from "./components/NotePage"

export default function App() {
  const [notes, setNotes] = useState(null)
  useEffect(() => {
    return db
      .collection("notes")
      .orderBy("createdAt", "desc")
      .onSnapshot((snap) => {
        const notes = snap.docs.map((doc) => {
          return { ...doc.data(), id: doc.id }
        })
        setNotes(notes)
      })
  }, [])
  return (
    <div>
      <Switch>
        <Route
          exact
          path="/"
          render={() => {
            return <Home notes={notes} />
          }}
        />
        <Route
          path="/:id"
          render={() => {
            return <NotePage notes={notes} />
          }}
        />
      </Switch>
    </div>
  )
}
