import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useParams } from "react-router-dom";

import { Box, Tooltip } from "@mui/material";

import { getGroupById } from "httpClient";
import { PropTypes } from "prop-types";

import { StyledHeadingTypography } from "components/Typography";

import "./styles.scss";

const GroupHeader = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.login.currentUser);
  const [groupInfo, setGroupInfo] = useState("");

  const groupId = params.id;

  useEffect(() => {
    (async () => {
      try {
        const info = await getGroupById(currentUser, dispatch, groupId);
        setGroupInfo(info);
      } catch (e) {
        console.log(e);
      }
    })();
  }, [groupId]);

  return (
    <Box>
      <Tooltip title={groupInfo.name} followCursor>
        <StyledHeadingTypography
          variant="h3"
          className="text-limit text-limit--3-lines"
          mb={2}
        >
          "{groupInfo.name}"
        </StyledHeadingTypography>
      </Tooltip>
      <Outlet />
    </Box>
  );
};

export default GroupHeader;
