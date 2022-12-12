import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import GroupService from "services/groupService";

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

import { StyledButton } from "components/Button";
import { ContentBox } from "components/ContentBox";
import { FormDialog } from "components/Dialog";
import { SearchField } from "components/TextField";

import "../styles.scss";
import AddPresentation from "./AddPresentation";

const PresentationList = ({ name, picture, contentChips }) => {
  const navigate = useNavigate();
  const params = useParams();
  const [presentationList, setPresentationList] = useState([]);

  const handleGroupNavigate = () => {
    navigate("/group");
  };

  const handleMemberNavigate = () => {
    navigate("./members");
  };

  const menulist = [
    {
      id: 1,
      name: "presentation settings",
      onClick: () => {
        console.log("presentation settings");
      },
    },
    {
      id: 2,
      name: "remove",
      onClick: () => {
        console.log("remove");
      },
    },
  ];

  useEffect(()=>{
    // call api to get presentation list of this group
    (async ()=>{
      const groupId = params.id;
      const data = await GroupService.getPresentationList(groupId);
      setPresentationList(data);

      console.log(data);
    })()
  }, []);

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
          <SearchField />
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
        {presentationList.map((card, i) => {
          return (
            <Box className="dashboard-quiz" key={card.id}>
              <ContentBox
                name={card.name}
                index={i}
                contentChips={(({ quizzes, code}) => ({
                  quizzes, code,
                }))(card)}
                handleClick={() => {
                  navigate(`/presentation/${card.id}/1/edit`);
                }}
                handleChange={() => {
                  console.log(`${card.i} handle change`);
                }}
                menulist={menulist}
              />
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

PresentationList.propTypes = {
  name: PropTypes.string.isRequired,
  picture: PropTypes.string,
  contentChips: PropTypes.objectOf(PropTypes.number),
};

PresentationList.defaultProps = {
  picture: null,
  contentChips: null,
};

export default PresentationList;
