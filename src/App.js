import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { Helmet, HelmetProvider } from "react-helmet-async";

import { CssBaseline, ThemeProvider } from "@mui/material";

import PrivateRoute from "./routes/PrivateRoute";
import Register from "./pages/Auth/register";
import Login from "./pages/Auth/login";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Group from "pages/Group";

//preview page
import Profile from "pages/User/Profile";

import { appTheme } from "./themes/theme";
import "./App.scss";

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
                <Route path="/" element={<Home />} />
                <Route exact path="/dashboard" element={<PrivateRoute />}>
                  <Route exact path="/dashboard" element={<Dashboard />} />
                </Route>
                <Route exact path="/group" element={<PrivateRoute />}>
                  <Route exact path="/group/*" element={<Group />} />
                </Route>
                <Route path="/register/*" element={<Register />} />
                <Route path="/login/*" element={<Login />} />

                {/* Preview new page that has writed */}
                <Route path="/previewpage" element={<Profile />} />
              </Routes>
            </Router>
          </div>
        </ThemeProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;
