import React, { useEffect, useState } from "react";
import { API_URL, formatDate, TABLE_HEADERS, TASK_OPTIONS } from "../../config";
import { AccordionComponent } from "../accordions";
import { FaPlus } from "react-icons/fa6";
import { AddTaskFormTable } from "../forms";
import ListViewChildren from "./ListViewChildren";
import { IoClose } from "react-icons/io5";
import { TbCopyCheckFilled } from "react-icons/tb";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const ListView = ({ taskData, selectedTask, setSelectedTask }) => {
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [isStatusMenuOpen, setIsStatusMenuOpen] = useState(false);
  const [toDoTasks, setToDoTasks] = useState(
    taskData?.filter((ele) => ele?.status === TASK_OPTIONS[0])
  );
  const [inProgressTasks, setInProgressTasks] = useState(
    taskData?.filter((ele) => ele?.status === TASK_OPTIONS[1])
  );
  const [completedTasks, setCompletedTasks] = useState(
    taskData?.filter((ele) => ele?.status === TASK_OPTIONS[2])
  );
  const [isStatusChanging, setIsStatusChanging] = useState(false);
  const [isTaskDeleting, setIsTaskDeleting] = useState(false);

  const queryClient = useQueryClient();

  useEffect(() => {
    setToDoTasks(taskData?.filter((ele) => ele?.status === TASK_OPTIONS[0]));
    setInProgressTasks(
      taskData?.filter((ele) => ele?.status === TASK_OPTIONS[1])
    );
    setCompletedTasks(
      taskData?.filter((ele) => ele?.status === TASK_OPTIONS[2])
    );
  }, [taskData]);

  const batchDelete = useMutation({
    mutationFn: async () => {
      setIsTaskDeleting(true);
      await Promise.all(
        selectedTask.map((taskId) => axios.delete(`${API_URL}/${taskId}`))
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks"]);
      setSelectedTask([]);
      setIsTaskDeleting(false);
    },
  });

  const batchUpdateStatus = useMutation({
    mutationFn: async (newStatus) => {
      await Promise.all(
        selectedTask.map((taskId) =>
          axios.put(`${API_URL}/${taskId}`, {
            status: newStatus,
          })
        )
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks"]);
      setSelectedTask([]);
      setIsStatusChanging(false);
    },
    onError: (error) => {
      console.error("Error Updating Status", error);
      setIsStatusChanging(false);
    },
  });

  const handleBatchStatusUpdate = (newStatus) => {
    setIsStatusMenuOpen(false);
    setIsStatusChanging(true);
    batchUpdateStatus.mutate(newStatus);
  };

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
              toDoTasks?.map((ele) => (
                <ListViewChildren
                  selectedTask={selectedTask}
                  setSelectedTask={setSelectedTask}
                  taskData={ele}
                />
              ))
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
              inProgressTasks?.map((ele) => (
                <ListViewChildren
                  selectedTask={selectedTask}
                  setSelectedTask={setSelectedTask}
                  taskData={ele}
                />
              ))
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
              completedTasks?.map((ele) => (
                <ListViewChildren
                  selectedTask={selectedTask}
                  setSelectedTask={setSelectedTask}
                  taskData={ele}
                />
              ))
            ) : (
              <p className="text-center py-10">No Completed Tasks</p>
            )}
          </div>
        </AccordionComponent>
      </div>
      {/**----------------- BATCH ACTION UI ------------------ */}
      <div
        className={`fixed z-10 bottom-4 left-1/2 -translate-x-1/2 bg-[#1A1C20] md:w-[365px] w-[95%]  rounded-xl border border-[#7B198426] transition-all duration-300 ease-in-out transform ${
          selectedTask?.length > 0
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        <div className="p-2 flex items-center justify-between">
          <div className=" flex items-center gap-x-1">
            <div className="border-[0.2px] text-white py-[5px] px-[13px] border-white rounded-full flex items-center gap-x-3">
              <p className=" text-xs">{`${selectedTask?.length} ${
                selectedTask?.length > 1 ? "Tasks" : "Task"
              } Selected`}</p>
              <button
                disabled={isStatusChanging || isTaskDeleting}
                className={`${
                  isStatusChanging || isTaskDeleting
                    ? "cursor-not-allowed"
                    : "cursor-pointer"
                }`}
                onClick={() => setSelectedTask([])}
              >
                <IoClose size={13} />
              </button>
            </div>

            <TbCopyCheckFilled className="text-[#FFFFFFCC]" size={16} />
          </div>
          <div className=" flex items-center gap-x-2 relative">
            <button
              disabled={isStatusChanging || isTaskDeleting}
              onClick={() => setIsStatusMenuOpen(!isStatusMenuOpen)}
              className={`px-[13px] ${
                isStatusChanging || isTaskDeleting
                  ? "cursor-not-allowed"
                  : "cursor-pointer"
              } py-[5px] text-xs font-semibold rounded-full border-[0.2px] border-white bg-[#8D8A8A24] text-white`}
            >
              {isStatusChanging ? (
                <div className=" h-3 w-3 rounded-full animate-spin border-white border-t-2"></div>
              ) : (
                "Status"
              )}
            </button>
            <button
              disabled={isStatusChanging || isTaskDeleting}
              className={`px-[13px] py-[5px] ${
                isStatusChanging || isTaskDeleting
                  ? "cursor-not-allowed"
                  : "cursor-pointer"
              } text-xs font-semibold rounded-full border-[0.2px] border-[#E13838] bg-[#FF353524] text-[#E13838]`}
              onClick={() => batchDelete.mutate()}
            >
              {isTaskDeleting ? (
                <div className=" h-3 w-3 rounded-full animate-spin border-[#E13838] border-t-2"></div>
              ) : (
                "Delete"
              )}
            </button>
            <div
              className={`absolute z-10 bottom-10 -left-8 text-white bg-[#1A1C20] rounded-xl border border-[#7B198426] transition-all duration-300 ease-in-out transform ${
                isStatusMenuOpen
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-95 pointer-events-none"
              }`}
            >
              {TASK_OPTIONS.map((ele, ind) => (
                <label
                  key={`${ele}${ind + 4}`}
                  className={`px-2 py-1.5 block uppercase cursor-pointer text-xs`}
                  onClick={() => handleBatchStatusUpdate(ele)}
                >
                  <input name="status" type="radio" hidden value={ele} />
                  {ele}
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListView;
