import { Helmet, HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "react-query";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import { CssBaseline, ThemeProvider } from "@mui/material";

import PrivateRoute from "routes/PrivateRoute";

import "./App.scss";
import { SocketContext, socket } from "./context/socket";
import { playRoutes, privateRoutes, publicRoutes } from "./routes";
import { appTheme } from "./themes/theme";

const App = () => {
  const queryClient = new QueryClient();

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <SocketContext.Provider value={socket}>
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
                  {publicRoutes.map((route, index) => {
                    const Page = route.component;
                    return (
                      <Route
                        key={route.path}
                        path={route.path}
                        element={<Page />}
                      />
                    );
                  })}
                  {privateRoutes.map((route, index) => {
                    const Page = route.component;
                    return (
                      <Route
                        key={route.path}
                        path={route.path}
                        element={
                          <PrivateRoute>
                            <Page />
                          </PrivateRoute>
                        }
                      />
                    );
                  })}
                </Routes>
              </Router>
            </div>
          </ThemeProvider>
        </SocketContext.Provider>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;
