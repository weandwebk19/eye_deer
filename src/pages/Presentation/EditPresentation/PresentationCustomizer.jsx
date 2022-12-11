import { useState } from "react";
import { useSelector } from "react-redux";

import { Box, Typography } from "@mui/material";

import PropTypes from "prop-types";

import { StyledSelectField } from "components/SelectBox/StyledSelectField";
import { StyledInputField } from "components/TextField";

const PresentationCustomizer = () => {
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
