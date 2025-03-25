import React, { useState } from "react";
import { formatDate, TABLE_HEADERS, TASK_OPTIONS } from "../../config";
import { AccordionComponent } from "../accordions";
import { FaPlus } from "react-icons/fa6";
import { AddTaskFormTable } from "../forms";
import ListViewChildren from "./ListViewChildren";

const ListView = ({ taskData }) => {
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [toDoTasks, setToDoTasks] = useState(
    taskData?.filter((ele) => ele?.status === TASK_OPTIONS[0])
  );
  const [inProgressTasks, setInProgressTasks] = useState(
    taskData?.filter((ele) => ele?.status === TASK_OPTIONS[1])
  );
  const [completedTasks, setCompletedTasks] = useState(
    taskData?.filter((ele) => ele?.status === TASK_OPTIONS[2])
  );

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
          count={toDoTasks?.length > 0 ? toDoTasks?.length : 0}
          className={"bg-[#FAC3FF] border border-[#FAC3FF]"}
        >
          <div className="w-full bg-[#F1F1F1] border border-[#FFFAEA] rounded-b-xl ">
            <div className="w-full h-fit py-2 px-6 border-b border-[#0000001A] md:block hidden">
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
            {toDoTasks?.length > 0 ? (
              toDoTasks?.map((ele) => <ListViewChildren taskData={ele} />)
            ) : (
              <p className="text-center py-10">No Tasks in To-Do</p>
            )}
          </div>
        </AccordionComponent>
        <AccordionComponent
          name={"In-Progress"}
          count={inProgressTasks?.length > 0 ? inProgressTasks?.length : 0}
          className={"bg-[#85D9F1] border border-[#EAECF0] mt-5"}
        >
          <div className="w-full bg-[#F1F1F1] border border-[#FFFAEA] rounded-b-xl">
            {inProgressTasks?.length > 0 ? (
              inProgressTasks?.map((ele) => <ListViewChildren taskData={ele} />)
            ) : (
              <p className="text-center py-10">No Tasks In Progress</p>
            )}
          </div>
        </AccordionComponent>
        <AccordionComponent
          name={"Completed "}
          count={completedTasks?.length > 0 ? completedTasks?.length : 0}
          className={"bg-[#CEFFCC] border border-[#EAECF0] mt-5"}
        >
          <div className="w-full bg-[#F1F1F1] border border-[#FFFAEA] rounded-b-xl">
            {completedTasks?.length > 0 ? (
              completedTasks?.map((ele) => <ListViewChildren taskData={ele} />)
            ) : (
              <p className="text-center py-10">No Completed Tasks</p>
            )}
          </div>
        </AccordionComponent>
      </div>
    </div>
  );
};

export default ListView;
