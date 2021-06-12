import TextField from "@material-ui/core/TextField"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogTitle from "@material-ui/core/DialogTitle"
import { useHistory } from "react-router-dom"
import Button from "@material-ui/core/Button"
import { db, getTimeStamp } from "../firebase/config"
import React, { useState } from "react"
import { Box } from "@material-ui/core"

export default function AddNoteDialog(){
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
        published: false,
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
        <Box display="flex" justifyContent="flex-end">
        <Button mx={20} size="small" variant="contained" color="primary" onClick={handleClickOpen}>Create New</Button>
        </Box>
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