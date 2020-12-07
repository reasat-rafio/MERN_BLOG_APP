import {
   Avatar,
   Divider,
   Grid,
   IconButton,
   List,
   ListItem,
   ListItemAvatar,
   ListItemText,
   Paper,
   Typography,
} from "@material-ui/core";
import React from "react";
import { useStyles } from "../useStyles";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import { dislikePost } from "../../../redux/Actions/blogAction";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

const LikedBlogs = ({ id }) => {
   const classes = useStyles();

   // Getting the blogs from database
   const { likedBlogs } = useSelector((state) => state.blog);

   const dispatch = useDispatch();

   // Remove like
   const removeLikeHandler = (blogId) => {
      dispatch(dislikePost(id, blogId));
   };

   return (
      <div>
         <Paper square>
            <Typography className={classes.text} variant="h5" gutterBottom>
               Post You Have Liked
            </Typography>
            {likedBlogs === null && (
               <Typography className={classes.text}>
                  You haven't liked any post yet!
               </Typography>
            )}
            {likedBlogs && likedBlogs.length && (
               <Paper>
                  <List className={classes.list}>
                     {likedBlogs.map(
                        ({ _id, title, body, createdAt, user }) => (
                           <React.Fragment key={_id}>
                              <ListItem button alignItems="flex-start">
                                 <ListItemAvatar>
                                    <Avatar
                                       alt={user.username.slice(0, 3)}
                                       src={user.image}
                                    ></Avatar>
                                 </ListItemAvatar>

                                 <ListItemText
                                    primary={
                                       <>
                                          <small>
                                             {user.username} •{" "}
                                             {moment(createdAt)
                                                .subtract(10, "days")
                                                .calendar()}
                                          </small>
                                          <Typography>{title} </Typography>
                                       </>
                                    }
                                    secondary={
                                       <Grid
                                          container
                                          style={{
                                             display: "flex",
                                          }}
                                       >
                                          <Typography
                                             component="span"
                                             variant="body2"
                                             color="textPrimary"
                                          >
                                             {body}
                                          </Typography>
                                          <div
                                             style={{
                                                marginLeft: "auto",
                                             }}
                                          >
                                             <IconButton
                                                className={classes.icon}
                                                edge="end"
                                                color="inherit"
                                                aria-label="account of current user"
                                                aria-controls="menu-appbar"
                                                aria-haspopup="true"
                                                onClick={() =>
                                                   removeLikeHandler(_id)
                                                }
                                             >
                                                <DeleteForeverIcon color="secondary" />
                                             </IconButton>
                                          </div>
                                       </Grid>
                                    }
                                 />
                              </ListItem>

                              <Divider light />
                           </React.Fragment>
                        )
                     )}
                  </List>
               </Paper>
            )}
         </Paper>
      </div>
   );
};

export default LikedBlogs;
