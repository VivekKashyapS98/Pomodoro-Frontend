import React from "react";
import { Route } from "react-router-dom";
import Auth from "./auth";
import Home from "./home";
import Task from "./task";
import Welcome from "./welcome";

export default function Routes() {
  return (
    <div>
      <Route exact path="/">
        <Welcome />
      </Route>
      <Route path="/signup">
        <Auth type="signup" />
      </Route>
      <Route path="/signin">
        <Auth type="signin" />
      </Route>
      <Route path="/home">
        <Home />
      </Route>
      <Route path="/task/:id">
        <Task />
      </Route>
    </div>
  );
}
