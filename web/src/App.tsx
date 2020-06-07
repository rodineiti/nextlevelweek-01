import React from "react";
import { ToastContainer } from "react-toastify";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

import Routes from "./routes";

function App() {
  return (
    <React.Fragment>
      <Routes />
      <ToastContainer
        autoClose={3000}
        draggable={false}
        pauseOnFocusLoss={false}
      />
    </React.Fragment>
  );
}

export default App;
