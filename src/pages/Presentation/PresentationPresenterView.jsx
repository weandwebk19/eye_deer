import * as React from "react";

import { Box } from "@mui/material";

import { StyledPaper } from "components/Paper";

import ChartSlide from "./EditPresentation/PresentationSlide/ChartSlide";
import PresentationPresenterMenu from "./PresentationPresenterMenu";

const data = [
  {
    name: "option 1",
    vote: 15,
  },
  {
    name: "option 2",
    vote: 25,
  },
  {
    name: "option 3",
    vote: 2,
  },
  {
    name: "option 4",
    vote: 10,
  },
  {
    name: "option 5",
    vote: 11,
  },
  {
    name: "option 6",
    vote: 32,
  },
];

const PresenatationPresenterView = () => {
  return (
    <StyledPaper
      className="presentation-presenter-view__container"
      sx={{ height: "100vh", width: "100vw", position: "relative" }}
    >
      <PresentationPresenterMenu />

      <Box className="presentation-presenter-view__content">
        <ChartSlide
          question={`I would never fall in love again until I found her.
          I said, “I would never fall unless it’s you I fall into”`}
          data={data}
        />
      </Box>
    </StyledPaper>
  );
};

export default PresenatationPresenterView;
