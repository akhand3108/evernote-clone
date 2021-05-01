const styles = (theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    height: "calc(100% - 35px)",
    position: "absolute",
    left: "0",
    width: "300px",
    boxShadow: "0px 0px 2px black",
  },

  newNoteBtn: {
    width: "25%",
    height: "35px",
    borderBottom: "1px solid black",
    borderRadius: "20px",
    backgroundColor: "#6d597a",
    color: "white",
    "&:hover": {
      backgroundColor: "#355070",
    },
  },
  titleContainer: {
    marginTop: "10px",
    display: "flex",
    justifyContent: "space-between",
  },
  title: {
    marginLeft: "10px",
    color: "#6d597a",
    fontSize: "2rem",
    fontWeight: "bold",
  },
  sidebarContainer: {
    marginTop: "0px",
    width: "300px",
    height: "100%",
    boxSizing: "border-box",
    float: "left",
    overflowY: "scroll",
    overflowX: "hidden",
  },
  newNoteInput: {
    width: "90%",
    margin: "10px 5%",
    height: "35px",
    outline: "none",
    border: "none",
    paddingLeft: "5px",
    "&:focus": {
      outline: "2px solid rgba(81, 203, 238, 1)",
    },
  },
  newNoteSubmitBtn: {
    width: "50%",
    margin: "10px 25%",
    borderRadius: "5px",
    backgroundColor: "#6d597a",
    color: "white",
    "&:hover": {
      backgroundColor: "#355070",
    },
  },
})

export default styles
