import { InputBase } from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";

import { alpha, styled } from "@mui/system";
import PropTypes from "prop-types";

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
  height: "100%",

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

const SearchField = ({ handleChange }) => {
  return (
    <StyledSearch sx={{ mr: 2 }} className="search-field">
      <StyledSearchIconWrapper>
        <SearchIcon />
      </StyledSearchIconWrapper>
      <StyledInputBase
        placeholder="search..."
        inputProps={{ "aria-label": "search" }}
        onChange={handleChange}
      />
    </StyledSearch>
  );
};

SearchField.propTypes = {
  handleChange: PropTypes.func,
};

SearchField.defaultProps = {
  handleChange: () => {},
};

export { SearchField };
