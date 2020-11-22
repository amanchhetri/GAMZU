import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

import { Provider } from "react-redux";
import store from "./store";

import PrivateRoute from './components/common/PrivateRoute';

import GamesList from "./components/gamesList/GamesList";
import NotFound from "./components/notFound/NotFound";
import Detail from "./components/detail/Detail";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Dashboard from "./components/profile/Dashboard";
import { clearCurrentProfile } from "./actions/profileActions";
import CreateProfile from "./components/create-profile/CreateProfile";
import EditProfile from "./components/profile/EditProfile";

// Check for token
if (localStorage.jwtToken) {
  // Set Auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout User
    store.dispatch(logoutUser());
    // Clear current profile
    store.dispatch(clearCurrentProfile());
    // Redirect to login
    window.location.href = "/login";
  }
}

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route path="/" component={GamesList} exact />
            <Route path="/games/:name" component={Detail} exact />
            <Route path="/login" component={Login} exact />
            <Route path="/register" component={Register} exact />
            <PrivateRoute path="/dashboard" component={Dashboard} exact />
            <PrivateRoute path="/create-profile" component={CreateProfile} exact />
            <PrivateRoute path="/edit-profile" component={EditProfile} exact />
            <Route component={NotFound} />
          </Switch>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
