import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  paper: {
    padding: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100px',
  },
  mapContainer: {
    height: '100%', width: '100%', position: "relative",
  },
  map: {
    height: '100%', width: '100%', position: "relative",
  },
  markerContainer: {
    position: 'absolute', transform: 'translate(-50%, -50%)', cursor: "pointer", display: "grid", gridTemplateColumns: "repeat(1, 1fr 10fr)", fontWeight: "bold", width: "100%"
  },
  pointer: {
    cursor: 'pointer',
  },
  searchbox: {
    position: "absolute", top: "2rem", left: "calc(204px + 50%)", transform: "translate(-50%,-50%)", backgroundColor: "#fff", zIndex: 2000
  },
  weatherCard: {
    position: "absolute", top: 0, right: 0, transform: "translate(-50%,-50%)"
  }
}));