import React, { Suspense } from "react";
import "./App.css";
import Loading from "./utils/Loading";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import SignUp from "./components/sign_up/SignUp";
import SignIn from "./components/sign_in/SignIn";
import Home from "./components/Home/Home";
import Snackbars from "./components/snackbar/Snackbar";

function App() {
   return (
      <Suspense fallback={<Loading />}>
         <Snackbars />
         <Router>
            <Switch>
               <Route exact path="/" component={SignUp} />
               <Route exact path="/signin" component={SignIn} />
               <Route exact path="/home" component={Home} />
            </Switch>
         </Router>
      </Suspense>
   );
}

export default App;
