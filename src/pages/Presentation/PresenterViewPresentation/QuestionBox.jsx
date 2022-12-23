import React from "react";

import { Box, Grid, Typography } from "@mui/material";

import ThumbUpIcon from "@mui/icons-material/ThumbUp";

import { DefaultLayout } from "layouts";

import { StyledButton } from "components/Button";
import { StyledHeadingTypography } from "components/Typography";

import QuestionTabs from "./QuestionTabs";

const QuestionBox = () => {
  return (
    <Box p={4}>
      <Grid container spacing={2} columns={{ xs: 4, sm: 4, md: 12, lg: 12 }}>
        <Grid item xs={4} sm={2} md={5} lg={3}>
          <QuestionTabs />
        </Grid>
        <Grid item xs={4} sm={2} md={7} lg={9}>
          <Box sx={{ textAlign: "center" }}>
            <Typography>1/1</Typography>
            <Typography>Asked on Slide 1</Typography>
            <StyledHeadingTypography variant="h2">
              professor, what if æ gets hacked?
            </StyledHeadingTypography>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Typography variant="h6" sx={{ mr: 0.5 }}>
                1
              </Typography>
              <ThumbUpIcon fontSize="small" />
            </Box>
            <StyledButton variant="secondary">mark as answered</StyledButton>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
export default QuestionBox;
