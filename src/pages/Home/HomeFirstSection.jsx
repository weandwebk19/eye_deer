import { Box, Typography } from "@mui/material";
import { StyledButton } from "components/Button";
import { StyledHeadingTypography } from "components/Typography/StyledTypography";

import HomeNewGroup from "./HomeNewGroup";

const HomeFirstSection = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box sx={{ flexGrow: 1 }}>
        <StyledHeadingTypography variant="h5">***</StyledHeadingTypography>
        <StyledHeadingTypography variant="h5">
          eyedeer is a game-based learning platform where folks join, answer
          questions, and compete against each other.
        </StyledHeadingTypography>
        <Box
          component="img"
          sx={{
            width: "100%",
            maxHeight: "300px",
            objectFit: "cover",
            mt: 2,
            mb: 2,
            flex: "1",
          }}
          src="https://source.unsplash.com/random/?deer,antelope,forest"
          draggable={false}
        ></Box>
        <Typography>
          it is a super fun and competitive way for those who want to practice
          and learn content.
          <br />
          <br />
          Instead of simply answering questions individually, folks are
          challenged to answer them correctly and as quickly as possible against
          another opponent. To make it even harder, joined people has only a
          limited amount of time to answer.
        </Typography>
      </Box>

      <Box
        sx={{ width: "100%", display: "flex", flexDirection: "row-reverse" }}
      >
        <HomeNewGroup />
        <StyledButton variant="secondary">getting started</StyledButton>
      </Box>
    </Box>
  );
};

export default HomeFirstSection;
