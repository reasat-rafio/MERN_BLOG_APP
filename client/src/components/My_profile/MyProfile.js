import React from "react";
import { Avatar, Box, Grid, Typography } from "@material-ui/core";
import { useStyles } from "./useStyles";
import { useSelector } from "react-redux";

const MyProfile = () => {
   const { user } = useSelector((state) => state.auth);

   const classes = useStyles();
   return (
      <div>
         <Grid container spacing={3}>
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
         </Grid>
      </div>
   );
};

export default MyProfile;
