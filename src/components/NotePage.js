import { Button, ButtonGroup, Container, Grid } from "@material-ui/core"
import React, { useEffect, useState } from "react"
import MDEditor from "@uiw/react-md-editor"
import Navbar from "./Navbar"
import { useHistory, useParams } from "react-router-dom"
import { db, getTimeStamp } from "../firebase/config"

import useMediaQuery from "@material-ui/core/useMediaQuery"
import NotePageMobile from "./NotePageMobile"

function NotePage({ notes }) {
  const [value, setValue] = useState("")
  const [note, setNote] = useState(null)
  const history = useHistory()
  const isMobile = useMediaQuery("(max-width:980px)")
  const { id } = useParams()

  useEffect(() => {
    db.collection("notes")
      .doc(id)
      .get()
      .then((snap) => {
        console.log(snap)
        setNote(snap.data())
        setValue(snap.data().body)
      })
  }, [id])

  function updateDocument() {
    db.collection("notes")
      .doc(id)
      .update({
        ...note,
        body: value,
        updatedAt: getTimeStamp(),
      })
      .then(console.log("updated"))
  }

  function deleteDocument() {
    db.collection("notes").doc(id).delete().then(history.push("/"))
  }

  function updateTitle(title) {
    db.collection("notes")
      .doc(id)
      .update({
        ...note,
        title,
        body: value,
        updatedAt: getTimeStamp(),
      })
      .then(console.log("updated"))
  }

  function editorChangeHandler(e) {
    setValue(e.target.value)
  }

  return (
    <div>
      <Navbar notes={notes} title={note?.title} updateTitle={updateTitle} />

      <Container>
        <ButtonGroup
          color={"secondary"}
          aria-label="outlined secondary button group"
        >
          <Button
            onClick={deleteDocument}
            variant="contained"
            color="default"
            size="small"
          >
            Delete
          </Button>
          <Button
            onClick={updateDocument}
            variant="contained"
            color="default"
            size="small"
          >
            Save
          </Button>
        </ButtonGroup>

        {isMobile ? (
          <NotePageMobile
            value={value}
            editorChangeHandler={editorChangeHandler}
          />
        ) : (
          <Grid container spacing={6}>
            <Grid item xs={12} md={6}>
              <div>
                <h3>Edit View</h3>

                <textarea
                  style={{
                    fontSize: "1.5rem",
                    width: "100%",
                    height: "80vh",
                    resize: "none",
                    padding: "20px",
                    outline: "none",
                  }}
                  value={value}
                  onChange={(e) => editorChangeHandler(e)}
                />
              </div>
            </Grid>

            <Grid item xs={12} md={6}>
              <h3>Live Preview</h3>

              <MDEditor.Markdown
                style={{
                  border: "1px solid black",
                  width: "100%",

                  padding: "20px 10px",
                  height: "80vh",
                }}
                source={value}
              />
            </Grid>
          </Grid>
        )}
      </Container>
    </div>
  )
}

export default NotePage
