import { styled, alpha } from "@mui/system";
import {
  TextField,
  createTheme,
  ThemeProvider,
  InputBase,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const customTheme = createTheme({
  components: {
    StyledInputField: {
      variants: [
        {
          props: { variant: "light" },
          style: {
            background: "#fafafa",
          },
        },
      ],
      // defaultProps: {
      //   variant: "outlined",
      //   fullWidth: true,
      //   sx: { mb: 2 },
      // },
      // styleOverrides: {
      //   root: {
      //     "&.subvariant-hovered": {
      //       "& fieldset": {
      //         background: "#fafafa",
      //       },
      //     },
      //   },
      // },
    },
  },
  palette: {
    primary: {
      main: "#292929",
      light: "#424242",
      dark: "#101010",
      contrastText: "#e6e6e6",
    },
    secondary: {
      main: "#e6e6e6",
      light: "#fafafa",
      dark: "#bdbdbd",
      contrastText: "#292929",
    },
  },
  typography: {
    fontFamily: "'Poppins', 'sans-serif'",
  },
});

const StyledInputField = styled(TextField, {
  shouldForwardProp: (prop) =>
    prop !== "background" && prop !== "sx" && prop !== "variant",
  name: "StyledInputField",
  slot: "Root",
  overridesResolver: (props, styles) => [
    styles.root,
    props.background === "primary" && styles.primary,
    props.background === "secondary" && styles.secondary,
  ],
})(
  ({ theme }) => `
  background: ${theme.palette.secondary.main};
  & .MuiInput-underline:after {
    border-bottom-color: white;
  }
  & .MuiOutlinedInput-root {
    & fieldset {
      border-color: ${theme.palette.primary.main};
      border-radius: 0;
    }
    &.Mui-focused fieldset {
      border-color: ${theme.palette.primary.light};
    }
  }
`
);

export { customTheme, StyledInputField };
