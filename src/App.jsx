import React, { useState } from "react";
import { Home, Login } from "./pages";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { APP_URL } from "./config";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={APP_URL.LOGIN} element={<Login />} />
        <Route path={APP_URL.HOME} element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
