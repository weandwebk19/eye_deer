import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { Helmet } from "react-helmet";

import { CssBaseline, ThemeProvider } from "@mui/material";

import Register from "./pages/Auth/register";
import Login from "./pages/Auth/login";
import Home from "./pages/Home/Home";
import Dashboard from "./pages/Dashboard";

import { appTheme } from "./themes/theme";
import "./App.scss";

const App = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={appTheme}>
        <div className="App">
          <Helmet>
            <meta charSet="utf-8" />
            <title>eyedeer.</title>
            <link rel="canonical" href="http://mysite.com/example" />
          </Helmet>
          <CssBaseline />
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/register/*" element={<Register />} />
              <Route path="/login/*" element={<Login />} />
            </Routes>
          </Router>
        </div>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
