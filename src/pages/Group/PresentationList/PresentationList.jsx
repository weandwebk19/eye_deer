import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Divider,
  Typography,
} from "@mui/material";

import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

import Star1 from "assets/imgs/star-1.svg";
import { socket } from "context/socket";
import SettingPresentation from "pages/PresentationManagement/SettingPresentation";
import PropTypes from "prop-types";
import GroupService from "services/groupService";
import PresentationService from "services/presentationService";

import { ContentBox } from "components/ContentBox";
import { FormDialog } from "components/Dialog";
import { SearchField } from "components/TextField";

import "../styles.scss";
import AddAlreadyPresentation from "./AddAlreadyPresentation";
import AddPresentation from "./AddPresentation";
import RemovePresentationInGroup from "./RemovePresentationInGroup";

const PresentationList = ({ name, picture, contentChips }) => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const params = useParams();
  const groupId = params.id;
  const [presentationList, setPresentationList] = useState([]);
  const [removePresentationInGroup, setRemovePresentationInGroup] =
    useState(false);
  const [settingPresentation, setSettingPresentation] = useState(false);
  const [presentationStart, setPresentationStart] = useState();
  const roleType = useSelector((state) => state.role.roleType);

  const handleGroupNavigate = () => {
    navigate("/group");
  };

  const handleMemberNavigate = () => {
    navigate("./members");
  };

  const handleRemovePresentationInGroup = () => {
    setRemovePresentationInGroup(true);
  };

  const handleSettingPresentation = () => {
    setSettingPresentation(true);
  };

  const createRemovePresentationButton = (props) => {
    const removePresentationButton = (
      <FormDialog content="remove" title="Remove Presentation">
        <RemovePresentationInGroup {...props} />
      </FormDialog>
    );
    return removePresentationButton;
  };

  const createSettingPresentationButton = (props) => {
    const settingPresentationButton = (
      <FormDialog content="setting" title="Setting Presentation">
        <SettingPresentation {...props} />
      </FormDialog>
    );
    return settingPresentationButton;
  };
  const menulist = (props) => {
    return [
      {
        id: 1,
        children: createSettingPresentationButton(props),
        onClick: () => {},
      },
      {
        id: 2,
        children: createRemovePresentationButton(props),
        onClick: () => {},
      },
    ];
  };

  useEffect(() => {
    // call api to get presentation list of this group
    (async () => {
      const data = await GroupService.getPresentationList(groupId);

      setPresentationList(data);
      setRemovePresentationInGroup(false);
      setSettingPresentation(false);

      console.log(data);
    })();
  }, [removePresentationInGroup, settingPresentation]);

  useEffect(() => {
    // listen start event
    socket.emit("GET_PRESENTATION_PRESENTING_IN_GROUP", groupId);
    socket.on("SERVER_SEND_PRESENTATION_PRESENTING", (presentationId) => {
      setPresentationStart(presentationId);
    });
  }, []);

  return (
    <Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button
          onClick={handleGroupNavigate}
          sx={{ textTransform: "lowercase" }}
        >
          <KeyboardBackspaceIcon sx={{ mr: 1 }} />
          <Typography>back to groups</Typography>
        </Button>
        <Button
          sx={{
            textTransform: "lowercase",
            display: "flex",
            justifyContent: "space-between",
          }}
          onClick={handleMemberNavigate}
        >
          <AvatarGroup max={4}>
            <Avatar
              alt="Remy Sharp"
              src="https://res.cloudinary.com/dbaulxzoc/image/upload/v1669543514/WeAndWeb/bg-img-4_ujohe5.jpg"
            />
            <Avatar
              alt="Travis Howard"
              src="https://res.cloudinary.com/dbaulxzoc/image/upload/v1669543514/WeAndWeb/bg-img-4_ujohe5.jpg"
            />
            <Avatar
              alt="Cindy Baker"
              src="https://res.cloudinary.com/dbaulxzoc/image/upload/v1669543514/WeAndWeb/bg-img-4_ujohe5.jpg"
            />
            <Avatar
              alt="Agnes Walker"
              src="https://res.cloudinary.com/dbaulxzoc/image/upload/v1669543514/WeAndWeb/bg-img-4_ujohe5.jpg"
            />
            <Avatar
              alt="Agnes Walker"
              src="https://res.cloudinary.com/dbaulxzoc/image/upload/v1669543514/WeAndWeb/bg-img-4_ujohe5.jpg"
            />
          </AvatarGroup>
          <Typography sx={{ textAlign: "end", ml: 2 }}>
            view all members
          </Typography>
        </Button>
      </Box>
      <Divider sx={{ mt: 2, mb: 2 }}>
        <Box
          component="img"
          alt="star"
          src={Star1}
          sx={{ width: "24px", height: "100%" }}
          draggable={false}
        />
      </Divider>
      <Box>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            mb: 2,
          }}
        >
          <SearchField
            handleChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <Box
            className="button-group"
            sx={{
              display: "flex",
              gap: "24px",
            }}
          >
            {roleType !== 3 && (
              <FormDialog
                content="+ public presentation"
                title="find and add a public presentation"
                variant="secondary"
              >
                <AddAlreadyPresentation />
              </FormDialog>
            )}
            {roleType !== 3 && (
              <FormDialog
                content="+ new presentation"
                title="create new presentation"
                variant="primary"
              >
                <AddPresentation />
              </FormDialog>
            )}
          </Box>
        </Box>
        {presentationList
          .filter((presentation) => {
            return search.toLowerCase() === ""
              ? presentation
              : presentation.name.toLowerCase().includes(search);
          })
          .map((presentation, i) => {
            return (
              <Box className="dashboard-quiz" key={presentation.id}>
                <ContentBox
                  name={presentation.name}
                  index={i}
                  contentChips={(({ slides, code, status, isPresenting }) => ({
                    slides,
                    code,
                    status: status == 0 ? "private" : "public",
                    isPresenting:
                      presentationStart == presentation.id ? "true" : "false",
                  }))(presentation)}
                  handleClick={() => {
                    (async () => {
                      const firstSlideRes =
                        await PresentationService.getFirstSlide(
                          presentation.id
                        );
                      if (firstSlideRes.success === true) {
                        const firstSlide = firstSlideRes.data;
                        navigate(
                          `./presentation/${presentation.id}/${firstSlide.id}/edit`
                        );
                      }
                    })();
                  }}
                  handleChange={() => {
                    console.log(`${presentation.i + 1} handle change`);
                  }}
                  menulist={
                    roleType == 1
                      ? menulist({
                          groupId,
                          presentationId: presentation.id,
                          handleRemovePresentationInGroup,
                          handleSettingPresentation,
                        })
                      : []
                  }
                />
              </Box>
            );
          })}
      </Box>
    </Box>
  );
};

PresentationList.propTypes = {
  name: PropTypes.string,
  picture: PropTypes.string,
  contentChips: PropTypes.objectOf(PropTypes.number),
};

PresentationList.defaultProps = {
  name: "",
  picture: null,
  contentChips: null,
};

export default PresentationList;
