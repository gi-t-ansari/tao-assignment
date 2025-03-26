import React, { useState } from "react";
import { HiOutlineClipboardList } from "react-icons/hi";
import { TbLogout2 } from "react-icons/tb";
import { APP_URL, TABS_CONTENT } from "../../config";
import sampleProfilePic from "../../assets/sampleProfile.svg";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

const Navbar = ({
  selectedView,
  setSelectedView,
  setUserInfo,
  setIsAuthenticated,
  userInfo,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleTabSwitch = (selectedTab) => {
    setSelectedView(selectedTab);
  };

  const handleLogout = async (e) => {
    e.preventDefault();

    const auth = getAuth();

    try {
      await signOut(auth);
      setUserInfo(null);
      setIsAuthenticated(false);
      navigate(APP_URL.LOGIN);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const toggleMenu = (e) => {
    e.preventDefault();
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="w-full h-fit flex justify-between items-center md:px-6 md:py-2 px-4 py-3 sticky top-0 md:mt-6  md:bg-white bg-[#FAEEFC] z-10">
      <section>
        <div className="text-[#2F2F2F] flex items-center gap-x-1 ">
          <HiOutlineClipboardList className="md:block hidden" size={28} />
          <h1 className="md:text-2xl text-base font-semibold">TaskBuddy</h1>
        </div>
        <div className=" fit gap-x-6 mt-3 md:flex hidden">
          {TABS_CONTENT.map((ele, ind) => (
            <div
              onClick={() => handleTabSwitch(ele.name)}
              key={`${ele.name}${ind}`}
              className={`flex items-center gap-x-1 pb-1 mb-[1.5px] cursor-pointer ${
                selectedView === ele.name
                  ? " border-b text-black"
                  : "text-[#231F20D1] border-b border-transparent"
              } `}
            >
              <ele.icon size={ind === 0 ? 12 : 16} />
              <p className="text-base font-semibold">{ele.name}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="flex flex-col items-end">
        <div className="flex items-center gap-x-2 relative">
          <div
            className="md:h-9 md:w-9 h-[25px] w-[25px] rounded-full overflow-hidden"
            onClick={toggleMenu}
          >
            <img
              className="h-full w-full"
              src={userInfo?.photoURL || sampleProfilePic}
              alt={userInfo?.displayName}
            />
          </div>
          <h6 className="text-base md:block hidden text-[#00000099] font-bold">
            {userInfo?.displayName}
          </h6>
          <div
            className={`absolute md:hidden block z-10 top-6.5 w-fit right-0 bg-[#FFF9F9] rounded-xl border border-[#7B198426] transition-all duration-300 ease-in-out transform ${
              isMenuOpen
                ? "opacity-100 scale-100"
                : "opacity-0 scale-95 pointer-events-none"
            }`}
          >
            <p className="px-2 py-1 text-xs text-nowrap">
              {userInfo?.displayName}
            </p>
            <p
              onClick={handleLogout}
              className="px-2 py-1 text-xs text-red-500 cursor-pointer flex items-center gap-x-1"
            >
              <TbLogout2 />
              <span className="mb-0.5">Logout</span>
            </p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className=" md:flex hidden cursor-pointer items-center gap-x-1 pl-2 pr-6 py-2 rounded-xl border border-[#7B198426] mt-2"
        >
          <TbLogout2 />
          <span className="mb-0.5">Logout</span>
        </button>
      </section>
    </nav>
  );
};

export default Navbar;
