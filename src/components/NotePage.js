import { IconButton, Container, Grid ,Input,Box} from "@material-ui/core"
import React, { useCallback, useEffect, useRef, useState } from "react"
import MDEditor from "@uiw/react-md-editor"
import Navbar from "./Navbar"
import { useHistory, useParams } from "react-router-dom"
import { db, getTimeStamp } from "../firebase/config"

import DeleteIcon from '@material-ui/icons/Delete';
import useMediaQuery from "@material-ui/core/useMediaQuery"
import NotePageMobile from "./NotePageMobile"
import debounce from "../utils/helpers"

function NotePage({ notes }) {
  const [value, setValue] = useState("")
  const [title,setTitle] = useState("")
  const [note, setNote] = useState(null)
  const history = useHistory()
  const isMobile = useMediaQuery("(max-width:980px)")
  const { id } = useParams()
  const delayedUpdate = useCallback(debounce((body)=>updateDocument(body),1500),[id])
  const delayedTitleUpdate = useCallback(debounce((title)=>updateTitle(title),1500),[id])

  useEffect(() => {
   db.collection("notes")
      .doc(id)
      .get()
      .then((snap)=>{
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
      .then((snap)=>console.log("updated",snap))
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

  function titleFieldHandler(e){
    setTitle(e.target.value)
    delayedTitleUpdate(e.target.value)
  }

  function editorChangeHandler(e) {
    setValue(e.target.value)
    delayedUpdate(e.target.value)
  }

  return (
    <div>
      <Navbar id={id} notes={notes} title={title}  />

      <Container>
        
      <Box display="flex" justifyContent="center" m={1} p={1} >
      <Input  placeholder="Untitled" value={title} onChange={titleFieldHandler} />  
      <IconButton color="secondary" aria-label="delete" onClick={deleteDocument}><DeleteIcon/></IconButton>
</Box>
     
     
         

        {isMobile ? (
          <NotePageMobile
            value={value}
            editorChangeHandler={editorChangeHandler}
          />
        ) : (
          <Grid container spacing={6}>
            <Grid item xs={12} md={6}>
              <div>
                <h3 style={{color: "#FB8B24"}}>Edit View</h3>

                <textarea
                  style={{
                    fontSize: "1.2rem",
                    width: "100%",
                    height: "80vh",
                    resize: "none",
                    padding: "20px 40px",
                    outline: "none",
                    color:"#D6D4A0",
                    backgroundColor: "#140F2D"
                    
                  }}
                  value={value}
                  onChange={(e) => editorChangeHandler(e)}
                />
              </div>
            </Grid>

            <Grid item xs={12} md={6}>
              <h3 style={{color: "#FF7733"}}>Live Preview</h3>

              <MDEditor.Markdown
                style={{
                  border: "1px solid black",
                  width: "100%",
                  padding: "20px 10px",
                  height: "80vh",

              color:"#D6D4A0",
              backgroundColor: "#140F2D"
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
