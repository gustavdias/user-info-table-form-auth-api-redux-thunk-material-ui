import { red } from "@material-ui/core/colors";
import { createMuiTheme } from "@material-ui/core/styles";

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#5f5b60",
      main: "#353236",
      dark: "#0f0a10",
      contrastText: "#a9d3e9",
    },
    secondary: {
      light: "#4da9bc",
      main: "#007a8c",
      dark: "#004e5f",
      contrastText: "#dbb700",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#a9d3e9",
    },
  },
});

export default theme;