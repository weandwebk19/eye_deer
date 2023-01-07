import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";

import { SocketContext } from "context/socket";
import PropTypes from "prop-types";
import PresentationService from "services/presentationService";

import { StyledButton } from "components/Button";
import { InstantMessage } from "components/Popup";

import { StyledSnackbar } from "./StyledSnackbar";

const SnackBox = ({ presenter, presentationId, slideId, code, groupId }) => {
  const [open, setOpen] = useState(true);
  const [isError, setIsError] = useState("");
  const [message, setMessage] = useState("");
  const [presentation, setPresentation] = useState();
  const navigate = useNavigate();
  const socket = useContext(SocketContext);

  useEffect(() => {
    (async () => {
      const presentationRes = await PresentationService.findPresentationById(
        presentationId
      );
      if (presentationRes) {
        setPresentation(presentationRes);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      socket.on("SERVER_SEND_JOIN_SUCCESS", (data, presentation) => {
        console.log("data", data);
        // const presentationParse = JSON.parse(presentation);
        console.log("presentation", presentation);
        navigate(
          `/presentation/${presentation?.presentationId}/${presentation?.slideId}/participating`
        );
      });
      socket.on("SERVER_SEND_JOIN_FAIL", () => {
        // setMessage(`Code ${data.code} could not be found. Please try again.`);
        setMessage("You cannot connect to this presentation on this time.");
        setIsError(true);
      });
    })();
  });

  useEffect(() => {
    if (isError) {
      setTimeout(() => {
        setIsError("");
      }, 5000);
    }
  }, [isError]);

  const handleAccept = () => {
    socket.emit("CLIENT_SEND_JOIN_PRESENTATION", {
      presentationId,
      slideId,
      code,
      groupId,
      user: presenter,
    });
    setOpen(false);
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
            {presentation?.name}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            {`${presenter.firstName ?? ""} ${presenter.lastName ?? ""}`}
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
      {(() => {
        if (isError === false) {
          return <InstantMessage variant="success" message={message} />;
        } else if (isError === true) {
          return <InstantMessage variant="error" message={message} />;
        }
      })()}
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
  presenter: PropTypes.object,
  presentationId: PropTypes.number,
  slideId: PropTypes.number,
  code: PropTypes.string,
  groupId: PropTypes.number,
};

SnackBox.defaultProps = {
  presenter: "",
  presentationId: 0,
  slideId: 0,
  code: "",
  groupId: 0,
};

export { SnackBox };
