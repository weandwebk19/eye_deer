import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

import { Box, Tooltip } from "@mui/material";

import { getJoinedGroups, getOwnedGroups } from "httpClient";
import { PropTypes } from "prop-types";

import { StyledHeadingTypography } from "components/Typography";

import "./styles.scss";

const GroupHeader = ({ name }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.login.currentUser);

  useEffect(() => {
    (async () => {
      try {
        const ownedGroups = await getOwnedGroups(currentUser, dispatch);
        const joinedGroups = await getJoinedGroups(currentUser, dispatch);

        console.log();
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  return (
    <Box>
      <Tooltip title={name} followCursor>
        <StyledHeadingTypography
          variant="h3"
          className="text-limit text-limit--3-lines"
          mb={2}
        >
          "{name}"
        </StyledHeadingTypography>
      </Tooltip>
      <Outlet />
    </Box>
  );
};

GroupHeader.propTypes = {
  name: PropTypes.string.isRequired,
};

export default GroupHeader;
