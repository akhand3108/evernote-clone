import { Container, Grid } from "@material-ui/core"
import AddNoteDialog from "./AddNoteDialog"
import NoteCard from "./NoteCard"


export default function Home({ notes }) {
  

  return (
    <>
      <Container>
        <h1 style={{ textAlign: "center", fontSize: "3rem" }}>
          My Markdown Editor
        </h1>
        <AddNoteDialog/>
        <Grid mt="2rem" container spacing={3} justify>
          {notes && notes.map((note) => <NoteCard note={note} />)}
        </Grid>
      </Container>
    </>
  )
}
