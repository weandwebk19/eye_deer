import { useEffect, useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "react-query";
import { useSelector } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import { CssBaseline, ThemeProvider } from "@mui/material";

import PrivateRoute from "routes/PrivateRoute";

import { SnackBox } from "components/SnackBox";

import "./App.scss";
import { SocketContext, socket } from "./context/socket";
import { privateRoutes, publicRoutes } from "./routes";
import { appTheme } from "./themes/theme";

const App = () => {
  const queryClient = new QueryClient();
  const user = useSelector((state) => state.auth.user?.user);
  const [popupJoinPresentation, setPopupJoinPresentation] = useState();
  useEffect(() => {
    if (user) {
      socket.emit("CLIENT_CONECTED", user);
    }
    socket.on("SERVER_SEND_HOST_START_PRESENT", (data) => {
      const { code, presentationId, slideId, groupId, user } = data;
      setPopupJoinPresentation(
        <SnackBox
          presenter={user}
          presentationId={parseInt(presentationId, 10)}
          slideId={parseInt(slideId, 10)}
          code={code}
          groupId={parseInt(groupId, 10)}
        />
      );
    });
    return () => {
      if (user) {
        socket.emit("CLIENT_DISCONECTED", user);
      }
    };
  }, []);

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
                {popupJoinPresentation}
              </Router>
            </div>
          </ThemeProvider>
        </SocketContext.Provider>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;
