import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebaseConfig";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { APP_URL } from "../../config";

const Login = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      console.log("User Detail =>", result.user);
      navigate(APP_URL.HOME);
    } catch (error) {
      console.error("Error signing in:", error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <button
        onClick={handleLogin}
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Sign in with Google
      </button>
    </div>
  );
};

export default Login;
