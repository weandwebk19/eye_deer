import { useNavigate } from "react-router-dom";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import NavigationIcon from "@mui/icons-material/Navigation";
import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  CardContent,
  Divider,
  Fab,
  Tooltip,
  Typography,
} from "@mui/material";

import Star1 from "assets/imgs/star-1.svg";
import PropTypes from "prop-types";

import { StyledButton } from "components/Button";
import { ContentBox } from "components/ContentBox";
import { SearchField } from "components/TextField";
import { StyledHeadingTypography } from "components/Typography";

import "../styles.scss";

const ChapterList = ({ name, picture, contentChips }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("./members");
  };

  const mockupData = {
    cards: [
      {
        id: 1,
        name: "1. Unnamed card neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur",
        picture: "",
        quiz: 11,
        member: 102,
      },
      {
        id: 2,
        name: "2. Unnamed card neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur",
        picture: "",
        quiz: 12,
        member: 92,
      },
      {
        id: 3,
        name: "3. Unnamed card neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur",
        picture: "",
        quiz: 13,
        member: 122,
      },
      {
        id: 4,
        name: "4. Unnamed card neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur",
        picture: "",
        quiz: 14,
        member: 142,
      },
    ],
  };

  return (
    <Box>
      <Tooltip title={name} followCursor>
        <StyledHeadingTypography
          variant="h3"
          className="text-limit text-limit--3-lines"
          mb={2}
        >
          "{name}"
        </StyledHeadingTypography>
      </Tooltip>

      <Box sx={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
        <Button
          sx={{
            textTransform: "lowercase",
            display: "flex",
            justifyContent: "space-between",
          }}
          onClick={handleNavigate}
        >
          <AvatarGroup max={4}>
            <Avatar
              alt="Remy Sharp"
              src="https://source.unsplash.com/random/?man"
            />
            <Avatar
              alt="Travis Howard"
              src="https://source.unsplash.com/random/?human"
            />
            <Avatar
              alt="Cindy Baker"
              src="https://source.unsplash.com/random/?girl"
            />
            <Avatar
              alt="Agnes Walker"
              src="https://source.unsplash.com/random/?girl"
            />
            <Avatar
              alt="Agnes Walker"
              src="https://source.unsplash.com/random/?girl"
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
            <StyledButton>+ new chapter</StyledButton>
          </Box>
        </Box>
        {mockupData.cards.map((card, i) => {
          return (
            <Box className="dashboard-quiz" key={card.id}>
              <ContentBox
                name={card.name}
                contentChips={(({ quiz, member }) => ({
                  quiz,
                  member,
                }))(card)}
              />
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

ChapterList.propTypes = {
  name: PropTypes.string.isRequired,
  picture: PropTypes.string,
  contentChips: PropTypes.objectOf(PropTypes.number),
};

ChapterList.defaultProps = {
  picture: null,
  contentChips: null,
};

export default ChapterList;
