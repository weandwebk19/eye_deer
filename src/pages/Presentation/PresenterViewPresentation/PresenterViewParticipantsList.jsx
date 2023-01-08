import { useSelector } from "react-redux";

import { Avatar, ListItemAvatar, Stack, Typography } from "@mui/material";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

import ImageIcon from "@mui/icons-material/Image";
import KeyIcon from "@mui/icons-material/Key";

import PropTypes from "prop-types";

import VirtualizedList from "components/List/FolderList";

const PresenterViewParticipantsList = ({ listParticipants }) => {
  const user = useSelector((state) => state.auth.user?.user);
  const participantInfoComponent = () => {
    return listParticipants.map((participant, index) => {
      return (
        <ListItem key={participant.id}>
          <ListItemAvatar>
            {(() => {
              if (participant.picture) {
                return <Avatar alt="avatar" src={participant.picture} />;
              } else {
                return (
                  <Avatar>
                    <ImageIcon />
                  </Avatar>
                );
              }
            })()}
          </ListItemAvatar>
          <ListItemText
            primary={`${participant.firstName ?? ""} ${
              participant.lastName ?? ""
            }`}
            secondary={
              participant.id === user.id ? (
                <Stack direction="row">
                  <Typography>Host &nbsp;</Typography>
                  <KeyIcon />
                </Stack>
              ) : (
                "Paticipant"
              )
            }
          />
        </ListItem>
      );
    });
  };
  return <VirtualizedList items={participantInfoComponent()} />;
};

PresenterViewParticipantsList.propTypes = {
  listParticipants: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default PresenterViewParticipantsList;
