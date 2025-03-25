import React from "react";
import { BoardContainerCards } from "../cards";
import { TASK_OPTIONS } from "../../config";

const BoardView = ({ taskData }) => {
  return (
    <div className="w-full h-fit my-5 flex items-center gap-x-6">
      <BoardContainerCards
        cardData={taskData?.filter((ele) => ele?.status === TASK_OPTIONS[0])}
        emptyText={"No Tasks in To-Do"}
        name={"to-do"}
        className={"bg-[#FAC3FF]"}
      />
      <BoardContainerCards
        cardData={taskData?.filter((ele) => ele?.status === TASK_OPTIONS[1])}
        emptyText={"No Tasks In Progress"}
        name={"in-progress"}
        className={"bg-[#85D9F1]"}
      />
      <BoardContainerCards
        cardData={taskData?.filter((ele) => ele?.status === TASK_OPTIONS[2])}
        emptyText={"No Completed Tasks"}
        name={"completed"}
        className={"bg-[#A2D6A0]"}
      />
    </div>
  );
};

export default BoardView;
