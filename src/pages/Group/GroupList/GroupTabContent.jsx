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

const GroupTabContent = ({ id, chapters, members, name, picture }) => {
  const navigate = useNavigate();
  const handleClick = (e) => {
    const path = `/group/${id}`;
    navigate(path, { state: { groupId: id } });
  };
  return (
    <Grid item xs={4} sm={4} md={2} lg={1}>
      <StyledCard variant="brick" onClick={handleClick}>
        <CardActionArea>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignContent: "space-between",
              height: "100%",
              padding: "5px",
            }}
          >
            <CardContent sx={{ flexGrow: 1 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Typography>{members} member(s)</Typography>
              </Box>
            </CardContent>
            <Typography variant="h6" noWrap>
              {name}
            </Typography>
          </Box>
        </CardActionArea>
      </StyledCard>
    </Grid>
  );
};

GroupTabContent.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string,
  chapters: PropTypes.number,
  members: PropTypes.number,
  picture: PropTypes.string,
};

GroupTabContent.defaultProps = {
  name: "",
  chapters: 0,
  members: 0,
  picture: "",
};

export default GroupTabContent;
