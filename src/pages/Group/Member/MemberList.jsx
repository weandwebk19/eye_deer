import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Divider,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { alpha } from "@mui/material/styles";

import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import FilterListIcon from "@mui/icons-material/FilterList";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ShareIcon from "@mui/icons-material/Share";

import { visuallyHidden } from "@mui/utils";
import AncientScrollIcon from "assets/icons/ancient-scroll.png";
import Star2 from "assets/imgs/star-2.svg";
import config from "config";
import PropTypes from "prop-types";
import GroupService from "services/groupService";

import { StyledButton } from "components/Button";
import { VisitCard } from "components/Card";
import { FormDialog } from "components/Dialog";
import { BasicModal } from "components/Modal";
import { InstantMessage } from "components/Popup";
import { SearchField } from "components/TextField";
import { StyledHeadingTypography } from "components/Typography/StyledTypography";

import "../styles.scss";
import AddMember from "./AddMember";
import EditContentDialog from "./EditMember/EditContentDialog";
import MemberListTable from "./MemberListTable";

// const handleKickOut = async (members) => {
//   if (Array.isArray(members)) {
//     await Promise.all(members.map(async (member) => {
//       // call api terminate co-ownership
//       const res = await kickOutMember(
//         currentUser,
//         dispatch,
//         groupId,
//         member.id
//       );

//       if (res.success === true) {
//         setMessageFromServer(res.message);
//         setIsError(false);
//       } else {
//         setMessageFromServer(res.message);
//         setIsError(true);
//       }
//     }));
//   }
// };

const MemberList = ({ name }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const params = useParams();
  const groupId = params.id;

  const [isError, setIsError] = useState("");
  const [messageFromServer, setMessageFromServer] = useState("");

  const [owner, setOwner] = useState();
  const [coOwners, setCoOwners] = useState([]);
  const [members, setMembers] = useState([]);
  const roleType = useSelector((state) => state.role.roleType);
  const type = roleType === 1 ? 1 : 2; // type 1: can edit, type 2: not edit

  useEffect(() => {
    (async () => {
      try {
        const ownerRes = await GroupService.getOwner(groupId);
        if (ownerRes && ownerRes.success === true) {
          setOwner(ownerRes.data);
        }
        const coOwnerRes = await GroupService.getListCoOwners(groupId);
        if (coOwnerRes && coOwnerRes.success === true) {
          setCoOwners(coOwnerRes.data);
        }

        const members = await GroupService.getLitsMembers(groupId);
        setMembers(members);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  const generateInvitationLink = () => {
    const link = `${config.FRONTEND_URL}/group/${groupId}/join`;
    return link;
  };

  const handleNavigate = (e) => {
    navigate(`/group/${groupId}`);
  };

  const menuCoOwners = coOwners.map((coOwner, index) => {
    return [
      {
        id: index,
        children: "terminate co-ownership",
        onClick: async () => {
          // call api terminate co-ownership
          const res = await GroupService.terminateCoOwner(groupId, coOwner.id);

          // handle res
          if (res.success === true) {
            // add to members list
            const newMembers = members.concat(coOwners[index]);
            setMembers(newMembers);

            // remove from ui
            const newCoOwners = [...coOwners];
            newCoOwners.splice(index, 1);
            setCoOwners(newCoOwners);

            setMessageFromServer(res.message);
            setIsError(false);
          } else {
            setMessageFromServer(res.message);
            setIsError(true);
          }
        },
      },
    ];
  });

  return (
    <Box>
      <Box sx={{ width: "100%", display: "flex", height: "56px" }}>
        <Button onClick={handleNavigate} sx={{ textTransform: "lowercase" }}>
          <KeyboardBackspaceIcon sx={{ mr: 1 }} />
          <Typography>back</Typography>
        </Button>
      </Box>
      <Divider sx={{ mt: 2, mb: 2 }}>
        <Box
          component="img"
          alt="star"
          src={Star2}
          sx={{ width: "24px", height: "100%" }}
          draggable={false}
        />
      </Divider>
      <Box my={4}>
        <StyledHeadingTypography variant="h5" gutterBottom>
          owner.
        </StyledHeadingTypography>
        <VisitCard variant="special" user={owner} />
        {coOwners.length !== 0 && (
          <div>
            <StyledHeadingTypography variant="h5" gutterBottom sx={{ mt: 4 }}>
              co-owner.
            </StyledHeadingTypography>
            <Grid
              spacing={2}
              container
              columns={{ xs: 4, sm: 4, md: 12, lg: 12 }}
            >
            <Grid
              spacing={2}
              container
              columns={{ xs: 4, sm: 4, md: 12, lg: 12 }}
            >
              {coOwners.map((coOwner, index) => {
                return (
                  <Grid item xs={4} sm={2} md={6} lg={4} key={coOwner.id}>
                    <VisitCard
                      user={coOwner}
                      menulist={type === 1 ? menuCoOwners[index] : []}
                    />
                  </Grid>
                );
              })}
            </Grid>
          </div>
        )}
      </Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          mb: 2,
        }}
      >
        <SearchField />
        {type === 1 && (
          <Box sx={{ display: "flex" }} className="button-group">
            <Box mr={2}>
              <FormDialog
                content="+ add member"
                title="Add member"
                variant="secondary"
              >
                <AddMember />
              </FormDialog>
            </Box>
            <BasicModal
              title="Invitation link"
              content="generate invitation link"
              variant="primary"
            >
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography className="text-limit">
                  {generateInvitationLink()}
                </Typography>
                <Tooltip title="Copy link">
                  <IconButton
                    sx={{ marginLeft: 2 }}
                    aria-label="delete"
                    size="small"
                  >
                    <ContentCopyIcon fontSize="inherit" />
                  </IconButton>
                </Tooltip>
              </Box>
            </BasicModal>
          </Box>
        )}
      </Box>
      <MemberListTable
        members={members}
        setMembers={setMembers}
        setCoOwners={setCoOwners}
      />
      {(() => {
        if (isError === false) {
          return (
            <InstantMessage variant="success" message={messageFromServer} />
          );
        } else if (isError === true) {
          return <InstantMessage variant="error" message={messageFromServer} />;
        }
        return "";
      })()}
    </Box>
  );
};

MemberList.propTypes = {
  name: PropTypes.string,
};

MemberList.defaultProps = {
  name: "",
};

export default MemberList;
