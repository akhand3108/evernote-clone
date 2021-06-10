import {  Grid } from "@material-ui/core"
import React, {  useState } from "react"
import MDEditor from "@uiw/react-md-editor"

import FormControlLabel from "@material-ui/core/FormControlLabel"
import Switch from "@material-ui/core/Switch"

function NotePageMobile({ value, editorChangeHandler }) {
  const [previewView, setPreviewView] = useState(false)
  return (
    <>
      <p style={{color:"#EB9486"}}>Live View
          <Switch
            checked={previewView}
            onChange={() => setPreviewView(!previewView)}
          />
        
        Edit View  </p>    
      {/* <Button onClick={() => setPreviewView(!previewView)}>{previewView?"C"}</Button> */}
      {previewView ? (
        <Grid item xs={12} md={6}>
          <div>
                <h3 style={{color: "#FB8B24"}}>Edit View</h3>

            <textarea
              style={{
                fontSize: "1.2rem",
                width: "100%",
                height: "80vh",
                resize: "none",
                padding: "10px 20px",
                marginBottom: "40px",
                outline: "none", color:"#D6D4A0",
                backgroundColor: "#140F2D"
                
              }}
              value={value}
              onChange={(e) => editorChangeHandler(e)}
            />
          </div>
        </Grid>
      ) : (
        <Grid item xs={12} md={6}>
        <h3 style={{color: "#FF7733"}}>Live Preview</h3>

          <MDEditor.Markdown
            style={{
              fontSize:"1.2rem",
              border: "1px solid black",
              width: "100%",
              marginBottom: "40px",
              padding: "20px 10px",
              height: "80vh",
              color:"#D6D4A0",
              backgroundColor: "#140F2D"
            }}
            source={value}
          />
        </Grid>
      )}
    </>
  )
}

export default NotePageMobile
