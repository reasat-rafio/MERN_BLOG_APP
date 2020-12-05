import {
   Divider,
   List,
   ListItem,
   ListItemText,
   ListSubheader,
   Paper,
   Typography,
} from "@material-ui/core";
import React from "react";
import { useStyles } from "../useStyles";
import { useSelector } from "react-redux";
import moment from "moment";

const LikedBlogs = () => {
   const classes = useStyles();

   const { likedBlogs } = useSelector((state) => state.blog);

   return (
      <div>
         <Paper square>
            <Typography className={classes.text} variant="h5" gutterBottom>
               Post Have liked
            </Typography>
            {likedBlogs === null && (
               <Typography className={classes.text}>
                  You haven't liked any post yet!
               </Typography>
            )}
            {likedBlogs && likedBlogs.length && (
               <List className={classes.list}>
                  {likedBlogs.map(
                     ({ _id, title, body, createdAt, username, user }) => (
                        <React.Fragment key={_id}>
                           {
                              <ListSubheader className={classes.subheader}>
                                 {moment(createdAt).fromNow()}
                              </ListSubheader>
                           }

                           <ListItem button alignItems="flex-start">
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
                                    <div>
                                       <Typography>{body}</Typography>
                                       <div
                                          style={{
                                             background: "#5d5d5a3a",
                                          }}
                                       ></div>
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
      </div>
   );
};

export default LikedBlogs;
