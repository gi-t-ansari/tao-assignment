import React, { useState } from "react";
import { formatDate, TASK_OPTIONS } from "../../config";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { RiDeleteBinFill, RiEditFill } from "react-icons/ri";
import { RxDragHandleDots2 } from "react-icons/rx";
import { TiTick } from "react-icons/ti";

const ListViewChildren = ({ taskData }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = (e) => {
    e.preventDefault();
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <div className="w-full  flex items-center border-b py-2 border-[#0000001A] last:border-none font-medium ">
      <div className="flex-1 px-2.5 flex items-center gap-x-1.5">
        <input type="checkbox" className="w-3.5 h-3.5" />
        <RxDragHandleDots2 className="text-[#9A9A9A] md:block hidden" />
        <div
          className={`h-[16.67px] w-[16.67px] rounded-full ${
            taskData?.status === TASK_OPTIONS[2]
              ? "bg-[#1B8D17]"
              : "bg-[#9A9A9A]"
          } flex items-center justify-center`}
        >
          <TiTick className="text-white ml-[0.3px]" size={13} />
        </div>
        <p
          className={` text-sm ${
            taskData?.status === TASK_OPTIONS[2] && "line-through"
          }`}
        >
          {taskData?.title}
        </p>
      </div>

      <p className="flex-1 px-2.5 text-sm md:block hidden">
        {formatDate(taskData?.dueDate)}
      </p>
      <div className="flex-1 px-2.5 md:block hidden">
        <p className=" px-2.5 py-1 rounded-sm bg-[#DDDADD] w-fit text-sm uppercase">
          {taskData?.status}
        </p>
      </div>
      <div className="flex-1 md:flex hidden items-center justify-between px-2.5 relative">
        <p className="text-sm first-letter:uppercase">{taskData?.category}</p>
        <HiOutlineDotsHorizontal
          className="cursor-pointer mr-2"
          onClick={toggleMenu}
        />
        <div
          className={`absolute top-4 right-4.5 z-10 bg-[#FFF9F9] rounded-xl border border-[#7B198426] transition-all duration-300 ease-in-out transform ${
            isMenuOpen
              ? "opacity-100 scale-100 "
              : "opacity-0 scale-95 pointer-events-none"
          }`}
        >
          <button className="pl-2 pt-2 pb-1 pr-6 flex items-center gap-x-1.5 text-black">
            <RiEditFill size={16} />
            <span className="text-base ">Edit</span>
          </button>
          <button className="pl-2 pb-2 pt-1 pr-6 flex items-center gap-x-1.5 text-[#DA2F2F]">
            <RiDeleteBinFill size={16} />
            <span className="text-base ">Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListViewChildren;
