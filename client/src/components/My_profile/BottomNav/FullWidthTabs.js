import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import FavoriteIcon from "@material-ui/icons/Favorite";
import SettingsApplicationsSharpIcon from "@material-ui/icons/SettingsApplicationsSharp";

function a11yProps(index) {
   return {
      id: `full-width-tab-${index}`,
      "aria-controls": `full-width-tabpanel-${index}`,
   };
}

const useStyles = makeStyles((theme) => ({
   root: {
      backgroundColor: theme.palette.background.paper,
      [theme.breakpoints.up("sm")]: {
         top: "auto",
         bottom: 0,
      },
      top: "auto",
      bottom: 0,
   },
}));

export default function FullWidthTabs({ value, handleChange }) {
   const classes = useStyles();

   return (
      <>
         <AppBar position="fixed" color="default" className={classes.root}>
            <Tabs
               value={value}
               onChange={handleChange}
               indicatorColor="primary"
               textColor="primary"
               variant="fullWidth"
               aria-label="tabs"
            >
               <Tab label="Profile" icon={<AccountBoxIcon />} {...a11yProps(0)}>
                  {" "}
               </Tab>
               <Tab label="Liked" icon={<FavoriteIcon />} {...a11yProps(1)} />
               <Tab
                  label="Settings"
                  icon={<SettingsApplicationsSharpIcon />}
                  {...a11yProps(3)}
               />
            </Tabs>
         </AppBar>
      </>
   );
}
