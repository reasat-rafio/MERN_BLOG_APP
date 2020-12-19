import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import {
   Drawer,
   Button,
   List,
   Divider,
   ListItemText,
   ListItem,
   ListItemIcon,
} from "@material-ui/core";

import MailIcon from "@material-ui/icons/Mail";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../redux/Actions/authAction";
import AccessibilityNewIcon from "@material-ui/icons/AccessibilityNew";

const useStyles = makeStyles({
   list: {
      width: 250,
   },
   fullList: {
      width: "auto",
   },
});

export default function TemporaryDrawer() {
   const classes = useStyles();
   const dispatch = useDispatch();

   const [state, setState] = useState({
      left: false,
   });

   const toggleDrawer = (anchor, open) => (event) => {
      if (
         event.type === "keydown" &&
         (event.key === "Tab" || event.key === "Shift")
      ) {
         return;
      }

      setState({ ...state, left: open });
   };

   const itemList = [
      {
         text: "Profile",
         icon: <AccountCircleIcon />,
         onClick: () => (window.location.pathname = "/my-profile/blogs"),
      },
      {
         text: "Community Chat",
         icon: <AccessibilityNewIcon />,
         onClick: () => alert("Still in development 🔨"),
      },
      {},
   ];

   const itemList2 = [
      {
         text: "Give feedback",
         icon: <MailIcon />,
         onClick: () => (window.location = "mailto:reasat.rafio@gmail.com"),
      },
      {
         text: "Logout",
         icon: <MeetingRoomIcon />,
         onClick: () => dispatch(logoutUser()),
      },
      {},
   ];

   const list = (anchor) => (
      <div
         className={clsx(classes.list, {
            [classes.fullList]: anchor === "top" || anchor === "bottom",
         })}
         role="presentation"
         onClick={toggleDrawer(anchor, false)}
         onKeyDown={toggleDrawer(anchor, false)}
      >
         <List>
            {itemList.map(({ text, icon, onClick }, index) => (
               <ListItem button key={text} onClick={onClick}>
                  {icon && <ListItemIcon>{icon}</ListItemIcon>}
                  <ListItemText primary={text} />
               </ListItem>
            ))}
         </List>
         <Divider />
         <List>
            {itemList2.map(({ text, icon, onClick }, index) => (
               <ListItem button key={text} onClick={onClick}>
                  {icon && <ListItemIcon>{icon}</ListItemIcon>}
                  <ListItemText primary={text} />
               </ListItem>
            ))}
         </List>
      </div>
   );

   return (
      <div>
         {["left"].map((anchor) => (
            <React.Fragment key={"left"}>
               <Button onClick={toggleDrawer("left", true)}>
                  <MenuIcon />
               </Button>
               <Drawer
                  anchor={"left"}
                  open={state["left"]}
                  onClose={toggleDrawer("left", false)}
               >
                  {list(anchor)}
               </Drawer>
            </React.Fragment>
         ))}
      </div>
   );
}
