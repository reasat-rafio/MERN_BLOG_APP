import React, { useEffect, useRef, useState } from "react";
import { Avatar, Grid, Typography, Fab, Tab, Box } from "@material-ui/core";
import { useStyles } from "./useStyles";
import { useDispatch, useSelector } from "react-redux";
import {
   fetchLikedBlogs,
   fetchLoggedInUserBlogs,
} from "../../redux/Actions/blogAction";
import AddCircleOutlinedIcon from "@material-ui/icons/AddCircleOutlined";
import HomeIcon from "@material-ui/icons/Home";
import CloudUploadRoundedIcon from "@material-ui/icons/CloudUploadRounded";
import { profilePictureUpload } from "../../redux/Actions/authAction";
import UserBlogs from "./UserBlogs/UserBlogs";
import FullWidthTabs from "./BottomNav/FullWidthTabs";
import { useTheme } from "@material-ui/core/styles";
import SwipeableViews from "react-swipeable-views";
import PropTypes from "prop-types";
import LikedBlogs from "./LikedBlogs/LikedBlogs";

function TabPanel(props) {
   const { children, value, index, ...other } = props;
   return (
      <div
         role="tabpanel"
         hidden={value !== index}
         id={`full-width-tabpanel-${index}`}
         aria-labelledby={`full-width-tab-${index}`}
         {...other}
      >
         {value === index && (
            <Box p={3}>
               <Typography>{children}</Typography>
            </Box>
         )}
      </div>
   );
}

TabPanel.propTypes = {
   children: PropTypes.node,
   index: PropTypes.any.isRequired,
   value: PropTypes.any.isRequired,
};

const MyProfile = () => {
   const { user } = useSelector((state) => state.auth);

   const theme = useTheme();
   const classes = useStyles();
   const dispatch = useDispatch();

   // fetching the data on page load
   useEffect(() => {
      dispatch(fetchLoggedInUserBlogs(user._id));
      dispatch(fetchLikedBlogs(user._id));
   }, [dispatch, user]);

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

   // bottom nav values
   const [value, setValue] = useState(0);

   const handleChange = (event, newValue) => {
      setValue(newValue);
   };

   const handleChangeIndex = (index) => {
      setValue(index);
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

            <Grid item xs={12} lg={8} className={classes.paper}>
               <SwipeableViews
                  axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                  index={value}
                  onChangeIndex={handleChangeIndex}
               >
                  <TabPanel value={value} index={0} dir={theme.direction}>
                     <UserBlogs />
                  </TabPanel>
                  <TabPanel value={value} index={1} dir={theme.direction}>
                     <LikedBlogs id={user._id} />
                  </TabPanel>
               </SwipeableViews>

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

         <FullWidthTabs
            value={value}
            setValue={setValue}
            handleChange={handleChange}
            handleChangeIndex={handleChangeIndex}
         />
      </div>
   );
};

export default MyProfile;
