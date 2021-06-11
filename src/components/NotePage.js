import { IconButton, Container, Grid, Input, Box } from "@material-ui/core"
import React, { useCallback, useEffect, useRef, useState } from "react"
import MDEditor from "@uiw/react-md-editor"
import Navbar from "./Navbar"
import { useHistory, useParams } from "react-router-dom"
import { db, getTimeStamp } from "../firebase/config"
import DeleteIcon from '@material-ui/icons/Delete';
import useMediaQuery from "@material-ui/core/useMediaQuery"
import debounce from "../utils/helpers"
import Hidden from '@material-ui/core/Hidden';
import Switch from "@material-ui/core/Switch"

function NotePage({ notes }) {
  const [value, setValue] = useState("")
  const [title, setTitle] = useState("")
  const [note, setNote] = useState(null)
  const history = useHistory()
  const isMobile = useMediaQuery("(max-width:980px)")
  const { id } = useParams()
  const delayedUpdate = useCallback(debounce((body) => updateDocument(body), 1500), [id])
  const delayedTitleUpdate = useCallback(debounce((title) => updateTitle(title), 1500), [id])
  const [previewView, setPreviewView] = useState(false)
  useEffect(() => {
    db.collection("notes")
      .doc(id)
      .get()
      .then((snap) => {
        setNote(snap.data())
        setValue(snap.data().body)
        setTitle(snap.data().title)
      })
  }, [id])



  function updateDocument(body) {
    db.collection("notes")
      .doc(id)
      .update({
        body: body,
        updatedAt: getTimeStamp(),
      })
      .then((snap) => console.log("updated", snap))
  }

  function deleteDocument() {
    db.collection("notes").doc(id).delete().then(history.push("/"))
  }

  function updateTitle(title) {
    db.collection("notes")
      .doc(id)
      .update({
        title,
        updatedAt: getTimeStamp(),
      })
      .then(console.log("updated"))
  }

  function titleFieldHandler(e) {
    setTitle(e.target.value)
    delayedTitleUpdate(e.target.value)
  }

  function editorChangeHandler(e) {
    setValue(e.target.value)
    delayedUpdate(e.target.value)
  }

  return (
    <div>
      <Navbar id={id} notes={notes} title={title} />

      <Container>

        <Box display="flex" justifyContent="center" m={1} p={1} >
          <Input style={{color: "#f9fafa",fontWeight: "bold", fontSize: "2rem",textAlign: "center"}} placeholder="Untitled" value={title} onChange={titleFieldHandler} />
          <IconButton color="secondary" aria-label="delete" onClick={deleteDocument}>
            <DeleteIcon />
          </IconButton>
        </Box>
        <Hidden mdUp><Box display="flex" alignItems="center" justifyContent="flex-end"  component="p" style={{ color: "#EB9486" }}>
          Live
          <Switch
            checked={previewView}
            onChange={() => setPreviewView(!previewView)}
          />
        Edit
        </Box></Hidden>


        <Grid container spacing={3}>

          <Hidden smDown={!previewView}>
            <Grid item xs={12} md={6}>
              <Box component="div">

                <h3 style={{ color: "#FB8B24" }}>Edit View</h3>
                <textarea
                  style={{
                    fontSize: "1.2rem",
                    width: "100%",
                    height: "80vh",
                    resize: "none",
                    padding: "20px 40px",
                    outline: "none",
                    color: "#f9fafa",
                    backgroundColor: "#1a2634"
                  }}
                  value={value}
                  onChange={(e) => editorChangeHandler(e)}
                />
              </Box>
            </Grid>
          </Hidden>

          <Hidden smDown={previewView}>
            <Grid item xs={12} md={6}>
              <h3 style={{ color: "#FF7733" }}>Live Preview</h3>

              <MDEditor.Markdown
                style={{
                  boxShadow: "0px 0px 6px 4px rgba(0,0,0,0.43)",
                  width: "100%",
                  padding: "20px 40px",
                  height: "80vh",
                  borderRadius: "5px",
                  color: "#f9fafa",
                  backgroundColor: "#1a2634"
                }}
                source={value}
              />

            </Grid>

          </Hidden>
        </Grid>
      </Container>
    </div>
  )
}

export default NotePage
