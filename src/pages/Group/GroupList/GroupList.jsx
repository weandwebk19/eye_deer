import { Box, Grid, Typography } from "@mui/material";

import { StyledButton } from "components/Button";
import { FormDialog } from "components/Dialog";
import { SearchField } from "components/TextField";
import { StyledHeadingTypography } from "components/Typography/StyledTypography";

import AddNewGroup from "./AddNewGroup";
import GroupTabs from "./GroupTabs";

const GroupList = () => {
  return (
    <Box sx={{ width: "100%" }}>
      <Box my={2}>
        <Box
          mb={3}
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <SearchField />
          <FormDialog
            content="+ new group"
            title="Add group"
            variant="secondary"
          >
            <AddNewGroup />
          </FormDialog>
        </Box>
        <StyledHeadingTypography variant="h5">group.</StyledHeadingTypography>
      </Box>
      <GroupTabs />
    </Box>
  );
};

export { GroupList };
