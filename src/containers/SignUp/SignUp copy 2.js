import React, { Component } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Links from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";

// import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";

import Container from "@material-ui/core/Container";
import { Link } from "react-router-dom";
import Copyright from "../../components/Copyright/Copyright";
import styles from "./SignUpStyle";
import { connect } from "react-redux";

import * as actions from "../../store/actions/index";
import { updateObject, checkValidity } from "../../shared/utility";

// const styles = (theme) => ({
//   paper: {
//     marginTop: theme.spacing(8),
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//   },
//   avatar: {
//     margin: theme.spacing(1),
//     backgroundColor: theme.palette.secondary.main,
//   },
//   form: {
//     width: "100%", // Fix IE 11 issue.
//     marginTop: theme.spacing(3),
//   },
//   submit: {
//     margin: theme.spacing(3, 0, 2),
//   },
// });

export class SignUp extends Component {
  state = {
    controls: {
      firstName: {
        // elementType: "input",
        // elementConfig: {
        //   type: "email",
        //   placeholder: "Mail Address",
        // },
        value: "",
        // validation: {
        //   required: true,
        //   isEmail: true,
        // },
        // valid: false,
        // touched: false,
      },
      lastName: {
        // elementType: "input",
        // elementConfig: {
        //   type: "email",
        //   placeholder: "Mail Address",
        // },
        value: "",
        // validation: {
        //   required: true,
        //   isEmail: true,
        // },
        // valid: false,
        // touched: false,
      },
      email: {
        // elementType: "input",
        // elementConfig: {
        //   type: "email",
        //   placeholder: "Mail Address",
        // },
        value: "",
        // validation: {
        //   required: true,
        //   isEmail: true,
        // },
        // valid: false,
        // touched: false,
      },
      password: {
        // elementType: "input",
        // elementConfig: {
        //   type: "password",
        //   placeholder: "Password",
        //},
        value: "",
        // validation: {
        //   required: true,
        //   minLength: 6,
        //},
        // valid: false,
        // touched: false,
      },
    },
    fields: {},
    isSignup: false,
  };

  //* shared/utility.js
  inputChangedHandler = (event, controlName) => {
    const updatedControls = updateObject(this.state.controls, {
      [controlName]: updateObject(this.state.controls[controlName], {
        value: event.target.value,
        // valid: checkValidity(
        //   event.target.value,
        //   this.state.controls[controlName].validation
        // ),
        // touched: true,
      }),
    });
    this.setState({ controls: updatedControls });
  };

  onChange = (updatedValue) => {
    this.setState({
      fields: {
        ...this.state.fields,
        ...updatedValue,
      },
    });
    console.log(JSON.stringify(this.state.fields, null, 2));
  };

  change = (e) => {
    this.onChange({ [e.target.name]: e.target.value });
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  submitHandler = (event) => {
    event.preventDefault();
    console.log("passing actions: ", this.state.controls, this.state.fields);
    this.props.onAuth(
      // this.state.controls.firstName.value,
      // this.state.controls.lastName.value,
      this.state.controls.email.value,
      this.state.controls.password.value,
      // this.state.fields.value,
      this.state.isSignup
    );
  };

  render() {
    const { classes } = this.props;

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>

          <form
            className={classes.form}
            noValidate
            onSubmit={this.submitHandler}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={(e) => this.change(e)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lname"
                  onChange={(e) => this.change(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={(e) => this.change(e)}
                  onChange={
                    ((event) => this.inputChangedHandler(event, "email"),
                    (e) => this.change(e))
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={(e) => this.change(e)}
                  onChange={(event) =>
                    this.inputChangedHandler(event, "password")
                  }
                />
              </Grid>
              {/*  <Grid item xs={12}>
      <FormControlLabel
        control={<Checkbox value="allowExtraEmails" color="primary" />}
        label="I want to receive inspiration, marketing promotions and updates via email."
      />
    </Grid> */}
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              // onClick={signUp}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                {/* <Typography
        component={Link}
        to="/login"
        variant="contained"
        color="primary"
      >
        Already have an account? Sign in
      </Typography> */}
                <Links component={Link} to="/login" variant="body2">
                  {"Already have an account? Login"}
                </Links>
              </Grid>
            </Grid>
          </form>
          <br />
          <Typography>{JSON.stringify(this.state.fields, null, 2)}</Typography>
          {/* <Typography>{this.state.fields}</Typography> */}
        </div>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
    );
  }
}

//!
const mapStateToProps = (state) => {
  return {
    // loading: state.auth.loading,
    // error: state.auth.error,
    //*redirect away from auth from when login is successful
    // isAuthenticated: state.auth.token !== null,
    //*use building to change the redirect path back if I think that the user is actually not building a burger anymore
    // buildingBurger: state.burgerBuilder.building,
    // authRedirectPath: state.auth.authRedirectPath,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, isSignup) =>
      dispatch(actions.auth(email, password, isSignup)),
    //*use building to change the redirect path back if I think that the user is actually not building a burger anymore
    // onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath("/")),
  };
};
//!

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(SignUp));
