import { styled, alpha } from "@mui/system";
import {
  TextField,
  createTheme,
  ThemeProvider,
  InputBase,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export const customTheme = createTheme({
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
    }
    &.Mui-focused fieldset {
      border-color: ${theme.palette.primary.light};
    }
  }
`
);

const StyledSearch = styled("div")(({ theme }) => ({
  position: "relative",
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  border: `1px solid ${theme.palette.primary.dark}`,
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    // marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const StyledSearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "22ch",
      },
    },
  },
}));

export const StyledSearchField = () => {
  return (
    <StyledSearch>
      <StyledSearchIconWrapper>
        <SearchIcon />
      </StyledSearchIconWrapper>
      <StyledInputBase
        placeholder="search..."
        inputProps={{ "aria-label": "search" }}
      />
    </StyledSearch>
  );
};

// export default StyledInputField;
