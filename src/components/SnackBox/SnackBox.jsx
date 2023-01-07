import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";

import PropTypes from "prop-types";

import { StyledButton } from "components/Button";

import { StyledSnackbar } from "./StyledSnackbar";

const SnackBox = ({ presenter, name }) => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  const handleAccept = () => {
    navigate("/presentation/1/1/participating");
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const action = (
    <Card sx={{ display: "flex" }}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h5">
            {name}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            {presenter}
          </Typography>
        </CardContent>
        <Stack
          direction="row"
          spacing={1}
          sx={{ alignItems: "center", pl: 1, pb: 1 }}
        >
          <StyledButton variant="secondary" size="small" onClick={handleClose}>
            reject
          </StyledButton>
          <StyledButton
            size="small"
            onClick={() => {
              handleAccept();
            }}
            sx={{ px: 3 }}
          >
            join now
          </StyledButton>
        </Stack>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        image="https://res.cloudinary.com/dbaulxzoc/image/upload/v1669543514/WeAndWeb/bg-img-4_ujohe5.jpg"
        alt="Live from space album cover"
      />
    </Card>
  );
  return (
    <StyledSnackbar
      open={open}
      autoHideDuration={100000}
      onClose={handleClose}
      message="now presenting"
      action={action}
    />
  );
};

SnackBox.propTypes = {
  presenter: PropTypes.string,
  name: PropTypes.string,
};

SnackBox.defaultProps = {
  presenter: "",
  name: "",
};

export { SnackBox };
