import { Box, Typography } from "@mui/material";

import { StyledButton } from "components/Button";
import { StyledHeadingTypography } from "components/Typography/StyledTypography";

const HomeFirstSection = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box sx={{ flexGrow: 1 }}>
        <StyledHeadingTypography variant="h5">***</StyledHeadingTypography>
        <StyledHeadingTypography variant="h5">
          eyedeer is an easy-to-build presentations web application with no
          installations or downloads required and it's totally free!
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
          src="https://res.cloudinary.com/dbaulxzoc/image/upload/v1669543514/WeAndWeb/bg-img-4_ujohe5.jpg"
          draggable={false}
        />
        <Typography>
          create an interactive experience letting everyone vote, ask questions,
          and interact throughout.
          <br />
          <br />
          interact with your audience using real-time voting.
          <br />
          build an immediate connection with your audience and make them a part
          of your presentation.
        </Typography>
      </Box>
    </Box>
  );
};

export default HomeFirstSection;
