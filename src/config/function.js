import moment from "moment";

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
