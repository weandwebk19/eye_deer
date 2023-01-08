import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { Typography } from "@mui/material";

import { Box } from "@mui/system";
import PropTypes from "prop-types";
import PresentationService from "services/presentationService";

const EditNamePresentation = ({ presentationId }) => {
  const roleType = useSelector((state) => state.role.roleType);
  const [presentation, setPresentation] = useState();

  useEffect(() => {
    (async () => {
      const presentationRes = await PresentationService.findPresentationById(
        presentationId
      );
      if (presentationRes) {
        setPresentation(presentationRes);
      }
    })();
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography disabled={roleType === 3}>{presentation?.name}</Typography>
    </Box>
  );
};

EditNamePresentation.propTypes = {
  presentationId: PropTypes.number.isRequired,
};

export default EditNamePresentation;
