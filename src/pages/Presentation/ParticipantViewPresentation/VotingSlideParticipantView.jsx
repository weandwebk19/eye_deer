import { useContext, useState } from "react";
import { useParams } from "react-router-dom";

import { Grid, Stack } from "@mui/material";

import { SocketContext } from "context/socket";
import PropTypes from "prop-types";

import { OptionCard } from "components/Card";
import { StyledHeadingTypography } from "components/Typography";

const VotingSlideParticipantView = ({ question, data, code }) => {
  const [isVote, setIsVote] = useState(false);
  const params = useParams();
  const presentationId = params.id;
  const slideId = params.slideid;
  const socket = useContext(SocketContext);
  const handleVoting = (e, optionId) => {
    // console.log(e);
    // console.log(optionId);
    socket.emit("PARTICIPANT_SEND_INCREASE_VOTE", {
      presentationId,
      slideId,
      optionId,
      code,
    });
    setIsVote(true);
  };
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
      {(() => {
        if (isVote) {
          return (
            <StyledHeadingTypography variant="h4" sx={{ textAlign: "center" }}>
              you have voted, please wait for the presenter to show the next
              slide.
            </StyledHeadingTypography>
          );
        } else {
          return (
            <Grid
              container
              spacing={2}
              columns={{ xs: 4, sm: 4, md: 12, lg: 12 }}
              sx={{ width: "calc(100% - 16px)" }}
            >
              {data.map((option) => {
                return (
                  <Grid item xs={4} sm={2} md={6} lg={6} key={option.id}>
                    <OptionCard
                      name={option.content}
                      handleClick={(e) => {
                        handleVoting(e, option.id);
                      }}
                    />
                  </Grid>
                );
              })}
            </Grid>
          );
        }
      })()}
    </Stack>
  );
};

VotingSlideParticipantView.propTypes = {
  question: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.object),
  code: PropTypes.string,
};

VotingSlideParticipantView.defaultProps = {
  question: "",
  data: [],
  code: "",
};

export default VotingSlideParticipantView;
