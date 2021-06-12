import {useState,useEffect} from "react"
import { useHistory, useParams } from "react-router"
import MDEditor from "@uiw/react-md-editor"
import { Box, Container } from "@material-ui/core";
import { getFormattedDate } from "../utils/helpers";
import { db } from "../firebase/config";

export default function PublishedPage(){
const [note,setNote] = useState(null)
const {noteTag,userName} = useParams();
const history = useHistory()

useEffect(() => {
    db.collection("notes")
      .doc(noteTag)
      .get()
      .then((snap) => {
        if(snap.data().published){
        setNote(snap.data())
      }else{
        history.push("/")
      }
      })
  }, [noteTag,history])

  

return <>

<Container style={{
                    minHeight:"100vh",
                    maxWidth: "800px",    
                    margin:"10px auto",
                  boxShadow: "0px 0px 6px 4px rgba(0,0,0,0.43)",
                  width: "100%",
                  padding: "20px 40px",
                  height: "80vh",
                  borderRadius: "5px",
                  color: "#f9fafa",
                  backgroundColor: "#1a2634"
                }}>

<h2 style={{textAlign:"center",fontSize:"3rem"}} >{note?.title}</h2>  
    <Box display="flex" justifyContent="flex-end" alignItems="center">
    <small>Published On: {getFormattedDate(note?.createdAt)}</small></Box>
<MDEditor.Markdown
                style={{maxWidth:"700px",
              margin:"auto"}}
                source={note?.body}
              />
</Container>
</>
}