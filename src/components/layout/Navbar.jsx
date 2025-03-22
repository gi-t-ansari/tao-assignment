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
    <nav className="w-full h-fit flex justify-between items-center">
      <section>
        <div className="text-[#2F2F2F] flex items-center gap-x-1 ">
          <HiOutlineClipboardList size={28} />
          <h1 className="text-2xl font-semibold">TaskBuddy</h1>
        </div>
        <div className="flex  fit gap-x-6 mt-3">
          {TABS_CONTENT.map((ele, ind) => (
            <div
              onClick={() => handleTabSwitch(ele.name)}
              key={`${ele.name}${ind}`}
              className={`flex items-center gap-x-1 pb-1 mb-[1.5px] cursor-pointer ${
                selectedView === ele.name
                  ? " border-b text-black"
                  : "text-[#231F20D1]"
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
          <div className="h-9 w-9 rounded-full overflow-hidden">
            <img
              className="h-full w-full"
              src={sampleProfilePic}
              alt="Arvind"
            />
          </div>
          <h6 className="text-base text-[#00000099] font-bold">Aravind</h6>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-x-1 pl-2 pr-6 py-2 rounded-xl border border-[#7B198426] mt-2"
        >
          <TbLogout2 />
          <span>Logout</span>
        </button>
      </section>
    </nav>
  );
};

export default Navbar;
