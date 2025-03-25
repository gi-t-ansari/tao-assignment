import React, { useState } from "react";
import { TABLE_HEADERS } from "../../config";
import { AccordionComponent } from "../accordions";
import { FaPlus } from "react-icons/fa6";
import { AddTaskFormTable } from "../forms";

const ListView = () => {
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  return (
    <div className="w-full my-5">
      <div className="w-full  md:flex hidden">
        {TABLE_HEADERS.map((ele, ind) => (
          <div
            key={`${ele}${ind}`}
            className="text-sm font-bold text-[#00000099] p-2 border-t border-[#0000001A] flex-1"
          >
            {ele}
          </div>
        ))}
      </div>
      <div className="w-full">
        <AccordionComponent
          name={"Todo"}
          count={0}
          className={"bg-[#FAC3FF] border border-[#FAC3FF]"}
        >
          <div className="w-full bg-[#F1F1F1] border border-[#FFFAEA] rounded-b-xl">
            <div className="w-full h-fit py-2 px-6 border-b border-[#0000001A]">
              <button
                className="flex items-center gap-x-2 cursor-pointer"
                onClick={() => setIsAddTaskOpen(true)}
              >
                <FaPlus className="text-[#7B1984]" size={16} />
                <span className="uppercase text-sm font-bold">add task</span>
              </button>
            </div>
            {isAddTaskOpen && (
              <AddTaskFormTable setIsAddTaskOpen={setIsAddTaskOpen} />
            )}
            <p className="text-center py-10">No Tasks in To-Do</p>
          </div>
        </AccordionComponent>
        <AccordionComponent
          name={"In-Progress"}
          count={0}
          className={"bg-[#85D9F1] border border-[#EAECF0] mt-5"}
        >
          <div className="w-full bg-[#F1F1F1] border border-[#FFFAEA] rounded-b-xl">
            <p className="text-center py-10">No Tasks In Progress</p>
          </div>
        </AccordionComponent>
        <AccordionComponent
          name={"Completed "}
          count={0}
          className={"bg-[#CEFFCC] border border-[#EAECF0] mt-5"}
        >
          <div className="w-full bg-[#F1F1F1] border border-[#FFFAEA] rounded-b-xl">
            <p className="text-center py-10">No Tasks in Completed</p>
          </div>
        </AccordionComponent>
      </div>
    </div>
  );
};

export default ListView;
