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
} from "@material-ui/core";
import useStyles from "./useStyles";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllBlogs } from "../../redux/Actions/blogAction";
import Loading from "../../utils/Loading";
import moment from "moment";

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

   // Getting the blogs from database
   const dispatch = useDispatch();
   const state = useSelector((state) => state.blog.blogs);
   const [blogs, setBlogs] = useState(state);

   useEffect(() => {
      dispatch(fetchAllBlogs());
   }, [dispatch, blogs]);

   // console.log(
   //    moment().subtract(1).format("MMM Do YY") ===
   //       moment(blogs.createdAt).format("MMM Do YY")
   // );
   // console.log(moment().subtract(1, "days").calendar());

   return (
      <React.Fragment>
         <CssBaseline />
         <Paper square className={classes.paper}>
            <Typography className={classes.text} variant="h5" gutterBottom>
               Daily Blog 📝
            </Typography>
            {blogs ? (
               <List className={classes.list}>
                  {blogs.map(({ _id, title, body, user, createdAt }) => (
                     <React.Fragment key={_id}>
                        {/* setting the post date and day */}
                        {/* {moment(createdAt).subtract(10, "days").calendar() ===
                        moment().subtract(10, "days").calendar() ? (
                           <ListSubheader className={classes.subheader}>
                              Today
                           </ListSubheader>
                        ) : moment().subtract(1).format("MMM Do YY") ===
                          moment(blogs.createdAt).format("MMM Do YY") ? (
                           <ListSubheader className={classes.subheader}>
                              {moment(createdAt).fromNow()}
                           </ListSubheader>
                        ) : (
                           <ListSubheader className={classes.subheader}>
                              {moment(createdAt).format(
                                 "MMMM Do YYYY, h:mm:ss a"
                              )}
                           </ListSubheader>
                        )} */}

                        {/* setting the post date and day */}
                        {
                           <ListSubheader className={classes.subheader}>
                              {moment(createdAt).fromNow()}
                           </ListSubheader>
                        }

                        <ListItem button>
                           <ListItemAvatar>
                              <Avatar alt="Profile Picture" src={user.picture}>
                                 {user.username.slice(0, 3)}
                              </Avatar>
                           </ListItemAvatar>

                           <ListItemText primary={title} secondary={body} />
                        </ListItem>
                     </React.Fragment>
                  ))}
               </List>
            ) : (
               <Loading />
            )}
         </Paper>
         <AppBar position="fixed" color="primary" className={classes.appBar}>
            <Toolbar>
               <Fab
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
                  <MenuItem onClick={handleClose}>Logout</MenuItem>
               </Menu>
            </Toolbar>
         </AppBar>
      </React.Fragment>
   );
}
