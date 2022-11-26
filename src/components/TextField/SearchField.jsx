import { styled, alpha } from "@mui/system";
import { InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

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

const SearchField = () => {
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

export { SearchField };
