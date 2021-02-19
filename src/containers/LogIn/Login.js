import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import useStyles from "./LoginStyle";
import Container from "@material-ui/core/Container";
import Copyright from "../../components/Copyright/Copyright";
import Links from "@material-ui/core/Link";
import { auth } from "../../store/actions/auth";
import { useSelector, useDispatch } from "react-redux";

import { Link } from "react-router-dom";
export default function Login() {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const isSignup = "false";

  const dispatch = useDispatch();

  const onChangeEmailHandler = (event) => {
    const emailValue = event.target.value;
    setEmail(emailValue);
  };
  const onChangePasswordHandler = (event) => {
    const passwordValue = event.target.value;
    setPassword(passwordValue);
  };

  const onSubmitLoginHandler = (e) => {
    e.preventDefault();

    dispatch(auth(email, password, isSignup));
    console.log(email, password, isSignup);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={onSubmitLoginHandler}
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={onChangeEmailHandler}
            value={email}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={onChangePasswordHandler}
            value={password}
          />
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Login
          </Button>
          <Grid container>
            <Grid item xs>
              {/* <Links href="#" variant="body2">
                Forgot password?
              </Links> */}
            </Grid>
            <Grid item>
              <Links component={Link} to="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Links>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
