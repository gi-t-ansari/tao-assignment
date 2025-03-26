import React, { useState } from "react";
import Navbar from "./Navbar";
import Header from "./Header";
import { AddTaskModal, UpdateTaskModal } from "../modals";

const Layout = ({
  selectedView,
  setSelectedView,
  setSearchedTerm,
  setCategoryFilterValue,
  children,
  setUserInfo,
  setIsAuthenticated,
  userInfo,
}) => {
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [isUpdateTaskOpen, setIsUpdateTaskOpen] = useState(false);

  return (
    <main className="w-screen h-screen overflow-x-hidden">
      <Navbar
        selectedView={selectedView}
        setSelectedView={setSelectedView}
        setUserInfo={setUserInfo}
        setIsAuthenticated={setIsAuthenticated}
        userInfo={userInfo}
      />
      <Header
        setCategoryFilterValue={setCategoryFilterValue}
        setIsAddTaskOpen={setIsAddTaskOpen}
        setSearchedTerm={setSearchedTerm}
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
