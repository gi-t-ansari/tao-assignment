import React, { useEffect, useState } from "react";
import { Home, Login } from "./pages";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { APP_URL } from "./config";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseConfig";

function App() {
  const [userInfo, setUserInfo] = useState(null);

  const authToken = localStorage.getItem("authToken");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUserInfo(currentUser);
      } else {
        setUserInfo(null);
      }
    });

    return () => unsubscribe(); // Cleanup the listener on unmount
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={APP_URL.LOGIN}
          element={
            !!authToken ? (
              <Navigate to={APP_URL.HOME} replace />
            ) : (
              <Login setUserInfo={setUserInfo} />
            )
          }
        />
        <Route
          path={APP_URL.HOME}
          element={
            !!authToken ? (
              <Home userInfo={userInfo} setUserInfo={setUserInfo} />
            ) : (
              <Navigate to={APP_URL.LOGIN} replace />
            )
          }
        />
        <Route
          path="*"
          element={
            <Navigate to={!!authToken ? APP_URL.HOME : APP_URL.LOGIN} replace />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
