import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NTIGame from "../pages/NTIGame";
import NTIFBGame from "../pages/NTIFBGame";
import UnisonFinderGame from "../pages/UnisonFinderGame";
import { LandingPage } from "../pages/LandingPage";
import { ProfileView } from "../pages/ProfileView";

const ApplicationViews = () => {
  const { isLoggedIn } = useContext(UserProfileContext);

  return (
    <Switch>
      <Route path="/" exact>
        {isLoggedIn ? <LandingPage /> : <Redirect to="/login" />}
      </Route>
      <Route path="/NTIgame">
        {isLoggedIn ? <NTIGame /> : <Redirect to="/login" />}
      </Route>
      <Route path="/NTIFretboardGame">
        {isLoggedIn ? <NTIFBGame /> : <Redirect to="/login" />}
      </Route>
      <Route path="/UnisonFinderGame">
        {isLoggedIn ? <UnisonFinderGame /> : <Redirect to="/login" />}
      </Route>
      <Route path="/myprofile">
        {isLoggedIn ? <ProfileView /> : <Redirect to="/login" />}
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/register">
        <Register />
      </Route>
    </Switch>
  );
};

export default ApplicationViews;
