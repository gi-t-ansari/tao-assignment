import React, { useState } from "react";
import { Home, Login } from "./pages";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { APP_URL } from "./config";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={APP_URL.LOGIN}
          element={
            isAuthenticated ? (
              <Navigate to={APP_URL.HOME} replace />
            ) : (
              <Login
                setIsAuthenticated={setIsAuthenticated}
                setUserInfo={setUserInfo}
              />
            )
          }
        />
        <Route
          path={APP_URL.HOME}
          element={
            isAuthenticated ? (
              <Home
                setIsAuthenticated={setIsAuthenticated}
                userInfo={userInfo}
                setUserInfo={setUserInfo}
              />
            ) : (
              <Navigate to={APP_URL.LOGIN} replace />
            )
          }
        />
        <Route
          path="*"
          element={
            <Navigate
              to={isAuthenticated ? APP_URL.HOME : APP_URL.LOGIN}
              replace
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
