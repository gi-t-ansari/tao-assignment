import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebaseConfig";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { APP_URL } from "../../config";
import { HiOutlineClipboardList } from "react-icons/hi";
import { FcGoogle } from "react-icons/fc";

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
    <div className="flex items-center  min-h-screen relative overflow-clip bg-[#FFF9F9]">
      <section className="md:pl-20 mx-auto flex flex-col items-center w-full">
        <header className="text-[#7B1984] flex items-center gap-x-1 ">
          <HiOutlineClipboardList size={30} />
          <h1 className="text-[26px] font-bold">TaskBuddy</h1>
        </header>
        <p className="text-xs font-medium mt-2 mb-8 text-center md:text-left">
          Streamline your workflow and track progress effortlessly <br /> with
          our all-in-one task management app.
        </p>
        <button
          onClick={handleLogin}
          className="bg-[#292929] rounded-[18.9px] flex gap-x-3 items-center justify-center px-14 py-3 cursor-pointer shadow"
        >
          <FcGoogle className="md:text-2xl text-xl" />
          <span className="md:text-xl text-base text-white font-bold">
            Sign in with Google
          </span>
        </button>
      </section>
      <section className="absolute md:-right-4 md:top-12 -top-14 -right-14">
        <div className="lg:h-[834px] lg:w-[834px] md:h-[300px] md:w-[300px] h-[177px] w-[177px] rounded-full border-[0.73px] border-[#7B1984] flex justify-center items-center">
          <div className="lg:h-[705px] lg:w-[705px] md:h-[200px] md:w-[200px] h-[150px] w-[150px] rounded-full border-[0.73px] border-[#7B1984] flex justify-center items-center">
            <div className="lg:h-[560px] lg:w-[560px] md:h-[120px] md:w-[120px] h-[120px] w-[120px] rounded-full border-[0.73px] border-[#7B1984]"></div>
          </div>
        </div>
      </section>
      <section className="absolute -left-24 top-16 md:hidden">
        <div className=" h-[177px] w-[177px] rounded-full border-[0.73px] border-[#7B1984] flex justify-center items-center">
          <div className=" h-[150px] w-[150px] rounded-full border-[0.73px] border-[#7B1984] flex justify-center items-center">
            <div className="h-[120px] w-[120px] rounded-full border-[0.73px] border-[#7B1984]"></div>
          </div>
        </div>
      </section>
      <section className="absolute left-1/2 -translate-x-1/2 bottom-4 md:hidden">
        <div className=" h-[177px] w-[177px] rounded-full border-[0.73px] border-[#7B1984] flex justify-center items-center">
          <div className=" h-[150px] w-[150px] rounded-full border-[0.73px] border-[#7B1984] flex justify-center items-center">
            <div className="h-[120px] w-[120px] rounded-full border-[0.73px] border-[#7B1984]"></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
