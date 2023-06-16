import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1), minWidth: 120, marginBottom: '10px',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  loading: {
    maxHeight: "calc(100vh - 0px)", display: 'flex', justifyContent: 'center', alignItems: 'center',
  },
  container: {
    height: "100%"
  },
  options: {
    padding: "25px 25px 0px 25px",
  },
  marginBottom: {
    marginBottom: '30px',
  },
  listcontainer: {
    maxHeight: "calc(100vh - 0px)",
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
    paddingLeft: "25px",
    paddingRight: "25px"
  },
}));