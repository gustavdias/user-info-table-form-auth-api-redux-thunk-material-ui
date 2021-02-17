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
import Container from "@material-ui/core/Container";

//Do not start the import with use, if you aren't using hooks
import myUseStyles from "./SignUpStyle";

import Copyright from "../../components/Copyright/Copyright";
import { Link } from "react-router-dom";
import { signUpUser } from "../../store/actions/signUp";
import { submitSignUp } from "../../store/reducers/signUp";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";


// export default function SignUp() {

class SignUp extends Component {
  //? manage my form through the state of this auth container, not through redux because I'm only talking about the local state, the values the user entered into their form inputs and so on and it makes more sense to me to use them and to manage them inside the container with react's state property.
  state = {
    controls: {
      firstName: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "First Name",
        },
        value: "",
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        touched: false,
      },
      lastName: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Last Name",
        },
        value: "",
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        touched: false,
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Mail Address",
        },
        value: "",
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        touched: false,
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Password",
        },
        value: "",
        validation: {
          required: true,
          minLength: 6,
        },
        valid: false,
        touched: false,
      },
    },
    isSignup: true,
  };
  submitHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(
      this.state.controls.firstName.value,
      this.state.controls.lastName.value,
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignup
    );
  };

  render() {
    const classes = myUseStyles();

    //*redux hooks
    // const dispatch = useDispatch();
    // const state = useSelector((state) => state);
    // useEffect(() => {
    //   dispatch(signUpUser());//action
    // }, []);

    // const signUp = (event) => {
    //   event.preventDefault();

    //   dispatch(submitSignUp());//reducer
    // };
    //*redux hooks

    // const renderPosts = () => {
    //   if (state.loading) {
    //     return <h1>loading...</h1>;
    //   }
    //   return state.items.map((eL) => {
    //     return <h3 key={eL.id}>{eL.title}</h3>;
    //   });
    // };

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
        </div>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
    );
  }
}

//I want to display the spinner as long as we are loading and for that, I need to know if we're loading and we're storing that information in our auth state
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
    onAuth: (firstName, lastName, email, password, isSignup) =>
      dispatch(actions.auth(email, password, isSignup)),
    //*use building to change the redirect path back if I think that the user is actually not building a burger anymore
    // onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath("/")),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
