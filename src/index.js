import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import { PersistGate } from "redux-persist/integration/react";

import App from "./App";
// import store from "./redux/store.redux";
// import setupInterceptors from "./services/setupInterceptors";
import { persistor, store } from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

// setupInterceptors(store);
