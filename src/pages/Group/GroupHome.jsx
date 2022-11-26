import { Box, Grid } from "@mui/material";

import { StyledPrimaryButton } from "components/";
import { StyledSearchField } from "components/TextField";
import { StyledHeadingTypography } from "components/Typography/StyledTypography";

const GroupHome = () => {
  return (
    <Box>
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
          <StyledSearchField />
          <StyledPrimaryButton className="add-group-button">
            + new group
          </StyledPrimaryButton>
        </Box>
        <StyledHeadingTypography variant="h5">group.</StyledHeadingTypography>
      </Box>
      {/* <HomeTabs
      // dashboardNavHeight={dashboardNavHeight}
      // dashboardHeaderHeight={dashboardHeaderHeight}
    /> */}

      <Box
        pb={2}
        sx={{
          display: "block",
          width: "100%",
          overflowY: "scroll !important",
          // height: {
          //   xs: `calc(100vh - ${
          //     dashboardNavHeight + dashboardHeaderHeight + 64 + 24
          //   }px)`,
          // },
        }}
      >
        <Grid
          container
          columns={{ xs: 4, sm: 4, md: 4, lg: 4 }}
          spacing={2}
          sx={{ width: "100%" }}
        >
          {/* {Array.apply(null, Array(15)).map((_, i) => {
            return (
              <Grid item xs={4} sm={4} md={2} lg={2} key={i}>
              </Grid>
            );
          })} */}
        </Grid>
      </Box>
    </Box>
  );
};

export default GroupHome;
