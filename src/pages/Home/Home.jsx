import React, { useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { TABS_CONTENT, API_URL } from "../../config";
import Layout from "../../components/layout/Layout";
import { ListView, BoardView, CircularProgress } from "../../components";

const fetchTasks = async () => {
  const { data } = await axios.get(API_URL);
  return data;
};

const Home = () => {
  const [selectedView, setSelectedView] = useState(TABS_CONTENT[0].name);
  const [categoryFilterValue, setCategoryFilterValue] = useState("");

  const {
    data: tasks = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
  });

  return (
    <Layout
      selectedView={selectedView}
      setSelectedView={setSelectedView}
      setCategoryFilterValue={setCategoryFilterValue}
    >
      {isLoading ? (
        <CircularProgress />
      ) : error ? (
        <p className="text-red-500">{error.message}</p>
      ) : selectedView === TABS_CONTENT[0].name ? (
        <ListView taskData={tasks} />
      ) : (
        <BoardView taskData={tasks} />
      )}
    </Layout>
  );
};

export default Home;
