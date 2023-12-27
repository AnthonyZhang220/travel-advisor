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
    position: "absolute", top: "1.5rem", left: "calc(50% + 204px)", transform: "translate(-50%,-50%)", backgroundColor: "#fff", zIndex: 2000
  },
  searchboxClose: {
    position: "absolute", top: "1.5rem", left: "50%", transform: "translate(-50%,-50%)", backgroundColor: "#fff", zIndex: 2000
  },
  weatherCard: {
    maxWidth: 300,
  },
  weatherCardContent: {
    padding: "0.5rem 0rem"
  },
  weatherContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: 5000,
  },
  weatherContainerClose: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    right: 0,
    transform: "translateX(calc(100% - 1.5rem))",
    transition: "all 0.1s ease-in-out",
  },
  weatherNotch: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "4rem",
    width: "1.5rem",
    borderRadius: "0.5rem 0 0 0.5rem",
    backgroundColor: "#ffffff",
    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
    cursor: "pointer",
    "&:hover": {
      weatherNotchIcon: {
        display: "flex"
      }
    }
  },
  weatherNotchContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  weatherNotchIcon: {
    display: "none"
  }
}));