import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

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
import PropTypes from "prop-types";
import GroupService from "services/groupService";

import { StyledButton } from "components/Button";
import { ContentBox } from "components/ContentBox";
import { FormDialog } from "components/Dialog";
import { SearchField } from "components/TextField";

import "../styles.scss";
import AddPresentation from "./AddPresentation";
import RemovePresentation from "./RemovePresentation";

const PresentationList = ({ name, picture, contentChips }) => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const params = useParams();
  const [presentationList, setPresentationList] = useState([]);
  const [removePresentation, setRemovePresentation] = useState(false);

  const handleGroupNavigate = () => {
    navigate("/group");
  };

  const handleMemberNavigate = () => {
    navigate("./members");
  };

  const handleRemovePresentation = (isRemove) => {
    setRemovePresentation(isRemove);
  };

  const createRemovePresentationButton = (props) => {
    const removePresentationButton = (
      <FormDialog content="remove" title="Remove Presentation">
        <RemovePresentation {...props} />
      </FormDialog>
    );
    return removePresentationButton;
  };

  const createSettingPresentationButton = (props) => {
    const settingPresentationButton = (
      <FormDialog content="setting" title="Setting Presentation">
        rename change visability
      </FormDialog>
    );
    return settingPresentationButton;
  };
  const menulist = (props) => {
    return [
      {
        id: 1,
        children: createSettingPresentationButton(props),
        onClick: () => {
          console.log("presentation settings");
        },
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
      const groupId = params.id;
      const data = await GroupService.getPresentationList(groupId);

      setPresentationList(data);
      setRemovePresentation(false);

      console.log(data);
    })();
  }, [removePresentation]);

  // data to ui test
  const mockupData = {
    cards: [
      {
        id: 1,
        index: 1,
        name: "1. Unnamed card neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur",
        picture: "",
        quiz: 11,
        member: 102,
      },
      {
        id: 2,
        index: 2,
        name: "2. Unnamed card neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur",
        picture: "",
        quiz: 12,
        member: 92,
      },
      {
        id: 3,
        index: 3,
        name: "3. Unnamed card neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur",
        picture: "",
        quiz: 13,
        member: 122,
      },
      {
        id: 4,
        index: 4,
        name: "4. Unnamed card neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur",
        picture: "",
        quiz: 14,
        member: 142,
      },
    ],
  };

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
            }}
          >
            <FormDialog
              content="+ new presentation"
              title="Create new presentation"
              variant="primary"
            >
              <AddPresentation />
            </FormDialog>
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
                  contentChips={(({ slides, code }) => ({
                    slides,
                    code,
                  }))(presentation)}
                  handleClick={() => {
                    navigate(`/presentation/${presentation.id}/1/edit`);
                    console.log(navigate);
                  }}
                  handleChange={() => {
                    console.log(`${presentation.i + 1} handle change`);
                  }}
                  menulist={menulist({
                    presentationId: presentation.id,
                    handleRemovePresentation,
                  })}
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
