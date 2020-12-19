import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
   text: {
      padding: theme.spacing(2, 2, 2),
      background: "#2A2C2B",
   },
   paper: {
      paddingBottom: 50,
      minHeight: "90vh",
   },
   list: {
      marginBottom: theme.spacing(2),
      width: "100%",
   },
   subheader: {
      backgroundColor: theme.palette.background.paper,
   },
   appBar: {
      top: "auto",
      bottom: 0,
   },
   grow: {
      flexGrow: 1,
   },
   fabButton: {
      position: "absolute",
      zIndex: 1,
      top: -30,
      left: 0,
      right: 0,
      margin: "0 auto",
   },
   // inline: {
   //    display: "inline",
   //    maxWidth: "200px",
   //    background: "red",
   // },
}));

export default useStyles;
