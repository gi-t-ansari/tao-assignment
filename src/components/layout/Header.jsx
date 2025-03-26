import React from "react";
import { CATEGORY_OPTIONS } from "../../config";
import { RiSearchLine } from "react-icons/ri";

const Header = ({
  setCategoryFilterValue,
  setIsAddTaskOpen,
  setSearchedTerm,
}) => {
  return (
    <header className="w-full h-fit flex md:flex-row flex-col-reverse justify-between md:items-center md:px-6 px-4">
      <div className="w-full block md:hidden h-fit relative mt-3">
        <input
          type="search"
          placeholder="Search"
          className="text-xs w-full font-semibold text-[#000000D1] rounded-full placeholder:text-[#000000D1] pl-7 pr-[7px] py-2 border-[0.2px] border-[#0000006B] outline-none"
        />
        <RiSearchLine
          className="absolute left-3 top-1/2 -translate-y-1/2 text-[#231F20] mt-[1px]"
          size={12}
        />
      </div>
      <section className="flex md:flex-row flex-col md:items-center  md:gap-x-2 gap-y-2">
        <p className="text-xs text-[#00000099]">Filter by:</p>
        <div>
          <select
            onChange={(e) => setCategoryFilterValue(e.target.value)}
            className="px-2 py-[5px] border border-[#00000033] rounded-full text-xs text-[#00000099] outline-none"
          >
            <option value="">Category</option>
            {CATEGORY_OPTIONS.map((ele, ind) => (
              <option key={`${ele}${ind}`} value={ele}>
                {ele}
              </option>
            ))}
          </select>
          <select className="px-2 ml-2 py-[5px] border border-[#00000033] rounded-full text-xs text-[#00000099] outline-none">
            <option value="">Due Date</option>
          </select>
        </div>
      </section>

      <section className="flex justify-end items-center gap-x-8 mt-3">
        <div className="w-[204px] h-fit relative md:block hidden ">
          <input
            onChange={(e) => setSearchedTerm(e.target.value)}
            type="search"
            placeholder="Search"
            className="text-sm font-semibold text-[#000000D1] rounded-full placeholder:text-[#000000D1] pl-7 pr-[7px] py-2 border border-[#0000006B] outline-none"
          />
          <RiSearchLine
            className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#231F20] mt-[1px]"
            size={14}
          />
        </div>
        <button
          onClick={() => setIsAddTaskOpen(true)}
          className="md:px-10 md:py-3.5 px-6 py-2.5 bg-[#7B1984] text-white md:text-sm text-[10px] md:font-bold font-semibold uppercase rounded-full cursor-pointer"
        >
          Add Task
        </button>
      </section>
    </header>
  );
};

export default Header;
