import { Box, Typography } from "@mui/material";

import PropTypes from "prop-types";

import { StyledSelectField } from "components/SelectBox/StyledSelectField";
import { StyledInputField } from "components/TextField";

const CustomizerBox = ({ variant }) => {
  return (
    <Box>
      <Typography>slide style.</Typography>
      <StyledSelectField />
      <Typography>Content</Typography>
      {(() => {
        if (variant === "heading") {
          return (
            <Box>
              <Typography>heading</Typography>
              <StyledInputField label="multiple choice" />
            </Box>
          );
        } else if (variant === "paragraph") {
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

CustomizerBox.propTypes = {
  variant: PropTypes.string.isRequired,
};

export default CustomizerBox;
