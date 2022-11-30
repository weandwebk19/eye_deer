import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Chip,
  Typography,
} from "@mui/material";

import { getGroupById } from "httpClient";
import { PropTypes } from "prop-types";

import { StyledButton } from "components/Button";

const GroupInfo = () => {
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
    <Box sx={{ position: "sticky", top: 0 }}>
      <Box
        component="img"
        sx={{
          width: "100%",
          height: "200px",
          objectFit: "cover",
          mt: 2,
          mb: 2,
          flex: "1",
        }}
        src={
          groupInfo.picture ??
          "https://res.cloudinary.com/dbaulxzoc/image/upload/v1669543514/WeAndWeb/bg-img-4_ujohe5.jpg"
        }
        draggable={false}
      />

      <Typography variant="h6" gutterBottom>
        group's name.
      </Typography>
      <Typography gutterBottom>{groupInfo.name}</Typography>

      <Typography variant="h6" gutterBottom>
        group's description.
      </Typography>
      <Typography gutterBottom>{groupInfo.description}</Typography>

      <Typography variant="h6" gutterBottom>
        status
      </Typography>

      <Typography gutterBottom>
        {groupInfo.status === 1 ? (
          <Chip
            label="active"
            sx={{ marginRight: "8px", marginBottom: "8px" }}
          />
        ) : (
          <Chip
            label="inactive"
            sx={{ marginRight: "8px", marginBottom: "8px" }}
          />
        )}
      </Typography>

      <Typography variant="h6" gutterBottom>
        members
      </Typography>
      <Typography gutterBottom>{groupInfo.totalMember}</Typography>

      <Typography variant="h6" gutterBottom>
        chapter
      </Typography>
      <Typography gutterBottom>{groupInfo.totalChapter}</Typography>

      <Typography variant="h6" gutterBottom>
        capacity
      </Typography>
      <Typography gutterBottom>{groupInfo.capacity}</Typography>

      <Typography variant="h6" gutterBottom>
        create date
      </Typography>
      <Typography gutterBottom>{groupInfo.createdAt}</Typography>

      <Typography variant="h6" gutterBottom>
        last edit
      </Typography>
      <Typography gutterBottom>{groupInfo.updatedAt}</Typography>

      <StyledButton sx={{ width: "100%" }}>group settings</StyledButton>
    </Box>
  );
};

export default GroupInfo;
