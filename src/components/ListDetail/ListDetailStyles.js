import { makeStyles } from '@material-ui/core/styles';
import { darken } from '@material-ui/core/styles';

export default makeStyles(() => ({
    placeContainer: {
        display: "relative",
        position: "absolute",
        top: 60,
        marginLeft: "20px",
        Zindex: 2,
        background: "#ffffff",
        borderRadius: "8px",
        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
        width: "408px"
    },
    closeIcon: {
        position: "absolute",
        right: 10,
        top: 10,
        backgroundColor: "#ffffff",
        "&:hover": {
            backgroundColor: darken("#ffffff", 0.2),
        },
    },
    cardcontent: {
        padding: "24px",
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