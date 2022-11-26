import { Link, useNavigate } from "react-router-dom";

import { Box, Container, Grid, Link as MuiLink } from "@mui/material";

import { StyledButton } from "components/Button";
import { SimpleCard } from "components/Card";
import { StyledHeadingTypography } from "components/Typography/StyledTypography";

import Gradient1 from "../../../assets/imgs/gradient.png";
import { useGetWorkplaces } from "../../../hooks";

const RegisterHome = () => {
  const navigate = useNavigate();
  const { isLoading, error, data, isFetching } = useGetWorkplaces();
  if (isLoading) return "Loading...";
  if (error) return `An error has occurred: ${error.message}`;

  const handleNavigate = () => {
    const path = "/register/birthday";
    navigate(path, { state: { workplace: null } });
  };

  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Container
        component="main"
        maxWidth="md"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <Box>
          {/* <Box sx={{ isolation: "isolate" }}> */}
          <StyledHeadingTypography
            className="text-stroke"
            component="h1"
            variant="h3"
            align="center"
            color="textPrimary"
            gutterBottom
          >
            describe your workplace.
          </StyledHeadingTypography>
          <img src={Gradient1} alt="deco gradient" className="deco-img-1" />

          {/* </Box> */}
          <Box sx={{ mt: 8 }}>
            <Grid
              container
              columns={{ xs: 4, sm: 8, md: 12 }}
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              {data?.map((workplace) => {
                return (
                  <Grid
                    item
                    xs={2}
                    sm={4}
                    md={3}
                    key={workplace.id}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Link
                      to="/register/birthday"
                      state={{ workplace: workplace.id }}
                    >
                      <SimpleCard
                        name={workplace.name}
                        className={`role-card role-card--${workplace.name} workplace-card workplace-card--${workplace.id}`}
                      />
                    </Link>
                  </Grid>
                );
              })}
              <div>{isFetching ? "Updating..." : ""}</div>
            </Grid>

            <Grid
              container
              justifyContent="center"
              alignItems="center"
              sx={{ mt: 6, display: "flex", flexDirection: "column" }}
            >
              <Grid item>
                <StyledButton
                  sx={{ width: "200px", marginBottom: "16px" }}
                  onClick={handleNavigate}
                >
                  Other
                </StyledButton>
              </Grid>
              <Grid item>
                <MuiLink
                  className="text-stroke"
                  href="/login"
                  variant="body2"
                  sx={{ padding: "0 2px" }}
                >
                  already have an account? <b>login</b>
                </MuiLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default RegisterHome;
