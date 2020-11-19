import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";
import { useForm } from "react-hook-form";
import {
   DialogContent,
   DialogContentText,
   TextField,
   Button,
   Dialog,
   AppBar,
   Slide,
   Toolbar,
} from "@material-ui/core";
import { yupResolver } from "@hookform/resolvers/yup";
import { blogSchema } from "../../../utils/authSchema";
import { useDispatch, useSelector } from "react-redux";
import { postBlog } from "../../../redux/Actions/blogAction";
const useStyles = makeStyles((theme) => ({
   appBar: {
      position: "relative",
   },
   title: {
      marginLeft: theme.spacing(2),
      flex: 1,
   },
   lastText: {
      marginTop: "20%",
   },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
   return <Slide direction="up" ref={ref} {...props} />;
});

export const BlogPostModal = ({
   openModal,
   handleCloseModal,
   logedInUser,
   setOpenModal,
}) => {
   const classes = useStyles();

   //React form hooks
   const { register, handleSubmit, watch, errors } = useForm({
      resolver: yupResolver(blogSchema),
   });

   // redux dispatch
   const dispatch = useDispatch();

   // Form on Submit
   const onSubmit = (data) => {
      data.user = logedInUser._id;
      dispatch(postBlog(data, logedInUser.username));
      setOpenModal(false);
      setTimeout(() => {
         window.location.reload();
      }, 2000);
   };

   return (
      <>
         <Dialog
            fullScreen
            open={openModal}
            onClose={handleCloseModal}
            TransitionComponent={Transition}
         >
            <form noValidate onSubmit={handleSubmit(onSubmit)}>
               <AppBar className={classes.appBar}>
                  <Toolbar>
                     <IconButton
                        edge="start"
                        color="inherit"
                        onClick={handleCloseModal}
                        aria-label="close"
                     >
                        <CloseIcon />
                     </IconButton>
                     <Typography variant="h6" className={classes.title}>
                        {`Hello ${logedInUser.username} 👋`}
                     </Typography>
                     <Button autoFocus color="inherit" type="submit">
                        Save
                     </Button>
                  </Toolbar>
               </AppBar>
               <DialogContent>
                  <DialogContentText>
                     Having a good day or a bad day?? It's ok life happenes. You
                     can take a rest here and let it go by writing down whats on
                     your mind.
                  </DialogContentText>

                  <TextField
                     autoFocus
                     margin="dense"
                     id="name"
                     label="The start of something beautiful"
                     type="text"
                     multiline
                     fullWidth
                     name="title"
                     inputRef={register}
                  />
                  {errors.title && (
                     <Typography variant="body2" color="secondary">
                        {errors.title.message}
                     </Typography>
                  )}
                  <TextField
                     id="filled-multiline-static"
                     margin="dense"
                     label="The body of something even better"
                     multiline
                     rows={6}
                     variant="filled"
                     fullWidth
                     name="body"
                     inputRef={register}
                  />
                  {errors.body && (
                     <Typography variant="body2" color="secondary">
                        {errors.body.message}
                     </Typography>
                  )}
               </DialogContent>
            </form>
            <Typography variant="h6" className={classes.lastText}>
               {`Have a nice day ${logedInUser.username}!! ⛄`}
            </Typography>
         </Dialog>
      </>
   );
};
