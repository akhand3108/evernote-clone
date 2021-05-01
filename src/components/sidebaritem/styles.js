const styles = (theme) => ({
  listItem: {
    cursor: "pointer",
    color: "#3c096c",
  },
  textSection: {
    maxWidth: "85%",
  },
  deleteIcon: {
    position: "absolute",
    right: "5px",
    top: "calc(50% - 15px)",
    transition: "all 0.2s ease-in-out",
    "&:hover": {
      color: "#10002b",
      transform: "scale(1.3)",
    },
  },
})

export default styles
