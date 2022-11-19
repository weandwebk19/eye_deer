import { Link } from "react-router-dom";
import RegisterCard from "./RegisterCard";
import { Container, Box, Grid, Link as MuiLink } from "@mui/material";
import { StyledHeadingTypography } from "../../../components/Typography/StyledTypography";
import Gradient1 from "../../../assets/imgs/gradient.png";
import { useGetRoles } from "../../../hooks";

const RegisterHome = () => {
  const { isLoading, error, data, isFetching } = useGetRoles();
  if (isLoading) return "Loading...";
  if (error) return "An error has occurred: " + error.message;

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
            choose your account type.
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
              {data?.map((role, i) => {
                return (
                  <Grid
                    item
                    xs={2}
                    sm={4}
                    md={6}
                    key={i}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Link
                      to={`${
                        role.id === 1
                          ? "/register/user-type"
                          : "/register/birthday"
                      }`}
                      state={{ role: role.id }}
                    >
                      <RegisterCard cardItem={role} />
                    </Link>
                  </Grid>
                );
              })}
              <div>{isFetching ? "Updating..." : ""}</div>
            </Grid>
            <Grid
              container
              justifyContent="center"
              alignItems="flex-end"
              sx={{ mt: 6 }}
            >
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
