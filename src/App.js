// REACT
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import themeFile from "./util/theme";
// REDUX
import { Provider } from "react-redux";
import store from "./redux/store";
import { SET_AUTHENTICATED } from "./redux/types";
import { logoutUser, getUserData } from "./redux/actions/userActions";
// MUI Stuff
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
// COMPONENTS
import Navbar from "./components/layout/Navbar";
import AuthRoute from "./util/AuthRoute";
// PAGES
import home from "./pages/home";
import login from "./pages/login";
import signup from "./pages/signup";
import user from "./pages/user";
// PLUGINS
import jwtDecode from "jwt-decode";
import axios from "axios";
//////////////////////////////////////////////////////////

// STYLES
const theme = createMuiTheme(themeFile);
// AUTH
// let authenticated;
const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  console.log(decodedToken);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
    window.location.href = "/login";
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common["Authorization"] = token;
    store.dispatch(getUserData());
  }
}

//////////
// APP //
//////////////////////////////////
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <MuiThemeProvider theme={theme}>
            <Navbar />
            <div className="container">
              <Switch>
                <Route exact path="/" component={home} />
                <AuthRoute exact path="/login" component={login} />
                <AuthRoute exact path="/signup" component={signup} />
                <Route exact path="/users/:handle" component={user} />
                <Route
                  exact
                  path="/users/:handle/shout/:shoutId"
                  component={user}
                />
              </Switch>
            </div>
          </MuiThemeProvider>
        </Router>
      </Provider>
    );
  }
}

export default App;
