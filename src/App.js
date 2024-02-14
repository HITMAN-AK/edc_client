import React from "react";
import { Routes, Route } from "react-router-dom";
import Main from "./Main";
import Nav from "./Nav";
function App() {
  return (
    <div>
      <Nav />
      <Routes>
        <Route path="/" element={<Main />}></Route>
      </Routes>
    </div>
  );
}
export default App;
