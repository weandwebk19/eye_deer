import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  Badge,
  Box,
  Divider,
  Fab,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Tooltip,
} from "@mui/material";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import CloseIcon from "@mui/icons-material/Close";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import QuestionAnswerOutlinedIcon from "@mui/icons-material/QuestionAnswerOutlined";
import RefreshIcon from "@mui/icons-material/Refresh";
import TimerOutlinedIcon from "@mui/icons-material/TimerOutlined";
import ZoomInMapIcon from "@mui/icons-material/ZoomInMap";
import ZoomOutMapIcon from "@mui/icons-material/ZoomOutMap";

import MyLogo1 from "assets/imgs/logo.svg";
import { SocketContext } from "context/socket";
import PropTypes from "prop-types";
import PresentationService from "services/presentationService";

import ChatBox from "components/ChatBox/ChatBox";
import { FormDialog } from "components/Dialog";
import { BasicModal } from "components/Modal";
import { StyledHeadingTypography } from "components/Typography";

// const actions = [
//   { icon: <ZoomInMapIcon />, name: "Zoom in", handleClick:()=>{} },
//   { icon: <ZoomOutMapIcon />, name: "Zoom out" },
//   { icon: <RefreshIcon />, name: "Reset results" },
//   { icon: <TimerOutlinedIcon />, name: "Start countdown" },
// ];

const PresentationPresenterMenu = ({
  slideList,
  currentSlide,
  setSlideList,
  setCurrentSlide,
}) => {
  const params = useParams();
  const slideId = params.slideid;
  const presentationId = params.id;
  // const currentSlide = slideList.find((slide) => slide.id === Number(slideId));
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [votingReset, setVotingReset] = useState(false);
  const [isLock, setIsLock] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const socket = useContext(SocketContext);
  const [code, setCode] = useState();
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleToggleFullScreen = () => {
    if (isFullScreen) {
      document.webkitExitFullscreen();
    } else {
      document.body.requestFullscreen();
    }
    setIsFullScreen(!isFullScreen);
  };

  useEffect(() => {
    const exitHandler = () => {
      if (
        !document.fullscreenElement &&
        !document.webkitIsFullScreen &&
        !document.mozFullScreen &&
        !document.msFullscreenElement
      ) {
        if (isFullScreen) {
          setIsFullScreen(!isFullScreen);
        }
      }
    };
    if (document.addEventListener) {
      document.addEventListener("webkitfullscreenchange", exitHandler, false);
      document.addEventListener("mozfullscreenchange", exitHandler, false);
      document.addEventListener("fullscreenchange", exitHandler, false);
      document.addEventListener("MSFullscreenChange", exitHandler, false);
    }
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const res = await PresentationService.getCodePresentation(
          presentationId
        );
        if (res.success === true) {
          setCode(res.data);
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  const handleToggleLock = () => {
    setIsLock(!isLock);
  };

  const handleNextSlide = (e) => {
    const newIndex = slideList.indexOf(currentSlide) + 1;
    if (newIndex >= 0 && newIndex < slideList.length) {
      const newSlide = slideList[newIndex];
      socket.emit("HOST_MOVE_TO_SLIDE", {
        code,
        presentationId,
        slideId: newSlide.id,
      });
      setCurrentSlide(newSlide);
      navigate(`/presentation/${presentationId}/${newSlide.id}/presenting`);
    }
  };

  const handlePrevSlide = (e) => {
    const newIndex = slideList.indexOf(currentSlide) - 1;
    if (newIndex >= 0 && newIndex < slideList.length) {
      const newSlide = slideList[newIndex];
      socket.emit("HOST_MOVE_TO_SLIDE", {
        code,
        presentationId,
        slideId: newSlide.id,
      });
      setCurrentSlide(newSlide);
      navigate(`/presentation/${presentationId}/${newSlide.id}/presenting`);
    }
  };

  return (
    <>
      <Box className="presentation-presenter-view__menu">
        <Box>
          <Tooltip title="Return to edit">
            <Fab
              size="small"
              color="primary"
              aria-label="add"
              sx={{ mt: 2, ml: 2 }}
              onClick={() => {
                navigate("../edit");
                socket.emit("HOST_END_PRESENT", code);
              }}
            >
              <CloseIcon />
            </Fab>
          </Tooltip>
        </Box>
        <Box>
          <Box
            sx={{
              height: 56,
              mb: 2,
              ml: 2,
              backgroundColor: "#292929",
              color: "#cecece",
              borderRadius: "30px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              px: 2,
            }}
          >
            <Stack direction="row" spacing={1}>
              <IconButton color="secondary" onClick={handleToggleFullScreen}>
                {(() => {
                  if (isFullScreen) return <ZoomInMapIcon />;
                  return <ZoomOutMapIcon />;
                })()}
              </IconButton>

              <Divider
                orientation="vertical"
                flexItem
                sx={{ borderColor: "#4d4d4d" }}
              />

              <IconButton color="secondary">
                <RefreshIcon />
              </IconButton>
              <IconButton
                color="secondary"
                onClick={handleClick}
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              >
                <TimerOutlinedIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    border: "1px solid #292929",
                    mt: -8,
                  },
                }}
                transformOrigin={{ horizontal: "center", vertical: "top" }}
                anchorOrigin={{ horizontal: "center", vertical: "top" }}
              >
                <MenuItem>
                  <StyledHeadingTypography variant="h5">
                    1
                  </StyledHeadingTypography>
                  &nbsp;minute
                </MenuItem>
                <MenuItem>
                  <StyledHeadingTypography variant="h5">
                    30
                  </StyledHeadingTypography>
                  &nbsp;seconds
                </MenuItem>
                <MenuItem>
                  <StyledHeadingTypography variant="h5">
                    10
                  </StyledHeadingTypography>
                  &nbsp;seconds
                </MenuItem>
              </Menu>
              <Box>
                {(() => {
                  const content = (
                    <IconButton color="secondary" onClick={handleToggleLock}>
                      {(() => {
                        if (isLock) return <LockOpenOutlinedIcon />;
                        return <LockOutlinedIcon />;
                      })()}
                    </IconButton>
                  );
                  return (
                    <BasicModal
                      title={`voting is ${isLock ? "open" : "closed"}`}
                      content={content}
                      variant="primary"
                    />
                  );
                })()}
              </Box>

              <Divider
                orientation="vertical"
                flexItem
                sx={{ borderColor: "#4d4d4d" }}
              />
              <IconButton color="secondary" onClick={handlePrevSlide}>
                <ArrowCircleLeftIcon />
              </IconButton>
              <IconButton color="secondary" onClick={handleNextSlide}>
                <ArrowCircleRightIcon />
              </IconButton>
            </Stack>
          </Box>
        </Box>
      </Box>
      <Box sx={{ position: "absolute", bottom: 16, right: 16 }}>
        <Box sx={{ opacity: "1 !important" }}>
          <Stack direction="row" spacing={2}>
            {(() => {
              const content = (
                <Badge
                  badgeContent={999}
                  color="primary"
                  overlap="circular"
                  max={999}
                >
                  <IconButton>
                    <QuestionAnswerOutlinedIcon
                      color="action"
                      sx={{ height: 24, width: 24 }}
                    />
                  </IconButton>
                </Badge>
              );
              return (
                <FormDialog
                  FormDialog
                  content={content}
                  title="chat box"
                  variant={null}
                >
                  <ChatBox />
                </FormDialog>
              );
            })()}
            <Badge
              badgeContent={999}
              color="primary"
              overlap="circular"
              max={999}
            >
              <IconButton>
                <AccountCircleIcon
                  color="action"
                  sx={{ height: 24, width: 24 }}
                />
              </IconButton>
            </Badge>
          </Stack>
        </Box>
      </Box>
      <Box sx={{ position: "absolute", top: 16, right: 16 }}>
        <img
          className="presentation-logo"
          src={MyLogo1}
          alt="eyedeer logo"
          draggable="false"
        />
      </Box>
    </>
  );
};
PresentationPresenterMenu.propTypes = {
  currentSlide: PropTypes.object.isRequired,
  slideList: PropTypes.arrayOf(PropTypes.object).isRequired,
  setSlideList: PropTypes.func,
  setCurrentSlide: PropTypes.func,
};

PresentationPresenterMenu.defaultProps = {
  setSlideList: () => {},
  setCurrentSlide: () => {},
};
export default PresentationPresenterMenu;
