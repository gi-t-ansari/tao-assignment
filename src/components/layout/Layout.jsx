import React from "react";
import Navbar from "./Navbar";
import Header from "./Header";

const Layout = ({
  selectedView,
  setSelectedView,
  categoryFilterValue,
  setCategoryFilterValue,
  children,
}) => {
  return (
    <main className="w-screen h-screen overflow-x-hidden">
      <Navbar selectedView={selectedView} setSelectedView={setSelectedView} />
      <Header
        categoryFilterValue={categoryFilterValue}
        setCategoryFilterValue={setCategoryFilterValue}
      />
      <div className="md:px-6 px-4">{children}</div>
    </main>
  );
};

export default Layout;
