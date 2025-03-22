import React, { useState } from "react";
import Navbar from "../../components/layout/Navbar";
import { TABS_CONTENT } from "../../config";
import Layout from "../../components/layout/Layout";

const Home = () => {
  const [selectedView, setSelectedView] = useState(TABS_CONTENT[0].name);
  return (
    <Layout selectedView={selectedView} setSelectedView={setSelectedView}>
      <h1>Home</h1>
    </Layout>
  );
};

export default Home;
