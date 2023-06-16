import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  paper: {
    padding: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100px',
  },
  mapContainer: {
    height: '100%', width: '100%',
  },
  // markerContainer: {
  //   position: 'absolute', transform: 'translate(-50%, -50%)',
  // },
  pointer: {
    cursor: 'pointer',
  },
}));