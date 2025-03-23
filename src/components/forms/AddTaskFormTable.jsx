import React, { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { PiArrowBendDownLeft } from "react-icons/pi";
import { CATEGORY_OPTIONS, TASK_OPTIONS } from "../../config";

const AddTaskFormTable = ({ setIsAddTaskOpen }) => {
  const [isStatusMenuOpen, setIsStatusMenuOpen] = useState(false);
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);

  const toggleStatusMenu = (e) => {
    e.preventDefault();
    setIsStatusMenuOpen(!isStatusMenuOpen);
  };

  const toggleCategoryMenu = (e) => {
    e.preventDefault();
    setIsCategoryMenuOpen(!isCategoryMenuOpen);
  };

  return (
    <form className="w-full py-3 px-9 border-b border-[#0000001A]">
      <div className="w-full flex ">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Task Title"
            className="outline-none text-sm placeholder:text-[#00000080] w-1/2"
          />
        </div>

        <div className="flex-1">
          <input type="date" />
        </div>

        <div className="relative flex-1">
          <button
            onClick={toggleStatusMenu}
            className="h-[30px] w-[30px] cursor-pointer flex justify-center items-center rounded-full border border-[#00000033]"
          >
            <FaPlus
              size={12}
              className={`transition-transform duration-300 ease-in-out ${
                isStatusMenuOpen ? "rotate-45" : "rotate-0"
              }`}
            />
          </button>

          <div
            className={`absolute top-2 left-9 bg-[#FFF9F9] rounded-xl border border-[#7B198426] transition-all duration-300 ease-in-out transform ${
              isStatusMenuOpen
                ? "opacity-100 scale-100"
                : "opacity-0 scale-95 pointer-events-none"
            }`}
          >
            {TASK_OPTIONS.map((ele, ind) => (
              <p
                key={`${ele}${ind + 4}`}
                className="px-2 py-1.5 uppercase text-sm"
              >
                {ele}
              </p>
            ))}
          </div>
        </div>

        <div className=" relative flex-1 ">
          <button
            onClick={toggleCategoryMenu}
            className="h-[30px]  w-[30px] cursor-pointer flex justify-center items-center rounded-full border border-[#00000033]"
          >
            <FaPlus
              size={12}
              className={`${
                isCategoryMenuOpen && "rotate-45"
              } transition-all duration-300 ease-linear`}
            />
          </button>

          <div
            className={`absolute top-2 left-9 bg-[#FFF9F9] rounded-xl border border-[#7B198426] transition-all duration-300 ease-in-out transform ${
              isCategoryMenuOpen
                ? "opacity-100 scale-100"
                : "opacity-0 scale-95 pointer-events-none"
            }`}
          >
            {CATEGORY_OPTIONS.map((ele, ind) => (
              <p
                key={`${ele}${ind + 4}`}
                className="px-2 py-1.5 uppercase text-sm"
              >
                {ele}
              </p>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-2 flex items-center gap-x-3">
        <button className="bg-[#7B1984] text-white flex items-center gap-x-2 px-3 py-1 rounded-full cursor-pointer">
          <span className="text-sm uppercase font-bold">Add</span>
          <PiArrowBendDownLeft />
        </button>
        <button
          className="uppercase text-sm font-bold cursor-pointer px-3 py-1 rounded-full"
          onClick={() => setIsAddTaskOpen(false)}
        >
          cancel
        </button>
      </div>
    </form>
  );
};

export default AddTaskFormTable;
