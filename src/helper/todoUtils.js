import moment from "moment";
export const generateId = () => {
  return Math.random().toString(36).substring(2, 8);
};

export const generateDate = () => {
  return new Date().toString();
};

export const convertToDate = (dateString) => {
  const date = new Date(dateString);
  return moment(date).format("LLL");
};
