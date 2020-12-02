import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import FavoriteIcon from "@material-ui/icons/Favorite";

const useStyles = makeStyles({
   root: {
      maxWidth: 500,
      margin: "auto",
   },
});

export default function BottomNav({ value, setValue, handleChange }) {
   const classes = useStyles();

   return (
      <BottomNavigation
         value={value}
         onChange={handleChange}
         className={classes.root}
      >
         <BottomNavigationAction
            label="Profile"
            value="profile"
            icon={<AccountBoxIcon />}
         />
         <BottomNavigationAction
            label="Liked"
            value="liked"
            icon={<FavoriteIcon />}
         />
      </BottomNavigation>
   );
}
