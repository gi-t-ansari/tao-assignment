import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { API_URL, CATEGORY_OPTIONS, TASK_OPTIONS } from "../../config";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import moment from "moment";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const UpdateTaskModal = ({ open, onClose, taskData }) => {
  const [loading, setLoading] = useState(false);
  const [isActivityOpen, setIsActivityOpen] = useState(false);
  const queryClient = useQueryClient();

  const schema = yup.object().shape({
    title: yup.string().required("Title is required."),
    description: yup
      .string()
      .max(300, "Description should not be more than 300 characters."),
    category: yup.string().required("Category is required."),
    status: yup.string().required("Status is required."),
    dueDate: yup.string().required("Due date is required."),
    attachments: yup
      .array()
      .of(
        yup
          .mixed()
          .test(
            "fileType",
            "Only files are allowed",
            (value) => value instanceof File
          )
      )
      .notRequired(),
  });

  const {
    handleSubmit,
    reset,
    watch,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      title: taskData?.title || "",
      description: taskData?.description || "",
      category: taskData?.category || "",
      dueDate: moment(taskData?.dueDate).format("YYYY-MM-DD") || "",
      status: taskData?.status || "",
      attachments: taskData?.attachments || [],
    },
  });

  const updateTaskMutation = useMutation({
    mutationFn: async ({ taskId, updatedData }) => {
      setLoading(true);
      return axios.put(`${API_URL}/${taskId}`, updatedData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks"]);
      onClose();
      setLoading(false);
      reset();
    },
    onError: (error) => {
      console.error("Error updating task:", error);
      setLoading(false);
    },
  });

  const toggleTask = (e) => {
    e.preventDefault();
    setIsActivityOpen(!isActivityOpen);
  };

  const handleCancel = (e) => {
    e.preventDefault();
    onClose();
    reset();
  };

  const handleUpdateTask = (data) => {
    updateTaskMutation.mutate({
      taskId: taskData?.id,
      updatedData: data,
    });
  };

  return (
    open && (
      <div className="h-screen w-screen top-0 left-0 right-0 bottom-0 fixed z-20">
        <div
          className="h-screen w-screen top-0 left-0 right-0 bottom-0 fixed bg-[rgba(49,49,49,0.8)]"
          onClick={onClose}
        ></div>
        <div className="absolute lg:top-[50%] bottom-0 lg:left-[50%] lg:-translate-x-1/2 lg:-translate-y-1/2 overflow-y-auto overflow-x-hidden leading-snug bg-white  lg:rounded-[20px] rounded-t-[20px] rounded-b-lg lg:w-[1026px] w-full lg:h-fit h-[95%] flex flex-col">
          <header className="p-4 border-b w-full h-fit border-[#0000001A] flex items-center justify-between sticky top-0 bg-white z-20">
            <h4 className="text-2xl font-semibold">Update Task</h4>
            <IoClose onClick={onClose} size={24} className="cursor-pointer" />
          </header>
          <div className="lg:hidden bg-white flex items-center gap-x-3 p-4 sticky top-[65px] z-10">
            <button
              onClick={toggleTask}
              className={`flex-1 py-1 rounded-full text-xs uppercase font-semibold ${
                !isActivityOpen
                  ? "bg-black text-white"
                  : "border border-[#0000004D] text-[#625C5C]"
              } transition-all duration-300 ease-linear`}
            >
              Details
            </button>
            <button
              onClick={toggleTask}
              className={`flex-1 py-1 rounded-full text-xs uppercase font-semibold ${
                isActivityOpen
                  ? "bg-black text-white"
                  : "border border-[#0000004D] text-[#625C5C]"
              } transition-all duration-300 ease-linear`}
            >
              Activity
            </button>
          </div>

          <form
            onSubmit={handleSubmit(handleUpdateTask)}
            className="w-full h-full"
          >
            {!isActivityOpen ? (
              <div className="w-full flex h-full">
                <div className="lg:basis-[60%] basis-[100%] pt-2">
                  <div className="w-full px-4">
                    <input
                      {...register("title")}
                      type="text"
                      placeholder="Task title"
                      className={`w-full text-sm p-2 outline-none border ${
                        errors?.title ? "border-red-500" : "border-[#00000021]"
                      } placeholder:text-[#A2A3A7] rounded-lg`}
                    />
                    {errors?.title && (
                      <p className="text-[10px] text-red-500">
                        {errors?.title?.message}
                      </p>
                    )}
                  </div>
                  <div className="w-full px-4 mt-3">
                    <div className="w-full h-fit relative">
                      <textarea
                        {...register("description")}
                        rows={4}
                        placeholder="Description"
                        className={`w-full resize-none text-sm p-2 outline-none border ${
                          errors?.description
                            ? "border-red-500"
                            : "border-[#00000021]"
                        } placeholder:text-[#A2A3A7] rounded-lg`}
                      />
                      <p
                        className={`${
                          (watch("description") || "").length <= 300
                            ? "text-[#A2A3A7]"
                            : "text-red-500"
                        } text-xs absolute right-3 bottom-3`}
                      >
                        {`${
                          (watch("description") || "").length
                        }/300 characters`}
                      </p>
                    </div>
                    {errors?.description && (
                      <p className="text-[10px] text-red-500">
                        {errors?.description?.message}
                      </p>
                    )}
                  </div>
                  <div className="w-full px-4 mt-2 flex md:flex-row flex-col md:items-center md:justify-between md:gap-x-4 gap-y-2">
                    <div className="md:flex-1">
                      <h6 className="text-xs text-[#00000099] font-semibold mb-2">
                        Task Category*
                      </h6>
                      <div className="flex items-center gap-x-3">
                        {CATEGORY_OPTIONS.map((ele, ind) => (
                          <label
                            key={`${ele}${ind + 9}`}
                            className={`px-6 py-2.5 rounded-full text-[10px] ${
                              watch("category") === ele
                                ? "bg-[#7B1984] border-[#7B1984] text-white"
                                : "border-[#00000021] text-[#090909]"
                            }  font-bold border transition duration-300 ease-linear`}
                          >
                            <input
                              {...register("category")}
                              name="category"
                              value={ele}
                              type="radio"
                              hidden
                            />
                            {ele}
                          </label>
                        ))}
                      </div>
                    </div>
                    <div className="md:flex-1">
                      <h6 className="text-xs text-[#00000099] font-semibold mb-2">
                        Due on*
                      </h6>
                      <input
                        {...register("dueDate")}
                        type="date"
                        className="md:w-full w-1/2 text-sm p-2 outline-none border border-[#00000021] placeholder:text-[#A2A3A7] rounded-lg"
                      />
                    </div>
                    <div className="md:flex-1">
                      <h6 className="text-xs text-[#00000099] font-semibold mb-2">
                        Task Status*
                      </h6>
                      <select
                        {...register("status")}
                        className="md:w-full w-1/2 text-sm p-2 outline-none border border-[#00000021] placeholder:text-[#A2A3A7] rounded-lg"
                      >
                        <option value="">Choose</option>
                        {TASK_OPTIONS.map((ele, ind) => (
                          <option
                            className="uppercase"
                            key={`${ele}${ind + 9}`}
                            value={ele}
                          >
                            {ele}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="w-full px-4 mt-5">
                    <h6 className="text-sm text-[#00000099] font-semibold mb-2">
                      Attachment
                    </h6>
                    <label className="w-full bg-[#F1F1F15C] block font-medium text-[#1E212A] py-3 text-center text-xs rounded-lg border border-[#00000021]">
                      <input
                        type="file"
                        {...register("attachments")}
                        multiple
                        name=""
                        id=""
                        hidden
                      />
                      Drop your files here or{" "}
                      <span className="text-[#5377E3] underline">Update</span>
                    </label>
                    <div className="w-full h-44"></div>
                  </div>
                  <footer className="bg-[#F1F1F1] lg:hidden flex justify-end items-center gap-x-2 p-4 h-fit border-t border-[#00000021]">
                    <button
                      onClick={handleCancel}
                      className=" px-6 py-2.5 cursor-pointer text-sm uppercase font-bold rounded-full text-[#090909] bg-white border border-[#00000030]"
                    >
                      Cancel
                    </button>
                    <button
                      disabled={loading}
                      className={`${
                        loading ||
                        (watch("title") === taskData?.title &&
                          watch("description") === taskData?.description &&
                          watch("dueDate") === taskData?.dueDate &&
                          watch("status") === taskData?.status &&
                          watch("category") === taskData?.category)
                          ? "bg-[#B685BA] cursor-not-allowed"
                          : "bg-[#7B1984] cursor-pointer"
                      } px-6 py-2.5 text-sm uppercase font-bold rounded-full text-white`}
                    >
                      {loading ? "Updating..." : "Update"}
                    </button>
                  </footer>
                </div>

                <div className="lg:basis-[40%] lg:block hidden bg-[#F1F1F1] border-l border-[#00000021]">
                  <h6 className="w-full p-4 bg-white text-base text-[#00000099]">
                    Activity
                  </h6>
                  <div className="gap-x-2 md:text-xs text-[10px] flex items-start justify-between px-4 pt-4 pb-2">
                    <p className="text-wrap text-[#484B52] ">
                      You created this task
                    </p>
                    <p className="text-nowrap text-[#87898D] ">
                      {moment(taskData?.createdAt).format("MMM D [at] h:mm A")}
                    </p>
                  </div>
                  {taskData?.activity?.length > 0 &&
                    taskData?.activity?.map((ele, ind) => (
                      <div
                        key={`${ele?.message}${ind}`}
                        className=" md:text-xs text-[10px] gap-x-2 flex items-start justify-between px-4 py-2"
                      >
                        <p className="text-wrap text-[#484B52]">
                          {ele?.message}
                        </p>
                        <p className="text-nowrap text-[#87898D] text-left">
                          {moment(ele?.timeStamp).format("MMM D [at] h:mm A")}
                        </p>
                      </div>
                    ))}
                </div>
              </div>
            ) : (
              <div className="lg:basis-[40%] h-full block lg:hidden bg-[#F1F1F1] ">
                <div className="gap-x-2 md:text-xs text-[10px] flex items-start justify-between px-4 pt-4 pb-2">
                  <p className="text-wrap text-[#484B52] ">
                    You created this task
                  </p>
                  <p className="text-nowrap text-[#87898D]">
                    {moment(taskData?.createdAt).format("MMM D [at] h:mm A")}
                  </p>
                </div>
                {taskData?.activity?.length > 0 &&
                  taskData?.activity?.map((ele, ind) => (
                    <div
                      key={`${ele?.message}${ind}`}
                      className=" md:text-xs text-[10px] gap-x-2 flex items-start justify-between px-4 py-2"
                    >
                      <p className="text-wrap text-[#484B52]">{ele?.message}</p>
                      <p className="text-nowrap text-[#87898D]">
                        {moment(ele?.timeStamp).format("MMM D [at] h:mm A")}
                      </p>
                    </div>
                  ))}
              </div>
            )}
            <footer className="bg-[#F1F1F1] hidden lg:flex justify-end items-center gap-x-2 p-4 h-fit border-t border-[#00000021]">
              <button
                onClick={handleCancel}
                className=" px-6 py-2.5 cursor-pointer text-sm uppercase font-bold rounded-full text-[#090909] bg-white border border-[#00000030]"
              >
                Cancel
              </button>
              <button
                disabled={loading}
                className={`${
                  loading ||
                  (watch("title") === taskData?.title &&
                    watch("description") === taskData?.description &&
                    watch("dueDate") === taskData?.dueDate &&
                    watch("status") === taskData?.status &&
                    watch("category") === taskData?.category)
                    ? "bg-[#B685BA] cursor-not-allowed"
                    : "bg-[#7B1984] cursor-pointer"
                } px-6 py-2.5 text-sm uppercase font-bold rounded-full text-white`}
              >
                {loading ? "Updating..." : "Update"}
              </button>
            </footer>
          </form>
        </div>
      </div>
    )
  );
};

export default UpdateTaskModal;
