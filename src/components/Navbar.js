import React, { useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import IconButton from "@material-ui/core/IconButton"
import { Link } from "react-router-dom"

import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core"
import { AccountCircleOutlined, MenuButton } from "@material-ui/icons"

import SidebarItem from "../SidebarItem"

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}))

const Navbar = ({ title, updateTitle, notes }) => {
  const classes = useStyles()
  const [localTitle, setLocalTitle] = useState(title)
  const [isDrawerOpened, setIsDrawerOpened] = useState(false)

  const inputHandler = (e) => {
    setLocalTitle(e.target.value)
    updateTitle(e.target.value)
  }

  const toggleDrawerStatus = () => {
    setIsDrawerOpened(true)
  }
  const closeDrawer = () => {
    setIsDrawerOpened(false)
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            onClick={toggleDrawerStatus}
            edge="start"
            color="inherit"
            aria-label="menu"
          >
            <MenuButton />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            <input
              style={{
                background: "transparent",
                color: "#fff",
                fontSize: "1.5rem",
                outline: "none",
                borderStyle: "none",
                borderBottom: "1px solid #bbbbbb",
              }}
              type="text"
              value={localTitle}
              onChange={inputHandler}
            />
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="temporary" open={isDrawerOpened} onClose={closeDrawer}>
        <Link to="/">
          <List>
            <ListItem button key="About Us">
              <ListItemIcon>
                <AccountCircleOutlined />
              </ListItemIcon>
              <ListItemText primary="About Us" />
            </ListItem>
          </List>
        </Link>
        {console.log(notes)}
        {notes &&
          notes.map((note) => {
            return (
              <Link to={"/" + note.id}>
                <SidebarItem note={note} />
              </Link>
            )
          })}
      </Drawer>
    </>
  )
}

export default Navbar
