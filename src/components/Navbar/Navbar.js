import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import useStyles from "./NavBarStyle";
import { Link } from "react-router-dom";

export default function Navbar(props) {
  const classes = useStyles();

  const notAuth = (
    <React.Fragment>
      <Button color="inherit" component={Link} to="/login">
        Login
      </Button>
      <Button color="inherit" component={Link} to="/signup">
        Sign Up
      </Button>
    </React.Fragment>
  );
console.log("props.isAuthenticated:" ,props.isAuthenticated, props)
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h6" className={classes.title}>
            UserInfo App
          </Typography>
          {!props ? (
            { notAuth }
          ) : (
            <Button color="inherit" component={Link} to="/logout">
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
