import React, { useState } from "react";
import { API_URL, formatDate, TASK_OPTIONS } from "../../config";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { RiDeleteBinFill, RiEditFill } from "react-icons/ri";
import { RxDragHandleDots2 } from "react-icons/rx";
import { FaCheckCircle } from "react-icons/fa";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { UpdateTaskModal } from "../modals";

const ListViewChildren = ({ taskData, selectedTask, setSelectedTask }) => {
  const [isActionMenuOpen, setIsActionMenuOpen] = useState(false);
  const [isStatusMenuOpen, setIsStatusMenuOpen] = useState(false);
  const [isUpdateTaskOpen, setIsUpdateTaskOpen] = useState(false);
  const [statusChangeLoading, setStatusChangeLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const queryClient = useQueryClient();

  const updateTaskMutation = useMutation({
    mutationFn: async ({ taskId, updatedData }) => {
      setStatusChangeLoading(true);
      return axios.put(`${API_URL}/${taskId}`, updatedData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks"]);
      setStatusChangeLoading(false);
    },
    onError: (error) => {
      console.error("Error updating task:", error);
      setStatusChangeLoading(false);
    },
  });

  const handleUpdateStatus = (updatedStatus) => {
    if (taskData?.status === updatedStatus) {
      setIsStatusMenuOpen(false);
      return;
    } else {
      setIsStatusMenuOpen(false);
      updateTaskMutation.mutate({
        taskId: taskData?.id,
        updatedData: {
          status: updatedStatus,
          activity: [
            ...taskData?.activity,
            {
              message: `You changed status from ${taskData?.status} to ${updatedStatus}`,
              timeStamp: new Date().toISOString(),
            },
          ],
        },
      });
    }
  };

  const deleteTaskMutation = useMutation({
    mutationFn: async (taskId) => {
      setIsLoading(true);
      return axios.delete(`${API_URL}/${taskId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      setIsLoading(false);
    },
    onError: (error) => {
      console.error("Error deleting task:", error);
      setIsLoading(false);
    },
  });

  const handleDelete = (e) => {
    e.preventDefault();
    deleteTaskMutation.mutate(taskData?.id);
  };

  const toggleActionMenu = (e) => {
    e.preventDefault();
    setIsActionMenuOpen(!isActionMenuOpen);
  };

  const toggleStatusMenu = (e) => {
    e.preventDefault();
    setIsStatusMenuOpen(!isStatusMenuOpen);
  };

  const openUpdateTaskModal = (e) => {
    e.preventDefault();
    setIsUpdateTaskOpen(true);
    setIsActionMenuOpen(!isActionMenuOpen);
  };

  const toggleSelection = () => {
    if (selectedTask.includes(taskData.id)) {
      setSelectedTask(selectedTask.filter((id) => id !== taskData.id));
    } else {
      setSelectedTask([...selectedTask, taskData.id]);
    }
  };

  return (
    <div className="w-full  flex items-center border-b py-2 border-[#0000001A] last:border-none font-medium ">
      <div className="flex-1 px-2.5 flex items-center gap-x-1.5">
        <input
          type="checkbox"
          className="w-3.5 h-3.5 cursor-pointer appearance-none  border-2 border-gray-400 rounded-sm checked:bg-[#7B1984] checked:border-[#7B1984]"
          checked={selectedTask?.includes(taskData?.id)}
          onChange={toggleSelection}
        />
        <RxDragHandleDots2 className="text-[#9A9A9A] md:block hidden" />
        <FaCheckCircle
          className={`${
            taskData?.status === TASK_OPTIONS[2]
              ? "text-[#1B8D17]"
              : "text-[#9A9A9A]"
          }`}
          size={13}
        />
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
      <div className="flex-1 px-2.5 md:block hidden relative">
        <p
          onClick={toggleStatusMenu}
          className=" px-2.5 py-1 rounded-sm bg-[#DDDADD] w-fit text-sm uppercase cursor-pointer"
        >
          {statusChangeLoading ? "Updating..." : taskData?.status}
        </p>
        <div
          className={`absolute z-10 top-8 left-2 bg-[#FFF9F9] rounded-xl border border-[#7B198426] transition-all duration-300 ease-in-out transform ${
            isStatusMenuOpen
              ? "opacity-100 scale-100"
              : "opacity-0 scale-95 pointer-events-none"
          }`}
        >
          {TASK_OPTIONS.map((ele, ind) => (
            <label
              key={`${ele}${ind + 4}`}
              className={`px-2 py-1.5 block uppercase cursor-pointer text-xs ${
                taskData?.status === ele && "font-semibold"
              }`}
              onClick={() => handleUpdateStatus(ele)}
            >
              <input name="status" type="radio" hidden value={ele} />
              {ele}
            </label>
          ))}
        </div>
      </div>
      <div className="flex-1 md:flex hidden items-center justify-between px-2.5 relative">
        <p className="text-sm first-letter:uppercase">{taskData?.category}</p>
        <HiOutlineDotsHorizontal
          className="cursor-pointer mr-2"
          onClick={toggleActionMenu}
        />
        <div
          className={`absolute top-4 right-4.5 z-10 bg-[#FFF9F9] rounded-xl border border-[#7B198426] transition-all duration-300 ease-in-out transform ${
            isActionMenuOpen
              ? "opacity-100 scale-100 "
              : "opacity-0 scale-95 pointer-events-none"
          }`}
        >
          <button
            disabled={isLoading}
            className={`pl-2 pt-2 pb-1 pr-6 flex items-center gap-x-1.5 ${
              isLoading
                ? "cursor-not-allowed text-slate-500"
                : "text-black cursor-pointer"
            } `}
            onClick={openUpdateTaskModal}
          >
            <RiEditFill size={16} />
            <span className="text-base ">Edit</span>
          </button>
          <button
            onClick={handleDelete}
            disabled={isLoading}
            className={`pl-2 pb-2 pt-1 pr-6 flex items-center gap-x-1.5 ${
              isLoading
                ? "cursor-not-allowed text-red-300"
                : "text-[#DA2F2F] cursor-pointer"
            }`}
          >
            <RiDeleteBinFill size={16} />
            <span className="text-base ">
              {isLoading ? "Deleting..." : "Delete"}
            </span>
          </button>
        </div>
      </div>
      <UpdateTaskModal
        taskData={taskData}
        open={isUpdateTaskOpen}
        onClose={() => setIsUpdateTaskOpen(false)}
      />
    </div>
  );
};

export default ListViewChildren;
