import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
   root: {
      display: "flex",
      "& > *": {
         margin: theme.spacing(1),
      },
      flexGrow: 1,
   },
   paper: {
      paddingBottom: 50,
   },
   text: {
      padding: theme.spacing(2, 2, 2),
      background: "#2A2C2B",
   },
   list: {
      marginBottom: theme.spacing(2),
      width: "100%",
   },
   subheader: {
      backgroundColor: theme.palette.background.paper,
   },
   grow: {
      flexGrow: 1,
   },
   large: {
      textAlign: "center",
      width: theme.spacing(17),
      height: theme.spacing(17),
      marginTop: "10px",
   },

   username: {
      fontWeight: "600",
   },
   x: {},
}));