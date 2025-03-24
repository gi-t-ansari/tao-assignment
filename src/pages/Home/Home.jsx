import React, { useState } from "react";
import { TABS_CONTENT } from "../../config";
import Layout from "../../components/layout/Layout";
import { ListView, BoardView } from "../../components";

const Home = () => {
  const [selectedView, setSelectedView] = useState(TABS_CONTENT[1].name);
  const [categoryFilterValue, setCategoryFilterValue] = useState("");

  return (
    <Layout
      selectedView={selectedView}
      setSelectedView={setSelectedView}
      categoryFilterValue={categoryFilterValue}
      setCategoryFilterValue={setCategoryFilterValue}
    >
      {TABS_CONTENT[0].name === selectedView ? <ListView /> : <BoardView />}
    </Layout>
  );
};

export default Home;
