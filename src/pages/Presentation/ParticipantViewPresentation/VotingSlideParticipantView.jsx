import { Grid, Stack } from "@mui/material";

import PropTypes from "prop-types";

import { OptionCard } from "components/Card";
import { StyledHeadingTypography } from "components/Typography";

const VotingSlideParticipantView = ({ question, data }) => {
  return (
    <Stack spacing={4}>
      <StyledHeadingTypography
        className="text-stroke"
        variant="h3"
        sx={{ textAlign: "center" }}
        gutterBottom
      >
        {question}
      </StyledHeadingTypography>
      <Grid
        container
        spacing={2}
        columns={{ xs: 4, sm: 4, md: 12, lg: 12 }}
        sx={{ width: "calc(100% - 16px)" }}
      >
        {data.map((option) => {
          return (
            <Grid item xs={4} sm={2} md={6} lg={6} key={option.id}>
              <OptionCard name={option.name} />
            </Grid>
          );
        })}
      </Grid>
    </Stack>
  );
};

VotingSlideParticipantView.propTypes = {
  question: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.object),
};

VotingSlideParticipantView.defaultProps = {
  question: "",
  data: [],
};

export default VotingSlideParticipantView;
