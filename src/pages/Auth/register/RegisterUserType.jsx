import { useNavigate, useLocation, Link } from "react-router-dom";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Box, Container, Grid } from "@mui/material";
import RegisterCard from "./RegisterCard";
import { StyledHeadingTypography } from "../../../components/Typography/StyledTypography";
import { StyledPrimaryButton } from "../../../components/Button/StyledButton";
import Gradient1 from "../../../assets/imgs/gradient.png";
import { useGetWorkplaces } from "../../../hooks";

const RegisterUserType = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { isLoading, error, data, isFetching } = useGetWorkplaces();

  if (isLoading) return "Loading...";
  if (error) return "An error has occurred: " + error.message;

  const handleNavigate = () => {
    const path = "/register/form";
    navigate(path, { state: { workplace: data, role: state.role } });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
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
            <Box sx={{ mt: 8 }}>
              <Grid
                container
                columns={{ xs: 4, sm: 8, md: 12 }}
                // spacing={{ xs: 2, sm: 2, md: 3 }}
                mx="auto"
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                {data.map((workplace, i) => {
                  return (
                    <Grid item xs={2} sm={4} md={3} key={i}>
                      <Link
                        to="/register/form"
                        state={{ workplace: workplace.id, role: state.role }}
                        key={i}
                      >
                        <RegisterCard cardItem={workplace} />
                      </Link>
                    </Grid>
                  );
                })}
                <div>{isFetching ? "Updating..." : ""}</div>
              </Grid>
            </Box>
          </Box>
          <StyledPrimaryButton sx={{ width: "200px" }} onClick={handleNavigate}>
            Other
          </StyledPrimaryButton>
        </Container>
      </Box>
    </LocalizationProvider>
  );
};

export default RegisterUserType;
