import { styled } from "@mui/system";
import { TextField, createTheme, ThemeProvider } from "@mui/material";

export const customTheme = createTheme({
  components: {
    MyThemeComponent: {
      styleOverrides: {
        root: {
          color: "#292929",
        },
        variants: [
          {
            props: { variant: "dashed", color: "primary" },
            style: {
              border: "1px dashed darkblue",
            },
          },
          {
            props: { variant: "dashed", color: "secondary" },
            style: {
              border: "1px dashed darkred",
            },
          },
        ],
      },
    },
  },
});

export const StyledInputField = styled(TextField, {
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
      transition: 0.2s;
    }
    &.Mui-focused fieldset {
      border-color: ${theme.palette.primary.light};
    }
  }
`
);

// export default StyledInputField;
