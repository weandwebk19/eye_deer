import { Helmet, HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "react-query";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import { CssBaseline, ThemeProvider } from "@mui/material";
import Group from "pages/Group";
// preview page
import Profile from "pages/User/Profile";

import "./App.scss";
import Login from "./pages/Auth/login";
import Register from "./pages/Auth/register";
import Home from "./pages/Home";
import Play from "./pages/Play";
import PrivateRoute from "./routes/PrivateRoute";
import { appTheme } from "./themes/theme";

const App = () => {
  const queryClient = new QueryClient();

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={appTheme}>
          <div className="App">
            <Helmet>
              <meta charSet="utf-8" />
              <title>eyedeer.</title>
              {/* <link rel="canonical" href="http://mysite.com/example" /> */}
            </Helmet>
            <CssBaseline />
            <Router>
              <Routes>
                <Route path="/" element={<Play />} />
                <Route path="/register/*" element={<Register />} />
                <Route path="/login/*" element={<Login />} />
                <Route
                  exact
                  path="/home/*"
                  element={
                    <PrivateRoute>
                      <Home />
                    </PrivateRoute>
                  }
                />
                <Route
                  exact
                  path="/group/*"
                  element={
                    <PrivateRoute>
                      <Group />
                    </PrivateRoute>
                  }
                />
                <Route
                  exact
                  path="/profile/*"
                  element={
                    <PrivateRoute>
                      <Profile />
                    </PrivateRoute>
                  }
                />
              </Routes>
            </Router>
          </div>
        </ThemeProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;
