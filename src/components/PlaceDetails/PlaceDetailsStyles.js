import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  cardcontent: {
    padding: "0 0.5rem",
  },
  chip: {
    margin: '5px 5px 5px 0',
  },
  subtitle: {
    display: 'flex', alignItems: 'center', justifyContent: "flex-start", marginTop: '5px',
  },
  spacing: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
  },
}));