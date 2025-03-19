import React, { useState } from "react";
import Login from "./pages/auth/Login";

function App() {
  const [user, setUser] = useState(null);

  return (
    <div className="App">
      {user ? (
        <div className="text-center mt-10">
          <h2 className="text-xl font-bold">Welcome, {user.displayName}</h2>
          <img
            src={user.photoURL}
            alt="Profile"
            className="w-16 h-16 rounded-full mt-2"
          />
        </div>
      ) : (
        <Login setUser={setUser} />
      )}
    </div>
  );
}

export default App;
