import { Box } from "@mui/system";

import { StyledInputField } from "components/TextField";

const EditNamePresentation = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <StyledInputField defaultValue="Hello World" />
    </Box>
  );
};

export default EditNamePresentation;
