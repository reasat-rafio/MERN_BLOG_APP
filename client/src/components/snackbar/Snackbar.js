import React, { useEffect } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { removeSnackbar } from "../../redux/Actions/snackbarAction";

function Alert(props) {
   return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
   root: {
      width: "100%",
      "& > * + *": {
         marginTop: theme.spacing(2),
      },
   },
}));

export default function Snackbars() {
   const classes = useStyles();
   const [open, setOpen] = React.useState(false);

   const dispatch = useDispatch();
   const state = useSelector((state) => state.snackbar);
   const { snackbarOpen, snackbarType, snackbarMessage } = state;

   useEffect(() => {
      setOpen(snackbarOpen);
   }, [state]);

   const handleClose = (event, reason) => {
      if (reason === "clickaway") {
         return;
      }

      dispatch(removeSnackbar());
   };

   return (
      <div className={classes.root}>
         <Snackbar
            anchorOrigin={{
               vertical: "top",
               horizontal: "right",
            }}
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
         >
            <Alert onClose={handleClose} severity={snackbarType}>
               {snackbarMessage}
            </Alert>
         </Snackbar>
      </div>
   );
}
