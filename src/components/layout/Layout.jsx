import React from "react";
import Navbar from "./Navbar";
import Header from "./Header";

const Layout = ({ selectedView, setSelectedView, children }) => {
  return (
    <main className="w-screen h-screen overflow-x-hidden">
      <Navbar selectedView={selectedView} setSelectedView={setSelectedView} />
      <Header />
      <div>{children}</div>
    </main>
  );
};

export default Layout;
