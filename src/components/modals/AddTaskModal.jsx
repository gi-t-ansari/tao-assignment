import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { TASK_OPTIONS } from "../../config";

const AddTaskModal = ({ open, onClose }) => {
  const [showModal, setShowModal] = useState(open);
  const [loading, setLoading] = useState(false);

  const handleCancel = (e) => {
    e.preventDefault();
    onClose();
  };
  return (
    open && (
      <div className="h-screen w-screen top-0 left-0 right-0 bottom-0 fixed z-20">
        <div
          className="h-screen w-screen top-0 left-0 right-0 bottom-0 fixed bg-[rgba(49,49,49,0.8)]"
          onClick={onClose}
        ></div>
        <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 overflow-hidden leading-snug bg-white  rounded-[20px] w-[674px] h-fit">
          <header className="p-4 border-b border-[#0000001A] flex items-center justify-between">
            <h4 className="text-2xl font-semibold">Create Task</h4>
            <IoClose onClick={onClose} size={24} className="cursor-pointer" />
          </header>
          <form className="w-full px-4 py-2">
            <div className="w-full">
              <input
                type="text"
                placeholder="Task title"
                className="w-full text-sm p-2 outline-none border border-[#00000021] placeholder:text-[#A2A3A7] rounded-lg"
              />
            </div>
            <div className="w-full  mt-3">
              <div className="w-full h-fit relative">
                <textarea
                  rows={4}
                  placeholder="Description"
                  className="w-full resize-none text-sm p-2 outline-none border border-[#00000021] placeholder:text-[#A2A3A7] rounded-lg"
                />
                <p className="text-[#A2A3A7] text-xs absolute right-3 bottom-3">
                  0/300 characters
                </p>
              </div>
            </div>
            <div className="w-full mt-2 flex items-center justify-between gap-x-4">
              <div className="flex-1">
                <h6 className="text-xs text-[#00000099] font-semibold mb-2">
                  Task Category*
                </h6>
                <div className="flex items-center gap-x-3">
                  <label className="px-6 py-2.5 rounded-full text-[10px] text-[#090909] font-bold border border-[#00000021]">
                    <input name="category" type="radio" hidden />
                    Work
                  </label>
                  <label className="px-6 py-2.5 rounded-full text-[10px] text-[#090909] font-bold border border-[#00000021]">
                    <input name="category" type="radio" hidden />
                    Personal
                  </label>
                </div>
              </div>
              <div className="flex-1">
                <h6 className="text-xs text-[#00000099] font-semibold mb-2">
                  Due on*
                </h6>
                <input
                  type="date"
                  className="w-full text-sm p-2 outline-none border border-[#00000021] placeholder:text-[#A2A3A7] rounded-lg"
                />
              </div>
              <div className="flex-1">
                <h6 className="text-xs text-[#00000099] font-semibold mb-2">
                  Task Status*
                </h6>
                <select className="w-full text-sm p-2 outline-none border border-[#00000021] placeholder:text-[#A2A3A7] rounded-lg">
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
            <div className="w-full mt-5">
              <h6 className="text-sm text-[#00000099] font-semibold mb-2">
                Attachment
              </h6>
              <label className="w-full block font-medium text-[#1E212A] py-3 text-center text-xs rounded-lg border border-[#00000021]">
                <input type="file" multiple name="" id="" hidden />
                Drop your files here or{" "}
                <span className="text-[#5377E3] underline">Upload</span>
              </label>
              <div className="w-full h-44"></div>
            </div>
          </form>
          <footer className="bg-[#F1F1F1] flex justify-end items-center gap-x-2 p-4">
            <button
              onClick={handleCancel}
              className=" px-6 py-2.5 cursor-pointer text-sm uppercase font-bold rounded-full text-[#090909] bg-white border border-[#00000030]"
            >
              Cancel
            </button>
            <button
              className={`bg-[#B685BA] px-6 py-2.5 text-sm uppercase font-bold rounded-full text-white`}
            >
              Create
            </button>
          </footer>
        </div>
      </div>
    )
  );
};

export default AddTaskModal;
