import moment from "moment";

export const formateDate = (date) => {
  return moment(date).format(`DD MMMM YYYY`);
};
