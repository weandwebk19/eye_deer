import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import useSize from "@react-hook/size";

import {
  Container,
  CssBaseline,
  Box,
  Grid,
  Typography,
  Avatar,
  IconButton,
  Tooltip,
} from "@mui/material";

import { StyledHeadingTypography } from "components/Typography/StyledTypography";
import { StyledButton, AvatarButton } from "components/Button";
import { CarpetCard } from "components/Card";

import HomeQuizSet from "./HomeQuizSet";

const HomeLastSection = ({ fullname, user }) => {
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

  const navigate = useNavigate();

  const dashboardEyeDeerTitle = useRef();
  const [, typoHeight] = useSize(dashboardEyeDeerTitle);

  const handleNavigateGroup = () => {
    navigate("../group");
  };

  return (
    <Grid
      container
      columns={{ xs: 4, sm: 8, md: 4 }}
      spacing={2}
      id="dashboard-md-last-tab"
    >
      <Grid
        item
        xs={4}
        sm={4}
        md={4}
        id="dashboard-welcome"
        sx={{
          display: "grid",
          alignContent: "space-between",
        }}
      >
        <Box>
          <Box sx={{ display: "flex" }}>
            <Box sx={{ flexGrow: 1 }}>
              <StyledHeadingTypography variant="h3">
                welcome!
              </StyledHeadingTypography>
              <StyledHeadingTypography variant="h4" gutterBottom>
                {fullname}
              </StyledHeadingTypography>
              <Typography>
                join eyedeer. <br />- world’s largest free gamify learning
                platform.
              </Typography>
            </Box>
            <AvatarButton
              picture={user?.picture}
              fullname={fullname}
            ></AvatarButton>
          </Box>

          <Box sx={{ flexGrow: 1 }}>
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
              src="https://source.unsplash.com/random/?deer,antelope,forest"
              draggable={false}
            ></Box>
          </Box>
        </Box>
        <Box>
          <Grid
            container
            columns={{ xs: 1, sm: 1, md: 2, lg: 2 }}
            spacing={2}
            // mb={0}
          >
            <Grid item xs={1} sm={1} md={1} lg={1}>
              <StyledButton
                sx={{ width: "100%" }}
                variant="secondary"
                onClick={handleNavigateGroup}
              >
                my group
              </StyledButton>
            </Grid>
            <Grid item xs={1} sm={1} md={1} lg={1}>
              <StyledButton sx={{ width: "100%" }}>create quizzes</StyledButton>
            </Grid>
          </Grid>
        </Box>
      </Grid>

      <Grid
        item
        xs={4}
        sm={4}
        md={4}
        sx={{ height: `calc(100% - ${typoHeight}px - 5.60px)` }}
      >
        <Typography variant="h6" gutterBottom ref={dashboardEyeDeerTitle}>
          my eyedeer(s)
        </Typography>
        <Box
          id="dashboard-quizzes-list"
          // columns={{ xs: 4, sm: 4, md: 4, lg: 4 }}
          // spacing={2}
          sx={{ width: "100%" }}
        >
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
      </Grid>
    </Grid>
  );
};

export default HomeLastSection;
