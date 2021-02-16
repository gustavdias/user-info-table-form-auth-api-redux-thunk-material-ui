import React, { Component } from "react";
import SignUp from "./containers/SignUp/SignUp";
import LogIn from "./containers/LogIn/Login";
import Navbar from "./components/Navbar/Navbar";
import { Route, Switch } from "react-router-dom";
import UserInfo from "./containers/UserInfo/UserInfo"
import Logout from "./containers/Logout/Logout"

export class App extends Component {
  render() {
    let routes = (
      <Switch>
        <Route path="/signup" component={SignUp} />
        <Route path="/" component={LogIn} />
      </Switch>
    );

    //if user auth
    if (false) {
      routes = (
        <Switch>
          <Route path="/logout" component={Logout} />
          <Route path="/" component={UserInfo} />
        </Switch>
      );
    }

    return (
      <React.Fragment>
        <Navbar />
        {routes}
      </React.Fragment>
    );
  }
}

export default App;
