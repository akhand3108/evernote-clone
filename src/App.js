import React, { useState, useEffect } from "react"
import { Switch, Route } from "react-router-dom"
import "./App.css"
import Home from "./components/Home"
import { db} from "./firebase/config"
import EditPage from "./components/EditPage"
import PublishedPage from "./components/PublishedPage"

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
    <div className="app">
      <Switch>
        <Route
          exact
          path="/"
          render={() => {
            return <Home notes={notes} />
          }}
        />
        <Route exact
          path="/:id"
          render={() => {
            return <EditPage notes={notes} />
          }}
        />
        <Route exact
          path="/:userName/:noteTag"
          render={() => {
            return <PublishedPage/>
          }}
        />
      </Switch>
    </div>
  )
}
