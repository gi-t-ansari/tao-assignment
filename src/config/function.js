import moment from "moment";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_URL } from "./url";

export const formatDate = (inputDate) => {
  const today = moment().startOf("day");
  const date = moment(inputDate).startOf("day");

  const diff = date.diff(today, "days");

  switch (diff) {
    case 0:
      return "Today";
    case 1:
      return "Tomorrow";
    case -1:
      return "Yesterday";
    default:
      return date.format("DD MMM, YYYY");
  }
};

export const useAddTask = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (taskData) => {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(taskData),
      });
      if (!response.ok) throw new Error("Failed to add task");
      return response.json();
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["tasks"]);
      },
      onError: (error) => {
        console.error("Error adding task:", error);
      },
    }
  );
};
