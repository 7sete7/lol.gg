import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(props => ({
    title: {
        fontFamily: "Raleway, Arial, sans-serif",
        fontSize: "53pt",
        fontWeight: "bold"
    },
    divider: {
        height: 28,
        width: 2,
        margin: "0 5px"
    }
}));

export default useStyles;
