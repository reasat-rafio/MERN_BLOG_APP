import React, { useEffect } from "react";
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
} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { useStyles } from "./useStyles";
import { useDispatch, useSelector } from "react-redux";
import { fetchLoggedInUserBlogs } from "../../redux/Actions/blogAction";
import moment from "moment";
import Dialog from "./Dialog/Dialog";
import { useState } from "react";
import { MyProfileModal } from "./MyProfileModal/MyProfileModal";

const MyProfile = () => {
   const { user } = useSelector((state) => state.auth);
   const { userProfileBlogs } = useSelector((state) => state.blog);
   const classes = useStyles();
   const dispatch = useDispatch();

   // fetching the data on page load
   useEffect(() => {
      dispatch(fetchLoggedInUserBlogs(user._id));
   }, []);

   // Delete dialog popup state
   const [open, setOpen] = useState(false);

   // Deleting blog
   const deletePost = () => {
      setOpen(true);
   };

   // Modal state
   const [openModal, setOpenModal] = useState(false);
   // Closing the modal
   const handleCloseModal = () => {
      setOpenModal(false);
   };

   // Opening the modal
   const handleClickOpenModal = () => {
      setOpenModal(true);
   };

   // Getting the current user from & redux & database
   const logedInUser = useSelector((state) => state.auth.user);

   const editPost = () => {
      setOpenModal(true);
   };

   return (
      <>
         <Grid container justify="center" alignItems="center" spacing={3}>
            <Grid
               justify="center"
               alignItems="center"
               container
               className={classes.x}
               item
               sm={4}
               xs={12}
            >
               <Avatar
                  className={classes.large}
                  alt="Profile Picture"
                  src="/static/images/avatar/1.jpg"
               >
                  {user.firstName}
               </Avatar>
            </Grid>
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
               <Paper square>
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
                                                   onClick={editPost}
                                                >
                                                   Edit
                                                </Button>
                                                <Button
                                                   size="small"
                                                   variant="contained"
                                                   color="secondary"
                                                   onClick={deletePost}
                                                >
                                                   Delete
                                                </Button>
                                             </div>
                                          </div>
                                       }
                                    />
                                 </ListItem>
                                 {/* modal */}
                                 <Dialog
                                    _id={_id}
                                    open={open}
                                    userId={user._id}
                                    setOpen={setOpen}
                                 />
                                 <Divider light />
                                 {/* BLOG MODAL */}
                                 <MyProfileModal
                                    openModal={openModal}
                                    handleCloseModal={handleCloseModal}
                                    logedInUser={logedInUser}
                                    handleClickOpenModal={handleClickOpenModal}
                                    setOpenModal={setOpenModal}
                                    _id={_id}
                                 />
                              </React.Fragment>
                           )
                        )}
                     </List>
                  )}
               </Paper>
            </Grid>
         </Grid>
      </>
   );
};

export default MyProfile;
