import { Container, Grid } from "@material-ui/core"
import React, { useState } from "react"
import { db, getTimeStamp } from "../firebase/config"

import NoteCard from "./NoteCard"
import TextField from "@material-ui/core/TextField"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogTitle from "@material-ui/core/DialogTitle"
import { useHistory } from "react-router-dom"
import Button from "@material-ui/core/Button"

export default function Home({ notes }) {
  const AddNoteDialog = () => {
    const history = useHistory()
    const [open, setOpen] = useState(false)
    const [newTitle, setNewTitle] = useState("")
    const handleClickOpen = () => {
      setOpen(true)
    }

    const handleClose = () => {
      setOpen(false)
    }

    const createNote = () => {
      console.log(newTitle)

      const note = {
        title: newTitle,
        body: "",
        createdAt: getTimeStamp(),
        updatedAt: getTimeStamp(),
      }
      db.collection("notes")
        .add(note)
        .then((snap) => {
          history.push("/" + snap.id)
        })

      handleClose()
    }

    return (
      <>
        <Button onClick={handleClickOpen}>Create New</Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Create a new Note</DialogTitle>
          <DialogContent>
            <TextField
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              autoFocus
              margin="dense"
              id="name"
              label="Title"
              type="text"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={createNote} color="primary">
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </>
    )
  }

  return (
    <>
      <Container>
        <h1 style={{ textAlign: "center", fontSize: "3rem" }}>
          My Markdown Editor
        </h1>
        <AddNoteDialog />
        <Grid container spacing={3} justify>
          {notes && notes.map((note) => <NoteCard note={note} />)}
        </Grid>
      </Container>
    </>
  )
}
