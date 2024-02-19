export const FormatDate = (dateString) => {
  const option = { month: "long", date: "numeric", year: "numeric" };
  const date = new Date(dateString).toLocaleDateString("en-us", option);

  const hour = dateString.getHours();
  const minute = dateString.getMinute();
  const period = hour > 12 ? "PM" : "AM";
  const time = `${hour % 12}:${minute.toString().padStart(2, "0")} ${period}`;
  return `${date} | ${time}`;
};
