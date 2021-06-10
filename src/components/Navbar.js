import React, { useEffect, useState } from "react"
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
import { AccountCircleOutlined  } from "@material-ui/icons"
import MenuIcon from "@material-ui/icons/Menu"

import SidebarItem from "../SidebarItem"

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}))

const Navbar = ({ title, notes,id }) => {
  const classes = useStyles()
  const [isDrawerOpened, setIsDrawerOpened] = useState(false)

  

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
            <MenuIcon/>
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {title}
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
        {notes &&
          notes.map((note) => {
            return (
              <Link key={note.id} to={"/" + note.id}>
                <SidebarItem note={note} />
              </Link>
            )
          })}
      </Drawer>
    </>
  )
}

export default Navbar
