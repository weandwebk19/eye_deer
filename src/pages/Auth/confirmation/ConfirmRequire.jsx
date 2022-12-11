import { Box, Button, Container, Link, Typography } from "@mui/material";

import { StyledButton } from "components/Button";
import { StyledHeadingTypography } from "components/Typography";

const ConfirmRequire = () => {
  return (
    <Container
      maxWidth="md"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <StyledHeadingTypography variant="h3">
          thanks you for your registration.
        </StyledHeadingTypography>
        <Box
          component="img"
          sx={{
            width: "200px",
            height: "200px",
            objectFit: "cover",
            my: 2,
          }}
          src="https://res.cloudinary.com/dbaulxzoc/image/upload/v1669542822/WeAndWeb/bg-img-1_ub2b4q.jpg"
          draggable={false}
        />
        <Typography gutterBottom>
          you have <b>successfully</b> registered, a confirmation e-mail will be
          sent shortly.
        </Typography>
        <Box sx={{ textAlign: "center" }}>
          kindly&nbsp;
          <Link
            href="https://mail.google.com/"
            rel="noopener"
            target="_blank"
            sx={{ textDecoration: "underline !important" }}
          >
            check your e-mail.
          </Link>
        </Box>
      </Box>
    </Container>
  );
};

export default ConfirmRequire;
