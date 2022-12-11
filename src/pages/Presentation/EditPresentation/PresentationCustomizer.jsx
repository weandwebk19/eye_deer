import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { Box, Typography } from "@mui/material";

import PropTypes from "prop-types";

import { StyledSelectField } from "components/SelectBox/StyledSelectField";
import { StyledInputField } from "components/TextField";

const data1 = [
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

const data2 = [
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
];

const slideList = [
  {
    slideid: 1,
    type: 1,
    question: "chart here",
    data: data1,
  },
  {
    slideid: 2,
    type: 2,
    question: "heading here",
  },
  {
    slideid: 3,
    type: 3,
    question: "paragraph here",
    paragraph: "lorem ipsum",
  },
  {
    slideid: 4,
    type: 1,
    question: "chart here",
    data: data2,
  },
];

const PresentationCustomizer = () => {
  const { slideid } = useParams();
  console.log(slideid);
  const slideType = useSelector((state) => state.presentation);

  return (
    <Box>
      <Typography>slide style.</Typography>
      <StyledSelectField />
      <Typography>Content</Typography>
      {(() => {
        if (slideType.slideStyle === 2) {
          return (
            <Box>
              <Typography>heading</Typography>
              <StyledInputField label="heading" />
            </Box>
          );
        } else if (slideType.slideStyle === 3) {
          return (
            <Box>
              <Typography>heading</Typography>
              <StyledInputField label="heading" />
              <Typography>paragraph</Typography>
              <StyledInputField label="paragraph" />
            </Box>
          );
        } else {
          return (
            <Box>
              <Typography>your question</Typography>
              <StyledInputField label="multiple choice" />
              <Typography>options</Typography>
              <StyledInputField label="option 1" />
              <StyledInputField label="option 2" />
              <StyledInputField label="option 3" />
            </Box>
          );
        }
      })()}
    </Box>
  );
};

export default PresentationCustomizer;
