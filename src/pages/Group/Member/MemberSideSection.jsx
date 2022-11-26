import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { Box, Avatar } from "@mui/material";

import { StyledHeadingTypography } from "components/Typography/StyledTypography";
import { StyledButton } from "components/Button";

import MemberCard from "./MemberCard";

import defaultAvatar from "assets/imgs/avatar.jpg";

const MemberOwnerInfo = () => {
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.auth.login.currentUser);
  const user = currentUser?.user;

  const handleNavigate = () => {
    navigate(-1);
  };

  return (
    <Box sx={{ position: "sticky", top: 0 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
          // height: "calc(100vh - 88px)",
          // overflowY: "scroll !important",
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
            marginRight: "16px !important",
          }}
        >
          <StyledButton
            variant="secondary"
            sx={{ width: "100%" }}
            onClick={handleNavigate}
          >
            go back to group
          </StyledButton>
          <StyledHeadingTypography variant="h5">
            group owner.
          </StyledHeadingTypography>
          <Box sx={{ flexGrow: 1 }}>
            <Avatar
              src={user.picture || defaultAvatar}
              alt="avatar"
              variant="rounded"
              sx={{
                width: "100%",
                height: "auto",
                objectFit: "cover",
              }}
            />
          </Box>
          <StyledHeadingTypography variant="h5">
            co-owner.
          </StyledHeadingTypography>
          {Array.apply(null, Array(5)).map((_, i) => {
            return (
              <Box key={i} mb={2}>
                <MemberCard />
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default MemberOwnerInfo;
