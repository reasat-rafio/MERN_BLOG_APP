import React, { Suspense } from "react";
import "./App.css";
import Loading from "./utils/Loading";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import SignUp from "./components/sign_up/SignUp";
import SignIn from "./components/sign_in/SignIn";
import Home from "./components/Home/Home";
import Snackbars from "./components/snackbar/Snackbar";
import NotFound404 from "./components/404/NotFound404";
import PrivateRouter from "./components/PrivateRouter/PrivateRouter";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";

function App() {
   const theme = createMuiTheme({
      palette: {
         type: "dark",
      },
      // primary: "#A8E14B",
   });

   return (
      <Suspense fallback={<Loading />}>
         <ThemeProvider theme={theme}>
            <Paper>
               <Snackbars />
               <Router>
                  <Switch>
                     <Route exact path="/" component={SignUp} />
                     <Route path="/signin" component={SignIn} />
                     <PrivateRouter path="/home">
                        <Home />
                     </PrivateRouter>
                     <Route path="*" component={NotFound404} />
                  </Switch>
               </Router>
            </Paper>
         </ThemeProvider>
      </Suspense>
   );
}

export default App;
