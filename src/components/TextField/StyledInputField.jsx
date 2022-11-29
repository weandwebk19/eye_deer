import { TextField } from "@mui/material";
import { styled } from "@mui/system";

const StyledInputField = styled(TextField)(
  ({ theme, customvariant = "default" }) => ({
    "& .MuiInput-underline:after": {
      borderBottomColor: "white",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: `${theme.palette.primary.main}`,
        borderRadius: 0,
      },
      "&.Mui-focused fieldset": {
        borderColor: `${theme.palette.primary.light}`,
      },
    },
    ...(customvariant === "default" && {
      background: `${theme.palette.secondary.main}`,
    }),
    ...(customvariant === "light" && {
      background: `${theme.palette.secondary.light}`,
    }),
  })
);

export { StyledInputField };
