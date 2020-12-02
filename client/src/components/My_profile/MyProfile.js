import React, { useEffect, useRef } from "react";
import {
   Avatar,
   Grid,
   List,
   ListItemText,
   ListSubheader,
   ListItem,
   Paper,
   Typography,
   Button,
   Divider,
   Fab,
} from "@material-ui/core";
import { useStyles } from "./useStyles";
import { useDispatch, useSelector } from "react-redux";
import { fetchLoggedInUserBlogs } from "../../redux/Actions/blogAction";
import moment from "moment";
import Dialog from "./Dialog/Dialog";
import { useState } from "react";
import AddCircleOutlinedIcon from "@material-ui/icons/AddCircleOutlined";
import HomeIcon from "@material-ui/icons/Home";
import CloudUploadRoundedIcon from "@material-ui/icons/CloudUploadRounded";
import { profilePictureUpload } from "../../redux/Actions/authAction";

const MyProfile = () => {
   const { user } = useSelector((state) => state.auth);
   const { userProfileBlogs } = useSelector((state) => state.blog);

   const classes = useStyles();
   const dispatch = useDispatch();

   // fetching the data on page load
   useEffect(() => {
      dispatch(fetchLoggedInUserBlogs(user._id));
   }, [dispatch, user]);

   // Delete dialog popup state
   const [open, setOpen] = useState(false);
   const [_id, set_ID] = useState();

   // Deleting blog
   const deletePost = (id) => {
      set_ID(id);
      setOpen(true);
   };

   const editPost = (id) => {
      window.location.pathname = `/my-profile/blogs/edit/${id}`;
   };

   // Going back to home
   const backToHomeHandler = () => {
      window.location.pathname = "/home";
   };

   //
   const fileInputRef = useRef();

   // triggering the input type file
   const btnHandler = (e) => {
      e.preventDefault();
      fileInputRef.current.click();
   };

   // Image preview
   const [image, setImage] = useState();
   const inputHandler = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
         setImage(reader.result);
      };
   };

   // Img uploader
   const imgUploadHandler = () => {
      dispatch(profilePictureUpload(image, user._id));
      setImage(false);
   };

   return (
      <div>
         <Grid container justify="center" alignItems="center" spacing={3}>
            <Grid
               justify="center"
               alignItems="center"
               container
               className={classes.root}
               item
               sm={4}
               xs={12}
            >
               {image ? (
                  <Avatar
                     className={classes.large}
                     alt="Profile Picture"
                     src={image}
                  ></Avatar>
               ) : (
                  <Avatar
                     className={classes.large}
                     alt={user.firstName}
                     src={user.image}
                  ></Avatar>
               )}

               <form>
                  {image ? (
                     <CloudUploadRoundedIcon
                        className={classes.uploadIcon}
                        color="primary"
                        fontSize="large"
                        onClick={imgUploadHandler}
                     />
                  ) : (
                     <AddCircleOutlinedIcon
                        onClick={btnHandler}
                        className={classes.uploadIcon}
                        color="primary"
                        fontSize="large"
                     />
                  )}

                  <input
                     type="file"
                     style={{ display: "none" }}
                     ref={fileInputRef}
                     accept=".jpeg, .png, .jpg"
                     onChange={inputHandler}
                  />
               </form>
            </Grid>
            {/* //////////////////////////// */}
            <Grid
               container
               justify="center"
               alignItems="center"
               item
               sm={8}
               xs={12}
            >
               <Typography
                  variant="h4"
                  color="textPrimary"
                  component="h2"
                  className={classes.username}
               >
                  {user.username}
               </Typography>
            </Grid>

            <Grid item xs={12} lg={8}>
               <Paper square className={classes.paper}>
                  <Typography
                     className={classes.text}
                     variant="h5"
                     gutterBottom
                  >
                     Your Blogs
                  </Typography>
                  {userProfileBlogs === null && (
                     <Typography className={classes.text}>
                        You havent post anything yet!
                     </Typography>
                  )}
                  {userProfileBlogs && userProfileBlogs.length && (
                     <List className={classes.list}>
                        {userProfileBlogs.map(
                           ({ _id, title, body, createdAt, username }) => (
                              <React.Fragment key={_id}>
                                 {
                                    <ListSubheader
                                       className={classes.subheader}
                                    >
                                       {moment(createdAt).fromNow()}
                                    </ListSubheader>
                                 }

                                 <ListItem button alignItems="flex-start">
                                    <ListItemText
                                       primary={title}
                                       secondary={
                                          <div>
                                             <Typography>{body}</Typography>
                                             <div
                                                style={{
                                                   background: "#5d5d5a3a",
                                                }}
                                             >
                                                {/* <IconButton
                                                   color="primary"
                                                   aria-label="delete"
                                                >
                                                   <DeleteIcon
                                                      color="secondary"
                                                      fontSize="small"
                                                   />
                                                </IconButton> */}
                                                <Button
                                                   size="small"
                                                   variant="contained"
                                                   color="primary"
                                                   style={{
                                                      marginRight: "10px",
                                                   }}
                                                   onClick={() => editPost(_id)}
                                                >
                                                   Edit
                                                </Button>
                                                <Button
                                                   size="small"
                                                   variant="contained"
                                                   color="secondary"
                                                   onClick={() =>
                                                      deletePost(_id)
                                                   }
                                                >
                                                   Delete
                                                </Button>
                                             </div>
                                          </div>
                                       }
                                    />
                                 </ListItem>

                                 <Divider light />
                              </React.Fragment>
                           )
                        )}
                     </List>
                  )}
               </Paper>
               {/* modal */}
               <Dialog
                  _id={_id}
                  open={open}
                  userId={user._id}
                  setOpen={setOpen}
               />
               <Fab
                  onClick={backToHomeHandler}
                  className={classes.fab}
                  size="small"
                  aria-label="back"
                  color="primary"
               >
                  <HomeIcon />
               </Fab>
            </Grid>
         </Grid>
      </div>
   );
};

export default MyProfile;
