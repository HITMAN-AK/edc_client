import React from "react";
import { Routes, Route } from "react-router-dom";
import Main from "./Main";
import Nav from "./Nav";
import Ca from "./Ca";
function App() {
  return (
    <div>
      <Nav />
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/ca" element={<Ca />}></Route>
      </Routes>
    </div>
  );
}
export default App;
