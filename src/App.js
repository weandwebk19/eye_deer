import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import {
  QueryClient,
  useQueryClient,
  QueryClientProvider,
  useQuery,
} from "react-query";

import { CssBaseline, ThemeProvider } from "@mui/material";

import Register from "./pages/Auth/register";
import Login from "./pages/Auth/login";

import Home from "./pages/Home";

import { appTheme } from "./themes/theme";
import "./App.scss";

const App = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={appTheme}>
        <div className="App">
          <CssBaseline />
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register/*" element={<Register />} />
              <Route path="/login/*" element={<Login />} />
            </Routes>
          </Router>
          {/* <Container maxWidth="lg">
        <Register />
      </Container> */}
        </div>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
