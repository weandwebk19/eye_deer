import { Box, CardContent, Tooltip, Typography } from "@mui/material";

import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";

import PropTypes from "prop-types";

import { StyledCardActionArea } from "components/Card";
import { StyledContentBox } from "components/ContentBox/StyledContentBox";

const QuestionThumb = ({
  question,
  actionContent,
  handleClick,
  handleActionClick,
  isActive,
}) => {
  return (
    <Box>
      <Tooltip title={question?.content} followCursor>
        <StyledContentBox
          variant="brick"
          className={`question-content-box${isActive ? "--active" : ""}`}
        >
          <StyledCardActionArea onClick={handleClick}>
            <CardContent>
              <Typography variant="body2" noWrap>
                <b>{question?.content}</b>
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "center", mr: 2 }}>
                <Typography variant="h6" sx={{ mr: 0.5 }}>
                  {question?.upvote.length}
                </Typography>
                <ThumbUpAltOutlinedIcon fontSize="small" />
              </Box>
            </CardContent>
          </StyledCardActionArea>
        </StyledContentBox>
      </Tooltip>
      <Box className="action-content-box" onClick={handleActionClick}>
        <Typography variant="caption">{actionContent}</Typography>
      </Box>
    </Box>
  );
};

QuestionThumb.propTypes = {
  question: PropTypes.object.isRequired,
  handleClick: PropTypes.func.isRequired,
  actionContent: PropTypes.string,
  handleActionClick: PropTypes.func.isRequired,
  isActive: PropTypes.bool,
};

QuestionThumb.defaultProps = {
  actionContent: "",
  isActive: false,
};

export default QuestionThumb;
