import { Box, CardContent, Tooltip, Typography } from "@mui/material";

import ThumbUpIcon from "@mui/icons-material/ThumbUp";

import PropTypes from "prop-types";

import { StyledCardActionArea } from "components/Card";
import { StyledContentBox } from "components/ContentBox/StyledContentBox";

const QuestionContent = ({ name, actionContent, handleClick }) => {
  return (
    <Tooltip title={name} followCursor>
      <StyledContentBox variant="brick" className="presentation-content-box">
        <StyledCardActionArea onClick={handleClick}>
          <CardContent>
            <Box sx={{ display: "flex", justifyContent: "center", mr: 2 }}>
              <Typography variant="h6" sx={{ mr: 0.5 }}>
                1
              </Typography>
              <ThumbUpIcon fontSize="small" />
            </Box>
            <Typography variant="body2" noWrap>
              {name}
            </Typography>
            <Typography variant="caption" noWrap>
              {actionContent}
            </Typography>
          </CardContent>
        </StyledCardActionArea>
      </StyledContentBox>
    </Tooltip>
  );
};

QuestionContent.propTypes = {
  name: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  actionContent: PropTypes.string,
};

QuestionContent.defaultProps = {
  actionContent: "",
};

export default QuestionContent;
