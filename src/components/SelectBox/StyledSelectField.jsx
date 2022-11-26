import { styled } from "@mui/system";
import { Select, createTheme, ThemeProvider } from "@mui/material";

export const customTheme = createTheme({
  components: {
    StyledSelectField: {
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

export const StyledSelectField = styled(Select, {
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
  & .MuiOutlinedInput-notchedOutline {
      border-color: ${theme.palette.primary.main};
      border-radius: 0 ;
    }
    &.Mui-focused  {
      border-color: ${theme.palette.primary.light};
    }
  }
  // & .MuiInputLabel-root {
  //   background: ${theme.palette.secondary.main};
  //   padding: 0 4px
  // }
`
);

// export default StyledInputField;
