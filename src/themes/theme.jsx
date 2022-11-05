import "@fontsource/poppins";
import { createTheme } from "@mui/material/styles";

export const appTheme = createTheme({
  palette: {
    primary: {
      main: "#292929",
      contrastText: "#e6e6e6",
    },
    secondary: {
      main: "#e6e6e6",
      contrastText: "#292929",
    },
  },
  background: {
    paper: "#e6e6e6",
    default: "#e6e6e6",
  },
  typography: {
    fontFamily: "'Poppins', 'sans-serif'",
  },
});
