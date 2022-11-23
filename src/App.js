import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { Helmet, HelmetProvider } from "react-helmet-async";

import { CssBaseline, ThemeProvider } from "@mui/material";

import PrivateRoute from "./routes/PrivateRoute";
import Register from "./pages/Auth/register";
import Login from "./pages/Auth/login";
import Play from "./pages/Play";
import Home from "./pages/Home";
import Group from "pages/Group";
import Chapter from "pages/Group/Chapter";
import MemberList from "pages/Group/Member";

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
                <Route path="/" element={<Play />} />
                <Route exact path="/home" element={<PrivateRoute />}>
                  <Route exact path="/home" element={<Home />} />
                </Route>
                <Route exact path="/group/*" element={<PrivateRoute />}>
                  <Route exact path="/group/*" element={<Group />} />
                </Route>
                <Route path="/register/*" element={<Register />} />
                <Route path="/login/*" element={<Login />} />

                <Route path="/profile" element={<Profile />} />
              </Routes>
            </Router>
          </div>
        </ThemeProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;
