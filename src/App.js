import Register from "./components/auth/register";

import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";

import "./App.scss";

const App = () => {
  return (
    <div className="App">
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        <CssBaseline />
        <Container maxWidth="md">
          <Register />
        </Container>
      </Grid>
    </div>
  );
};

export default App;
