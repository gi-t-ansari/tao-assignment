import React from "react";
import TaskCard from "./TaskCard";

const BoardContainerCards = ({ name, cardData, emptyText, className }) => {
  return (
    <section className="bg-[#F1F1F1] border border-[#58575112] w-[336px] h-[566px] rounded-xl p-2 flex flex-col">
      <h6
        className={`text-sm w-fit h-fit uppercase px-2.5 py-1 rounded-sm  text-black ${className}`}
      >
        {name}
      </h6>
      <div
        className={`${
          cardData?.length <= 0
            ? "flex flex-col gap-y-2 mt-3"
            : "flex justify-center items-center "
        } flex-1 overflow-y-auto`}
      >
        {cardData?.length <= 0 ? (
          <>
            <TaskCard />
            <TaskCard />
            <TaskCard />
          </>
        ) : (
          <p className="text-[#2F2F2F] text-[15px]">{emptyText}</p>
        )}
      </div>
    </section>
  );
};

export default BoardContainerCards;
