import { Button, Grid } from "@mui/material";

import PropTypes from "prop-types";

const ChooseMemberButton = ({ user, onClick }) => {
  return (
    <Button onClick={onClick}>
      <Grid container spacing={3} pt={1} flexDirection="column">
        <Grid item xs={6} sm={6} md={6} lg={6}>
          avatar
        </Grid>
        <Grid item xs={6} sm={6} md={6} lg={6}>
          {user.username}
        </Grid>
      </Grid>
    </Button>
  );
};

ChooseMemberButton.propTypes = {
  user: PropTypes.object.isRequired,
  onClick: PropTypes.func,
};

ChooseMemberButton.defaultProps = {
  onClick: () => {},
};

export default ChooseMemberButton;
