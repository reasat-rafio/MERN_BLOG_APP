import React, { useEffect, useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import MoreIcon from "@material-ui/icons/MoreVert";
import {
   MenuItem,
   Menu,
   Avatar,
   ListSubheader,
   ListItemText,
   ListItemAvatar,
   ListItem,
   List,
   Fab,
   Paper,
   IconButton,
   Typography,
   Toolbar,
   CssBaseline,
   AppBar,
   Grid,
   DialogTitle,
   DialogContentText,
   DialogContent,
   DialogActions,
   Dialog,
   TextField,
   Button,
} from "@material-ui/core";

import useStyles from "./useStyles";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllBlogs } from "../../redux/Actions/blogAction";
import Loading from "../../utils/Loading";
import moment from "moment";
import { logoutUser } from "../../redux/Actions/authAction";

export default function Home() {
   const classes = useStyles();
   const [anchorEl, setAnchorEl] = React.useState(null);
   const open = Boolean(anchorEl);
   const [auth, setAuth] = React.useState(true);

   const handleClose = () => {
      setAnchorEl(null);
   };

   const handleMenu = (e) => {
      setAnchorEl(e.currentTarget);
   };

   // Getting the current user from & redux & database
   const logedInUser = useSelector((state) => state.auth.user);

   // Getting the blogs from database
   const dispatch = useDispatch();
   const state = useSelector((state) => state.blog.blogs);

   // setting the blogs into a state
   const [blogs, setBlogs] = useState(state);

   // Calling the dispatch action
   useEffect(() => {
      dispatch(fetchAllBlogs());
   }, [dispatch, blogs]);

   // Logout the user
   const logOut = () => {
      dispatch(logoutUser());
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

   return (
      <React.Fragment>
         <CssBaseline />
         <Grid container justify="center" alignItems="center">
            <Grid item xs={12} lg={8}>
               <Paper square className={classes.paper}>
                  <Typography
                     className={classes.text}
                     variant="h5"
                     gutterBottom
                  >
                     Daily Blog 📝
                  </Typography>
                  {blogs ? (
                     <List className={classes.list}>
                        {blogs.map(({ _id, title, body, user, createdAt }) => (
                           <React.Fragment key={_id}>
                              {/* setting the post date and day */}
                              {
                                 <ListSubheader className={classes.subheader}>
                                    {moment(createdAt).fromNow()}
                                 </ListSubheader>
                              }

                              <ListItem button>
                                 <ListItemAvatar>
                                    <Avatar
                                       alt="Profile Picture"
                                       src={user.picture}
                                    >
                                       {user.username.slice(0, 3)}
                                    </Avatar>
                                 </ListItemAvatar>

                                 <ListItemText
                                    primary={title}
                                    secondary={body}
                                 />
                              </ListItem>
                           </React.Fragment>
                        ))}
                     </List>
                  ) : (
                     <Loading />
                  )}
               </Paper>
               <AppBar
                  position="fixed"
                  color="primary"
                  className={classes.appBar}
               >
                  <Toolbar>
                     <Fab
                        onClick={handleClickOpenModal}
                        color="secondary"
                        aria-label="add"
                        className={classes.fabButton}
                     >
                        <AddIcon />
                     </Fab>
                     <div className={classes.grow} />

                     <IconButton
                        edge="end"
                        color="inherit"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                     >
                        <MoreIcon />
                     </IconButton>
                     <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                           vertical: "top",
                           horizontal: "right",
                        }}
                        keepMounted
                        transformOrigin={{
                           vertical: "top",
                           horizontal: "right",
                        }}
                        open={open}
                        onClose={handleClose}
                     >
                        <MenuItem onClick={handleClose}>Edit Profile</MenuItem>
                        <MenuItem onClick={handleClose}>My account</MenuItem>
                        <MenuItem onClick={logOut}>Logout</MenuItem>
                     </Menu>
                  </Toolbar>
               </AppBar>
               <Dialog
                  open={openModal}
                  onClose={handleCloseModal}
                  aria-labelledby="form-dialog-title"
               >
                  <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
                  <DialogContent>
                     <DialogContentText>
                        {`Hello ${logedInUser.username}`}
                     </DialogContentText>
                     <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Email Address"
                        type="email"
                        fullWidth
                     />
                  </DialogContent>
                  <DialogActions>
                     <Button onClick={handleCloseModal} color="primary">
                        Cancel
                     </Button>
                     <Button onClick={handleCloseModal} color="primary">
                        Subscribe
                     </Button>
                  </DialogActions>
               </Dialog>
            </Grid>
         </Grid>
      </React.Fragment>
   );
}
