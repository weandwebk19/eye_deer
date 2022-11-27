import { useLocation, useNavigate } from "react-router-dom";

import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Chip,
  Typography,
} from "@mui/material";

import { StyledButton } from "components/Button";

const GroupInfo = () => {
  const navigate = useNavigate();
  const onNavigate = () => {
    navigate("./members");
  };

  return (
    <Box sx={{ position: "sticky", top: 0 }}>
      <Box
        component="img"
        sx={{
          width: "100%",
          height: "200px",
          objectFit: "cover",
          mt: 2,
          mb: 2,
          flex: "1",
        }}
        src="https://source.unsplash.com/random/?rococo"
        draggable={false}
      />

      <Typography variant="h6" gutterBottom>
        group's description.
      </Typography>
      <Typography gutterBottom>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui optio eos
        fugit accusamus nesciunt? Commodi tenetur culpa illum, inventore iste
        incidunt dignissimos sequi beatae, iusto, magnam deserunt non laborum
        accusantium.
      </Typography>

      <Typography variant="h6" gutterBottom>
        status
      </Typography>
      <Typography gutterBottom>active</Typography>

      <Typography variant="h6" gutterBottom>
        members
      </Typography>
      <Typography gutterBottom>102</Typography>

      <Typography variant="h6" gutterBottom>
        chapter
      </Typography>
      <Typography gutterBottom>10</Typography>

      <Typography variant="h6" gutterBottom>
        topic
      </Typography>
      <Box>
        <Chip label="la" sx={{ marginRight: "8px", marginBottom: "8px" }} />
        <Chip label="vi" sx={{ marginRight: "8px", marginBottom: "8px" }} />
        <Chip label="em" sx={{ marginRight: "8px", marginBottom: "8px" }} />
        <Chip label="hanh" sx={{ marginRight: "8px", marginBottom: "8px" }} />
        <Chip label="phuc" sx={{ marginRight: "8px", marginBottom: "8px" }} />
        <Chip label="khi" sx={{ marginRight: "8px", marginBottom: "8px" }} />
        <Chip label="co" sx={{ marginRight: "8px", marginBottom: "8px" }} />
        <Chip label="anh" sx={{ marginRight: "8px", marginBottom: "8px" }} />
        <Chip label="ben" sx={{ marginRight: "8px", marginBottom: "8px" }} />
        <Chip label="canh" sx={{ marginRight: "8px", marginBottom: "8px" }} />
        <Chip label="em" sx={{ marginRight: "8px", marginBottom: "8px" }} />
      </Box>

      <Typography variant="h6" gutterBottom>
        create date
      </Typography>
      <Typography gutterBottom>April 20th, 2001 21:00PM</Typography>

      <Typography variant="h6" gutterBottom>
        last edit
      </Typography>
      <Typography gutterBottom>November 22nd, 2022 23:07PM</Typography>

      <StyledButton sx={{ width: "100%" }}>group settings</StyledButton>
    </Box>
  );
};

export default GroupInfo;
