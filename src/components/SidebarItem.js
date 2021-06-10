import { ListItem, ListItemText ,ListItemAvatar,Avatar} from "@material-ui/core"
import React from "react"
import NotesIcon from '@material-ui/icons/Notes';
import { getFormattedDate } from "../utils/helpers";
import { makeStyles } from '@material-ui/core/styles';
import { Link, useParams } from "react-router-dom"


const useStyles = makeStyles((theme) => ({
  root: {
    width: '400',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));
function SidebarItem({ note,selectedId,setIsDrawerOpened }) {
  const classes = useStyles();
  

  return (
    <Link key={note.id} to={"/" + note.id}>
    <ListItem onClick={()=>setIsDrawerOpened(false)} selected={selectedId === note.id} button className={classes.root}>
    <ListItemAvatar>
      <Avatar>
        <NotesIcon/>
      </Avatar>
    </ListItemAvatar>
    <ListItemText primary={note.title} secondary={getFormattedDate(note.updatedAt)} />
  </ListItem>
  </Link>
  )
}

export default SidebarItem
