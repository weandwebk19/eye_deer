import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import LockIcon from "@mui/icons-material/Lock";
import PublicIcon from "@mui/icons-material/Public";
import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Chip,
  Typography,
} from "@mui/material";

import { PropTypes } from "prop-types";
import GroupService from "services/groupService";
import { dateFormatter } from "utils/dateFormatter";

import { StyledButton } from "components/Button";

const GroupInfo = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.user);
  const [groupInfo, setGroupInfo] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [updatedAt, setUpdatedAt] = useState("");
  const groupId = params.id;
  const roleType = useSelector(state => state.role.roleType);

  useEffect(() => {
    (async () => {
      try {
        const info = await GroupService.getGroupById(groupId);
        setGroupInfo(info);
        setCreatedAt(dateFormatter(info.createdAt));
        setUpdatedAt(dateFormatter(info.updatedAt));
      } catch (e) {
        console.log(e);
      }
    })();
  }, [groupId]);

  return (
    <Box id="side-area--fixed">
      <Box>
        { roleType == 1 &&
        <StyledButton variant="secondary" sx={{ width: "100%" }}>
          group settings
        </StyledButton>
        }
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
          group's description
        </Typography>
        <Typography gutterBottom>{groupInfo.description}</Typography>

        <Typography variant="h6" gutterBottom>
          status
        </Typography>

        <Typography gutterBottom>
          {groupInfo.status === 0 ? (
            <Box>
              <LockIcon /> a private group
            </Box>
          ) : (
            // <Chip
            //   label="active"
            //   sx={{ marginRight: "8px", marginBottom: "8px" }}
            // />
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <PublicIcon sx={{ mr: 1 }} /> a public group
            </Box>
            // <Chip
            //   label="inactive"
            //   sx={{ marginRight: "8px", marginBottom: "8px" }}
            // />
          )}
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" gutterBottom>
            members
          </Typography>
          <Typography gutterBottom>{groupInfo.totalMember}</Typography>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" gutterBottom>
            presentation
          </Typography>
          <Typography gutterBottom>{groupInfo.totalPresentation}</Typography>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" gutterBottom>
            capacity
          </Typography>
          <Typography gutterBottom>{groupInfo.capacity}</Typography>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" gutterBottom>
            create date
          </Typography>
          <Typography gutterBottom>{createdAt}</Typography>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" gutterBottom>
            last edit
          </Typography>
          <Typography gutterBottom>{updatedAt}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default GroupInfo;
