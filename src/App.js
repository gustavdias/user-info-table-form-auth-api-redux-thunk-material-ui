import React, { Component } from "react";
import SignUp from "./containers/SignUp/SignUp";
import Login from "./containers/LogIn/Login";
import Navbar from "./components/Navbar/Navbar";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import UserInfo from "./containers/UserInfo/UserInfo";
import Logout from "./containers/Logout/Logout";

import * as actions from "./store/actions/index";
import { connect } from "react-redux";

export class App extends Component {
  render() {
    let routes = (
      //if user is not auth
      <Switch>
        <Route path="/signup" component={SignUp} />
        <Route path="/" component={Login} />
        <Redirect to="/" />{" "}
        {/* in case the user goes to /order or other address he will be redirected, instead of getting a empty page*/}
      </Switch>
    );

    //if user auth
    // if (true) {
      if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/logout" component={Logout} />
          <Route path="/" exact component={UserInfo} />

          <Redirect to="/" />
        </Switch>
      );
    }

    return (
      <React.Fragment>
        <Navbar isAuth={this.props.isAuthenticated} />
        {routes}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(
    "state: ",
    state,
    "state.authReducer.token: ",
    state.authReducer.token
  );
  //authReducer it needs to be the name of the reducer that was combined into the rootReducer
  return {
    //! logged out user can access /orders (not even manually)
    isAuthenticated: state.authReducer.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
//! error connect + router - fix with withRouter (HOC)
// wrapping the app container with connect breaks the react router
