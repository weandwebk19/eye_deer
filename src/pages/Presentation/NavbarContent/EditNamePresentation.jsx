import { Box } from "@mui/system";

import { StyledInputField } from "components/TextField";
import { useSelector } from "react-redux";

const EditNamePresentation = () => {
  const roleType = useSelector(state => state.role.roleType);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <StyledInputField defaultValue="Hello World" disabled={roleType == 3}/>
    </Box>
  );
};

export default EditNamePresentation;
