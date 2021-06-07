import { Button, ButtonGroup, Container, Grid } from "@material-ui/core"
import React, { useEffect, useState } from "react"
import debounce from "../utils/helpers"
import MDEditor from "@uiw/react-md-editor"
import Navbar from "./Navbar"
import { useHistory, useParams } from "react-router-dom"
import { db, getTimeStamp } from "../firebase/config"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Switch from "@material-ui/core/Switch"

function NotePageMobile({ value, editorChangeHandler }) {
  const [previewView, setPreviewView] = useState(false)
  return (
    <>
      <FormControlLabel
        control={
          <Switch
            checked={previewView}
            onChange={() => setPreviewView(!previewView)}
          />
        }
        label={previewView ? "Live View" : "Edit View"}
      />
      {/* <Button onClick={() => setPreviewView(!previewView)}>{previewView?"C"}</Button> */}
      {previewView ? (
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
      ) : (
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
      )}
    </>
  )
}

export default NotePageMobile
