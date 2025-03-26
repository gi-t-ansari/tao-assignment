import React, { useEffect, useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { TABS_CONTENT, API_URL, CATEGORY_OPTIONS } from "../../config";
import Layout from "../../components/layout/Layout";
import { ListView, BoardView, CircularProgress } from "../../components";

const fetchTasks = async () => {
  const { data } = await axios.get(API_URL);
  return data;
};

const Home = ({ setUserInfo, setIsAuthenticated, userInfo }) => {
  const {
    data: tasks = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
  });

  const [selectedView, setSelectedView] = useState(TABS_CONTENT[0].name);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [categoryFilterValue, setCategoryFilterValue] = useState("");
  const [searchedTerm, setSearchedTerm] = useState("");

  useEffect(() => {
    if (!tasks.length) return;

    let updatedTasks = tasks;

    if (CATEGORY_OPTIONS.includes(categoryFilterValue)) {
      updatedTasks = updatedTasks.filter(
        (task) => task?.category === categoryFilterValue
      );
    }

    if (searchedTerm.trim() !== "") {
      const lowerCaseSearch = searchedTerm.toLowerCase();
      updatedTasks = updatedTasks.filter(
        (task) =>
          task?.title?.toLowerCase().includes(lowerCaseSearch) ||
          task?.category?.toLowerCase().includes(lowerCaseSearch) ||
          task?.status?.toLowerCase().includes(lowerCaseSearch)
      );
    }

    setFilteredTasks(updatedTasks);
  }, [categoryFilterValue, searchedTerm, tasks]);

  return (
    <Layout
      selectedView={selectedView}
      setSelectedView={setSelectedView}
      setCategoryFilterValue={setCategoryFilterValue}
      setSearchedTerm={setSearchedTerm}
      setUserInfo={setUserInfo}
      setIsAuthenticated={setIsAuthenticated}
      userInfo={userInfo}
    >
      {isLoading ? (
        <CircularProgress />
      ) : error ? (
        <p className="text-red-500">{error.message}</p>
      ) : selectedView === TABS_CONTENT[0].name ? (
        <ListView taskData={filteredTasks} />
      ) : (
        <BoardView taskData={filteredTasks} />
      )}
    </Layout>
  );
};

export default Home;
