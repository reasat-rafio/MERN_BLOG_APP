import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const PrivateRouter = ({ children, ...rest }) => {
   const state = useSelector((state) => state.auth);
   return (
      <Route
         {...rest}
         render={({ location }) =>
            state.isLogedIn ? (
               children
            ) : (
               <Redirect
                  to={{ pathname: "/signin", state: { from: location } }}
               />
            )
         }
      />
   );
};

export default PrivateRouter;
