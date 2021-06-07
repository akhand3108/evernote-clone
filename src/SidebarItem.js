import { ListItem, ListItemText } from "@material-ui/core"
import React from "react"

function SidebarItem({ note }) {
  return (
    <ListItem className="listItem" alignItems="flex-start">
      <div>
        <ListItemText primary={note.title} secondary={note.body}></ListItemText>
      </div>
    </ListItem>
  )
}

export default SidebarItem
