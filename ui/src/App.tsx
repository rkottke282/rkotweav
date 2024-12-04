import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Splash from "./Splash";
import PropBets from "./propbets/main";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/propbets" element={<PropBets />} />
      </Routes>
    </Router>
  );
};

export default App;