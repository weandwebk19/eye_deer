import { Box, Grid, Typography } from "@mui/material";

import { FormDialog } from "components/Dialog";
import { SearchField } from "components/TextField";
import { StyledHeadingTypography } from "components/Typography/StyledTypography";

import AddPresentation from "../../Group/PresentationList/AddPresentation";
import PresentationTabs from "./PresentationTabs";

const PresentationMangementDefault = () => {
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
            content="+ new presentation"
            title="create presentation"
            variant="primary"
            buttonSize="full"
          >
            <AddPresentation />
          </FormDialog>
        </Box>
        <StyledHeadingTypography variant="h5">presentation management.</StyledHeadingTypography>
      </Box>
      <Grid container columns={{ xs: 12 }}>
        <PresentationTabs />
      </Grid>
    </Box>
  );
};

export default PresentationMangementDefault;
