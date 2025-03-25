import React, { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { PiArrowBendDownLeft } from "react-icons/pi";
import { API_URL, CATEGORY_OPTIONS, TASK_OPTIONS } from "../../config";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const AddTaskFormTable = ({ setIsAddTaskOpen }) => {
  const [isStatusMenuOpen, setIsStatusMenuOpen] = useState(false);
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  const schema = yup.object().shape({
    title: yup.string().required("Title is required."),
    category: yup.string().required("Category is required."),
    status: yup.string().required("Status is required."),
    dueDate: yup.string().required("Due date is required."),
  });

  const {
    handleSubmit,
    reset,
    watch,
    register,
    formState: { errors },
    setValue,
  } = useForm({ resolver: yupResolver(schema), mode: "onChange" });

  const toggleStatusMenu = (e) => {
    e.preventDefault();
    setIsStatusMenuOpen(!isStatusMenuOpen);
  };

  const handleStatusChange = (status) => {
    setValue("status", status);
    setIsStatusMenuOpen(false);
  };

  const toggleCategoryMenu = (e) => {
    e.preventDefault();
    setIsCategoryMenuOpen(!isCategoryMenuOpen);
  };

  const handleCategoryChange = (category) => {
    setValue("category", category);
    setIsCategoryMenuOpen(false);
  };

  const addTaskMutation = useMutation({
    mutationFn: async (taskData) => {
      setLoading(true);
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(taskData),
      });
      if (!response.ok) throw new Error("Failed to add task");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      setIsAddTaskOpen(false);
      setLoading(false);
      reset();
    },
    onError: (error) => {
      console.error("Error adding task:", error);
      setLoading(false);
    },
  });

  const handleAddTask = (data) => {
    addTaskMutation.mutate(data);
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setIsAddTaskOpen(false);
    reset();
  };

  return (
    <form
      className="w-full py-3 px-9 border-b border-[#0000001A] md:block hidden"
      onSubmit={handleSubmit(handleAddTask)}
    >
      <div className="w-full flex ">
        <div className="flex-1">
          <input
            {...register("title")}
            type="text"
            placeholder="Task Title"
            className="outline-none text-sm placeholder:text-[#00000080] w-1/2"
          />
          {errors?.title && (
            <p className="text-[10px] text-red-500">{errors?.title?.message}</p>
          )}
        </div>

        <div className="flex-1">
          <input {...register("dueDate")} type="date" />
          {errors?.dueDate && (
            <p className="text-[10px] text-red-500">
              {errors?.dueDate?.message}
            </p>
          )}
        </div>

        <div className="relative flex-1">
          <div className="flex items-center">
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
            {watch("status") && (
              <span className="uppercase ml-2 text-sm">{watch("status")}</span>
            )}
          </div>

          <div
            className={`absolute top-2 left-9 bg-[#FFF9F9] rounded-xl border border-[#7B198426] transition-all duration-300 ease-in-out transform ${
              isStatusMenuOpen
                ? "opacity-100 scale-100"
                : "opacity-0 scale-95 pointer-events-none"
            }`}
          >
            {TASK_OPTIONS.map((ele, ind) => (
              <label
                key={`${ele}${ind + 4}`}
                className={`px-2 py-1.5 block uppercase text-xs ${
                  watch("status") === ele && "font-semibold"
                }`}
                onClick={() => handleStatusChange(ele)}
              >
                <input
                  {...register("status")}
                  name="status"
                  type="radio"
                  hidden
                  value={ele}
                />
                {ele}
              </label>
            ))}
          </div>
        </div>

        <div className=" relative flex-1 ">
          <div className="flex items-center">
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
            {watch("category") && (
              <span className="uppercase ml-2 text-sm">
                {watch("category")}
              </span>
            )}
          </div>

          <div
            className={`absolute  top-2 left-9 bg-[#FFF9F9] rounded-xl border border-[#7B198426] transition-all duration-300 ease-in-out transform ${
              isCategoryMenuOpen
                ? "opacity-100 scale-100"
                : "opacity-0 scale-95 pointer-events-none"
            }`}
          >
            {CATEGORY_OPTIONS.map((ele, ind) => (
              <label
                key={`${ele}${ind + 4}`}
                className={`px-2  py-1.5 block uppercase text-xs ${
                  watch("category") === ele && "font-semibold"
                }`}
                onClick={() => handleCategoryChange(ele)}
              >
                <input
                  {...register("category")}
                  name="category"
                  type="radio"
                  hidden
                  value={ele}
                />
                {ele}
              </label>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-2 flex items-center gap-x-3">
        <button
          disabled={
            loading ||
            !watch("title") ||
            !watch("dueDate") ||
            !watch("status") ||
            !watch("category")
          }
          type="submit"
          className={`${
            loading ||
            !watch("title") ||
            !watch("dueDate") ||
            !watch("status") ||
            !watch("category")
              ? "bg-[#B685BA] cursor-not-allowed"
              : "bg-[#7B1984] cursor-pointer"
          } text-white flex items-center gap-x-2 px-3 py-1 rounded-full `}
        >
          <span className="text-sm uppercase font-bold">
            {loading ? "Adding..." : "Add"}
          </span>
          <PiArrowBendDownLeft />
        </button>
        <button
          disabled={loading}
          className="uppercase text-sm font-bold cursor-pointer px-3 py-1 rounded-full"
          onClick={handleCancel}
        >
          cancel
        </button>
      </div>
    </form>
  );
};

export default AddTaskFormTable;
