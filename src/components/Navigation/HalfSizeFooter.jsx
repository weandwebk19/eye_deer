import { BottomNavigation, BottomNavigationAction, Box } from "@mui/material";
import { styled } from "@mui/system";

import PropTypes from "prop-types";

const socialmedias = ["facebook", "instagram", "twitter", "linkedin"];

const StyledBottomNavigation = styled(BottomNavigation)(
  ({ theme }) => `
  color: ${theme.palette.secondary.contrastText};
  background-color: ${theme.palette.secondary.main};
  padding: 0 ${theme.spacing(2)};
  position: fixed;
`
);

const HalfSizeFooter = ({ width1, width2 }) => {
  return (
    <Box>
      <StyledBottomNavigation
        showLabels={false}
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${width1 + width2 + 24}px)` },
          mr: { md: `${width1 + width2 + 24}px` },
          px: "48px",
          right: 0,
          bottom: 0,
          height: "32px",
          display: {
            xs: "none",
            sm: "flex",
            md: "flex",
          },
          justifyContent: "space-between !important",
        }}
      >
        {socialmedias.map((socialmedia) => (
          <BottomNavigationAction
            label={socialmedia}
            key={socialmedia}
            showLabel={true}
            sx={{
              display: "block",
              textTransform: "lowercase",
              flex: 0,
            }}
            className="bottom-navigation-socialmedia"
          />
          //   {socialmedia}
          // </BottomNavigationAction>
        ))}
        {/* </Box>
          </StyledToolbar>
        </Container> */}
      </StyledBottomNavigation>
    </Box>
  );
};

HalfSizeFooter.propTypes = {
  width1: PropTypes.number,
  width2: PropTypes.number,
};

HalfSizeFooter.defaultProps = {
  width1: 0,
  width2: 0,
};

export { HalfSizeFooter };
