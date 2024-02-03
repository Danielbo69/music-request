import React, { useState } from "react";
import "./App.css";
import Home from "./components/Home/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import Spinner from "./components/Spinner/Spinner";

function App() {
  const [spinner, setSpinner] = useState(true);

  setTimeout(function () {
    setSpinner(false);
  }, 5000);

  if (!spinner) {
    return <Home />;
  } else {
    return <Spinner />;
  }
}

export default App;
