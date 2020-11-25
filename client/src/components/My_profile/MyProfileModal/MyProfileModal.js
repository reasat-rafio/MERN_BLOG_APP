import React, { useEffect, useState } from "react";
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
import { fetchClickedBLog } from "../../../redux/Actions/blogAction";
import { useParams } from "react-router-dom";
import Axios from "axios";

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

export const MyProfileModal = () => {
   const classes = useStyles();

   // redux dispatch
   const dispatch = useDispatch();

   // Modal state
   const [openModal, setOpenModal] = useState(false);
   // Closing the modal
   const handleCloseModal = () => {
      setOpenModal(false);
      window.location.pathname = "/my-profile/blogs";
   };

   // Opening the modal
   const handleClickOpenModal = () => {
      setOpenModal(true);
   };

   const [title, setTitle] = useState();
   const [body, setBody] = useState();

   console.log(title);
   console.log(body);

   //    Getting the current blog
   const { id } = useParams();
   useEffect(() => {
      async function fetch() {
         try {
            handleClickOpenModal(true);
            const { data } = await Axios.get(
               `http://localhost:5000/blogs/u/${id}`
            );
            if (data.success) {
               setTitle(data.data[0].title);
               setBody(data.data[0].body);
            }
         } catch (error) {
            console.log(error);
         }
      }
      // dispatch(fetchClickedBLog(id));
      fetch();
   }, [dispatch, id]);

   //    Getting the blog title from redux > database
   // const title =
   //    useSelector((state) => state.blog.currentBlog[0].title) || null;

   // //    Gettin the blog body from redux > database
   // const body = useSelector((state) => state.blog.currentBlog[0].body) || null;

   //React form hooks
   const { register, handleSubmit, watch, errors } = useForm({
      resolver: yupResolver(blogSchema),
   });

   // Form on Submit
   //    const onSubmit = (data) => {
   //       data.user = logedInUser._id;
   //       dispatch(postBlog(data, logedInUser.username));
   //       setOpenModal(false);
   //       setTimeout(() => {
   //          window.location.reload();
   //       }, 2000);
   //    };

   return (
      <>
         <Dialog
            fullScreen
            open={openModal}
            onClose={handleCloseModal}
            TransitionComponent={Transition}
         >
            <form noValidate onSubmit={handleSubmit()}>
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
                        {/* {`Hello ${logedInUser.username} 👋`} */}
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
                     defaultValue={title && title}
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
                     defaultValue={body && body}
                  />
                  {errors.body && (
                     <Typography variant="body2" color="secondary">
                        {errors.body.message}
                     </Typography>
                  )}
               </DialogContent>
            </form>
            <Typography variant="h6" className={classes.lastText}>
               {/* {`Have a nice day ${logedInUser.username}!! ⛄`} */}
            </Typography>
         </Dialog>
      </>
   );
};
