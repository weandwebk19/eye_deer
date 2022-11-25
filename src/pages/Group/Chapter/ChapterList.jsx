import { Box, Typography, CardContent } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import { StyledCard, CarpetCard } from "components/Card/StyledCard";
import { StyledButton } from "components/Button";
import { SearchField } from "components/TextField";

const ChapterSet = ({ name, picture, contentChips }) => {
  const mockupData = {
    cards: [
      {
        name: "1. Unnamed card neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur",
        picture: "",
        quiz: 11,
        member: 102,
      },
      {
        name: "2. Unnamed card neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur",
        picture: "",
        quiz: 12,
        member: 92,
      },
      {
        name: "3. Unnamed card neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur",
        picture: "",
        quiz: 13,
        member: 122,
      },
      {
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
          <Box className="dashboard-quiz" key={i}>
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

export default ChapterSet;
