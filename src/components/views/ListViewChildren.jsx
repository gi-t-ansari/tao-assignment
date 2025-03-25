import React, { useState } from "react";
import { formatDate } from "../../config";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { RiDeleteBinFill, RiEditFill } from "react-icons/ri";

const ListViewChildren = ({ taskData }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = (e) => {
    e.preventDefault();
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <div className="w-full  flex items-center border-b py-2 border-[#0000001A] last:border-none">
      <p className="flex-1 px-3 text-sm">{taskData?.title}</p>
      <p className="flex-1 px-3 text-sm md:block hidden">
        {formatDate(taskData?.dueDate)}
      </p>
      <div className="flex-1 px-3 md:block hidden">
        <p className=" px-2.5 py-1 rounded-sm bg-[#DDDADD] w-fit text-sm uppercase">
          {taskData?.status}
        </p>
      </div>
      <div className="flex-1 md:flex hidden items-center justify-between px-3 relative">
        <p className="text-sm first-letter:uppercase">{taskData?.category}</p>
        <HiOutlineDotsHorizontal
          className="cursor-pointer"
          onClick={toggleMenu}
        />
        <div
          className={`absolute top-4 right-3 z-10 bg-[#FFF9F9] rounded-xl border border-[#7B198426] transition-all duration-300 ease-in-out transform ${
            isMenuOpen
              ? "opacity-100 scale-100 "
              : "opacity-0 scale-95 pointer-events-none"
          }`}
        >
          <button className="pl-2 pt-2 pb-1 pr-6 flex items-center gap-x-1.5 text-black">
            <RiEditFill size={16} />
            <span className="text-base font-semibold">Edit</span>
          </button>
          <button className="pl-2 pb-2 pt-1 pr-6 flex items-center gap-x-1.5 text-[#DA2F2F]">
            <RiDeleteBinFill size={16} />
            <span className="text-base font-semibold">Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListViewChildren;
