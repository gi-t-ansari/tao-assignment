import React, { useState } from "react";
import Navbar from "./Navbar";
import Header from "./Header";
import { AddTaskModal, UpdateTaskModal } from "../modals";

const Layout = ({
  selectedView,
  setSelectedView,

  setCategoryFilterValue,
  children,
}) => {
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [isUpdateTaskOpen, setIsUpdateTaskOpen] = useState(false);

  return (
    <main className="w-screen h-screen overflow-x-hidden">
      <Navbar selectedView={selectedView} setSelectedView={setSelectedView} />
      <Header
        setCategoryFilterValue={setCategoryFilterValue}
        setIsAddTaskOpen={setIsAddTaskOpen}
      />
      <div className="md:px-6 px-4">{children}</div>
      <AddTaskModal
        open={isAddTaskOpen}
        onClose={() => setIsAddTaskOpen(false)}
      />
      <UpdateTaskModal
        open={isUpdateTaskOpen}
        onClose={() => setIsUpdateTaskOpen(false)}
      />
    </main>
  );
};

export default Layout;
