import { useNavigate } from "react-router-dom";

import {
  Button,
  CardActionArea,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";

import PropTypes from "prop-types";

import { StyledCard } from "components/Card";
import { ContentBox } from "components/ContentBox";

const GroupTabContent = ({
  id,
  chapters,
  contentChips,
  members,
  name,
  picture,
  menulist,
}) => {
  const navigate = useNavigate();
  const handleClick = (e) => {
    const path = `/group/${id}`;
    navigate(path, { state: { groupId: id } });
  };
  return (
    <ContentBox
      variant="brick"
      name={name}
      picture={picture}
      index={id}
      contentChips={contentChips}
      handleClick={handleClick}
      menulist={menulist}
    />
  );
};

GroupTabContent.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string,
  chapters: PropTypes.number,
  members: PropTypes.number,
  picture: PropTypes.string,
  contentChips: PropTypes.objectOf(PropTypes.number).isRequired,
  menulist: PropTypes.arrayOf(PropTypes.object).isRequired,
};

GroupTabContent.defaultProps = {
  name: "",
  chapters: 0,
  members: 0,
  picture: "",
};

export default GroupTabContent;
