import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { Typography } from "@mui/material";
import { Box } from "@mui/system";

import { joinTheGroup } from "httpClient";

import { StyledButton } from "components/Button";
import { InstantMessage } from "components/Popup";

const JoinContent = () => {
  const params = useParams();
  const groupId = params.id;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.login.currentUser);
  const [isError, setIsError] = useState("");
  const [message, setMessage] = useState("");

  const handleClick = (e) => {
    (async () => {
      const res = await joinTheGroup(user, dispatch, groupId).catch((err) => {
        setMessage(err.message);
        setIsError(true);
      });
      console.log(res);

      if (res.success === true) {
        setMessage(res.message);
        setIsError(false);
        setTimeout(() => {
          navigate(`/group/${groupId}`);
        }, 1000);
      } else {
        setMessage(res.message);
        setIsError(true);
      }
    })();
  };

  return (
    <Box
      mb={3}
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Typography>
        Click <strong>Join Group</strong> on the button below to join this
        group.
      </Typography>
      <StyledButton onClick={handleClick}>join group.</StyledButton>
      <Typography>
        By joining the group, you agree to our Terms of Service and Privacy
        Statement
      </Typography>
      {(() => {
        if (isError === false) {
          return <InstantMessage variant="success" message={message} />;
        } else if (isError === true) {
          return <InstantMessage variant="error" message={message} />;
        }
        return "";
      })()}
    </Box>
  );
};

export default JoinContent;
