import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useDispatch } from "react-redux";
import { deleteBlog } from "../../../redux/Actions/blogAction";

export default function AlertDialog({ userId, _id, open, setOpen }) {
   const handleClose = () => {
      setOpen(false);
   };

   const dispatch = useDispatch();
   // deleting the blog
   const handleDelete = () => {
      dispatch(deleteBlog(_id, userId));
      setOpen(false);
      setTimeout(() => {
         window.location.reload();
      }, 1000);
   };

   return (
      <div>
         <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
         >
            <DialogTitle id="alert-dialog-title">
               {"Are you sure you want to delete the Post?"}
            </DialogTitle>
            <DialogContent>
               <DialogContentText id="alert-dialog-description">
                  If you click yes this Post will be delete permanently and
                  there is no way to get it back again.
               </DialogContentText>
            </DialogContent>
            <DialogActions>
               <Button
                  size="small"
                  variant="contained"
                  onClick={handleClose}
                  color="primary"
               >
                  No
               </Button>
               <Button
                  size="small"
                  variant="contained"
                  onClick={handleDelete}
                  color="secondary"
                  autoFocus
               >
                  Yes
               </Button>
            </DialogActions>
         </Dialog>
      </div>
   );
}
