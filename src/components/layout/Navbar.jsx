import React from "react";
import { HiOutlineClipboardList } from "react-icons/hi";
import { TbLogout2 } from "react-icons/tb";
import { APP_URL, TABS_CONTENT } from "../../config";
import sampleProfilePic from "../../assets/sampleProfile.svg";
import { useNavigate } from "react-router-dom";

const Navbar = ({ selectedView, setSelectedView }) => {
  const navigate = useNavigate();

  const handleTabSwitch = (selectedTab) => {
    setSelectedView(selectedTab);
  };

  const handleLogout = (e) => {
    navigate(APP_URL.LOGIN);
  };

  return (
    <nav className="w-full h-fit flex justify-between items-center md:px-6 md:py-0 px-4 py-3 sticky top-0 md:mt-8 md:bg-white bg-[#FAEEFC] z-10">
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
      <section>
        <div className="flex items-center gap-x-2">
          <div className="md:h-9 md:w-9 h-[25px] w-[25px] rounded-full overflow-hidden">
            <img
              className="h-full w-full"
              src={sampleProfilePic}
              alt="Arvind"
            />
          </div>
          <h6 className="text-base md:block hidden text-[#00000099] font-bold">
            Aravind
          </h6>
        </div>
        <button
          onClick={handleLogout}
          className=" md:flex hidden items-center gap-x-1 pl-2 pr-6 py-2 rounded-xl border border-[#7B198426] mt-2"
        >
          <TbLogout2 />
          <span className="mb-0.5">Logout</span>
        </button>
      </section>
    </nav>
  );
};

export default Navbar;
