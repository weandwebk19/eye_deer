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

const PresentationTabContent = ({
  id,
  contentChips,
  name,
  picture,
  menulist,
}) => {
  const navigate = useNavigate();
  const handleClick = (e) => {
    const path = `/presentation/${id}/1/edit`;
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

PresentationTabContent.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string,
  picture: PropTypes.string,
  contentChips: PropTypes.objectOf(PropTypes.object).isRequired,
  menulist: PropTypes.arrayOf(PropTypes.object).isRequired,
};

PresentationTabContent.defaultProps = {
  name: "",
  picture: "",
};

export default PresentationTabContent;
