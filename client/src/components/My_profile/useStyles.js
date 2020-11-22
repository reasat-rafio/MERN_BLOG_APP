import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
   root: {
      display: "flex",
      "& > *": {
         margin: theme.spacing(1),
      },
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
