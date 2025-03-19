// src/components/Login.jsx
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebaseConfig";

const Login = ({ setUser }) => {
  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
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
