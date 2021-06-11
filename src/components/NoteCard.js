import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import { Grid } from "@material-ui/core"
import { Link } from "react-router-dom"
import { db } from "../firebase/config"
import {getFormattedDate} from  "../utils/helpers"

const useStyles = makeStyles({
  root: {
    maxWidth: "100%",
    marginTop: 5,
    marginBottom: 5,
    color: "#f9fafa",
    backgroundColor: "#1a2634"
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
})



function NoteCard({ note }) {
  const classes = useStyles()

  const deleteNote = () => {
    db.collection("notes").doc(note.id).delete().then(console.log("deleted"))
  }

  return (
    <Grid key={note.id} item xs={12} sm={4} md={3} lg={3}>
      <Card className={classes.root}>
        <CardContent>
          <Typography color="primary" variant="h5" component="h2">
            {note?.title || "Untitled"}
          </Typography>
          <Typography className={classes.pos} color="secondary">
            {note && getFormattedDate(note?.updatedAt)}
          </Typography>
          <Typography variant="body2" noWrap component="p">
            {note?.body}
          </Typography>
        </CardContent>
        <CardActions>
          <Link to={"/" + note?.id}>
            <Button color="primary" size="small">View</Button>
          </Link>
          <Button color="secondary" onClick={deleteNote} size="small">
            Delete
          </Button>
        </CardActions>
      </Card>
    </Grid>
  )
}

export default NoteCard
