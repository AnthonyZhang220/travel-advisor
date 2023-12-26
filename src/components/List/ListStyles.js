import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme, childClicked) => ({
  formControl: {
    margin: theme.spacing(1), minWidth: 120, marginBottom: '10px',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  loading: {
    maxHeight: "100%", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)"
  },
  container: {
    display: "flex",
    flexDirection: "column",
    position: "relative",
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
    backgroundColor: "#ffffff",
    zIndex: 1,
  },
  options: {
    display: "flex", padding: "0.5rem 1rem"

  },
  marginBottom: {
    marginBottom: '30px',
  },
  listcontainer: {
    position: "relative",
    height: "calc(100vh - 6rem)",
    overflowY: "auto",
    "&::-webkit-scrollbar": {
      width: "8px",
    },
    "&::-webkit-scrollbar-track": {
      background: "#F2F2F2",
    },
    "&::-webkit-scrollbar-thumb": {
      background: "#BDBDBD",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      background: "#6E6E6E",
    },
  },
  list: {
    padding: "0",
  },
  showCount: {
    height: "2rem", backgroundColor: "#ffffff", width: "100%",
    display: "flex", justifyContent: "center", alignItems: "center"
  },
  showCountText: {
    textAlign: "center",
  },
}));