import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "@src/pages/HomePage";
import Login from "@src/pages/Login";
import ProtectRoute from "@src/components/ProtectRoute";

export default () => {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        {/* <Route path="/test" component={HomePage} /> */}
        <ProtectRoute path="/" component={HomePage} />
      </Switch>
    </Router>
  );
};

