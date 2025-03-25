import moment from "moment/moment";
import React, { useState } from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { formatDate } from "../../config";
import { RiDeleteBinFill, RiEditFill } from "react-icons/ri";

const TaskCard = ({ cardData }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = (e) => {
    e.preventDefault();
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="w-full h-[110px] bg-white border-[0.5px] rounded-xl p-2 border-[#58575147] flex flex-col justify-between">
      <header className="w-full flex justify-between gap-x-3">
        <h6 className="flex-1 text-wrap text-base font-bold">
          {cardData?.title}
        </h6>
        <div className="relative w-fit">
          <HiOutlineDotsHorizontal
            className="cursor-pointer"
            onClick={toggleMenu}
          />
          <div
            className={`absolute top-4 right-0 bg-[#FFF9F9] rounded-xl border border-[#7B198426] transition-all duration-300 ease-in-out transform ${
              isMenuOpen
                ? "opacity-100 scale-100"
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
      </header>
      <footer className="flex justify-between items-center">
        <p className="text-[10px] text-[#00000085] font-semibold">
          {cardData?.category}
        </p>
        <p className="text-[10px] text-[#00000085] font-semibold">
          {formatDate(cardData?.dueDate)}
        </p>
      </footer>
    </div>
  );
};

export default TaskCard;
