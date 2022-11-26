import { Box, Grid, Typography } from "@mui/material";

import { StyledButton } from "components/Button";
import { SearchField } from "components/TextField";
import { StyledHeadingTypography } from "components/Typography/StyledTypography";

import GroupTabs from "./GroupTabs";

const GroupList = () => {
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
          <SearchField />
          <StyledButton className="add-group-button">+ new group</StyledButton>
        </Box>
        <StyledHeadingTypography variant="h5">group.</StyledHeadingTypography>
      </Box>
      <GroupTabs />

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

export { GroupList };
