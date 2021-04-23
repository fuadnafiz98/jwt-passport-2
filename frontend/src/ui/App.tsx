import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Magic from "./pages/Magic";
import Nav from "./components/nav";
import SignIn from "./pages/Signin";
import SignUp from "./pages/Signup";
import SignOut from "./pages/Signout";

function App() {
  return (
    <Router>
      <AuthProvider>
        <div>
          <Nav />
          <Switch>
            <Route path="/dashboard">
              <Dashboard />
            </Route>
            <Route path="/magic">
              <Magic />
            </Route>
            <Route path="/signin">
              <SignIn />
            </Route>
            <Route path="/signup">
              <SignUp />
            </Route>
            <Route path="/signout">
              <SignOut />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
