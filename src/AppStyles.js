import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
    appContainer: {
        heigth: "100vh",
        width: "100vw",
    },
    listSection: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        left: 0,
        top: 0,
        zIndex: 50,
        height: "100%"
    },
    listSectionClose: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        left: 0,
        top: 0,
        zIndex: 50,
        height: "100%",
        transform: "translateX(calc(-100% + 1.5rem))",
        transition: "all 0.1s ease-in-out",
    },
    list: {
        flex: "0 1 408px",
        height: "100%",
        maxWidth: "408px",
    },
    listDetail: {
        flex: "0 1 408px",
        maxWidth: "408px",
        marginLeft: "1rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    notch: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "4rem",
        width: "1.5rem",
        borderRadius: "0 0.5rem 0.5rem 0",
        backgroundColor: "#ffffff",
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",

    },
    notchContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
    },
    mapSection: {
        position: "fixed",
        height: "100%",
        width: "100%",
        top: 0,
        left: 0,
    }

}))