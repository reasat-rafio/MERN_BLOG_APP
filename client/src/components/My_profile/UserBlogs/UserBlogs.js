import {
   Button,
   Divider,
   List,
   ListItem,
   ListItemText,
   ListSubheader,
   Paper,
   Typography,
} from "@material-ui/core";
import Dialog from "../Dialog/Dialog";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useStyles } from "../useStyles";
import moment from "moment";
const UserBlogs = () => {
   const classes = useStyles();
   const { userProfileBlogs } = useSelector((state) => state.blog);

   // Current user
   const { user } = useSelector((state) => state.auth);

   //    Edit post handler
   const editPost = (id) => {
      window.location.pathname = `/my-profile/blogs/edit/${id}`;
   };

   // Delete dialog popup state
   const [open, setOpen] = useState(false);
   const [_id, set_ID] = useState();

   // Deleting blog
   const deletePost = (id) => {
      set_ID(id);
      setOpen(true);
   };
   return (
      <div>
         <Paper square>
            <Typography className={classes.text} variant="h5" gutterBottom>
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
                              <ListSubheader className={classes.subheader}>
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
                                             onClick={() => deletePost(_id)}
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
            deletePost={deletePost}
            _id={_id}
            open={open}
            userId={user._id}
            setOpen={setOpen}
         />
      </div>
   );
};

export default UserBlogs;
