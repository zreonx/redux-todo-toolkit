import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "animate.css";

import { store } from "./redux/store";
import { Provider } from "react-redux";
import { TodoContextProvider } from "./context/TodoContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <TodoContextProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </TodoContextProvider>
);
