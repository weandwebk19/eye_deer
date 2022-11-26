import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box, CardContent, Typography } from "@mui/material";

import PropTypes from "prop-types";

import { StyledButton } from "components/Button";
import { CarpetCard } from "components/Card/StyledCard";
import { SearchField } from "components/TextField";

const ChapterList = ({ name, picture, contentChips }) => {
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
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <SearchField />
        <StyledButton>+ new chapter</StyledButton>
      </Box>
      {mockupData.cards.map((card, i) => {
        return (
          <Box className="dashboard-quiz" key={card.id}>
            <CarpetCard
              name={card.name}
              picture={card.picture}
              contentChips={(({ quiz, member }) => ({
                quiz,
                member,
              }))(card)}
            />
          </Box>
        );
      })}
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
