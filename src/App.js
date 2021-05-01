import React from "react"
import "./App.css"
import Editor from "./components/editor/Editor"
import Sidebar from "./components/sidebar/Sidebar"
import { db, getTimeStamp } from "./firebase/config"

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      selectedNoteIndex: null,
      selectedNote: null,
      notes: null,
    }
  }

  componentDidMount = () => {
    db.collection("notes")
      .orderBy("createdAt", "desc")
      .onSnapshot((snap) => {
        const notes = snap.docs.map((doc) => {
          const data = doc.data()
          data.id = doc.id
          return data
        })

        this.setState({ notes })
      })
  }

  render() {
    return (
      <div className="app-container">
        <Sidebar
          notes={this.state.notes}
          selectedNoteIndex={this.state.selectedNoteIndex}
          selectNote={this.selectNote}
          deleteNote={this.deleteNote}
          newNote={this.newNote}
        />
        {this.state.selectedNote ? (
          <Editor
            selectedNote={this.state.selectedNote}
            selectedNoteIndex={this.state.selectedNoteIndex}
            noteUpdate={this.noteUpdate}
          />
        ) : null}
      </div>
    )
  }

  selectNote = (note, index) => {
    this.setState({ selectedNoteIndex: index, selectedNote: note })
  }

  noteUpdate = (id, note) => {
    const { title, body } = note
    db.collection("notes").doc(id).update({
      title,
      body,
      updatedAt: getTimeStamp(),
    })
  }

  newNote = async (title) => {
    const note = {
      title: title,
      body: "",
      createdAt: getTimeStamp(),
      updatedAt: getTimeStamp(),
    }

    const newCreated = await db.collection("notes").add(note)
    await this.setState({ notes: [...this.state.notes, note] })
    const newNoteIndex = this.state.notes.indexOf(
      this.state.notes.filter((_note) => _note.id === newCreated.id)[0]
    )

    this.setState({
      selectedNote: this.state.notes[newNoteIndex],
      selectedNoteIndex: newNoteIndex,
    })
  }

  // deleteNote = async (note, deleteIndex) => {

  //   const newNotes = this.state.notes.filter((_note) => {
  //     return _note !== note
  //   })
  //   console.log(deleteIndex, this.state.notes.indexOf(note))
  //   await this.setState({
  //     notes: newNotes,
  //     selectedNoteIndex: this.state.selectedNoteIndex,
  //     selectedNote: this.selectedNote,
  //   })
  //   console.log(
  //     "ion delete: selected ,delete ",
  //     this.state.selectedNoteIndex,
  //     deleteIndex
  //   )
  //   if (this.state.selectedNoteIndex === deleteIndex) {
  //     this.setState({ selectedNoteIndex: null, selectedNote: null })
  //     console.log(
  //       "selectedNoteIndex = deleteIndex ",
  //       this.state.selectedNoteIndex,
  //       deleteIndex
  //     )
  //   } else if (deleteIndex <= this.state.selectedNoteIndex) {
  //     console.log("selctednoteIndex : ", this.state.selectedNoteIndex)
  //     console.log("SelectedNote : ", this.state.selectedNote)
  //     this.state.notes.length > 1
  //       ? this.selectNote(
  //           this.state.notes[this.state.selectedNoteIndex - 1],
  //           this.state.selectedNoteIndex - 1
  //         )
  //       : this.setState({ selectedNoteIndex: null, selectedNote: null })

  //     console.log("SelectedNoteIndex : ", this.state.selectedNoteIndex)
  //     console.log("SelectedNote : ", this.state.selectedNote)
  //   }

  //   db.collection("notes").doc(note.id).delete()
  // }

  deleteNote = async (note) => {
    const noteIndex = this.state.notes.indexOf(note)
    const selectedNoteIndex = this.state.selectedNoteIndex
    await this.setState({
      notes: this.state.notes.filter((_note) => {
        return _note !== note
      }),
    })

    if (selectedNoteIndex === noteIndex) {
      this.selectNote(null, null)
    } else if (noteIndex <= selectedNoteIndex) {
      this.selectNote(
        this.state.notes[selectedNoteIndex - 1],
        selectedNoteIndex - 1
      )
    } else {
      this.selectNote(this.state.notes[selectedNoteIndex], selectedNoteIndex)
    }

    db.collection("notes").doc(note.id).delete()
  }
}

export default App
