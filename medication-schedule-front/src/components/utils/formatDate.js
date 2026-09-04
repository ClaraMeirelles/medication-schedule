export const formatDate = (dateKey) => {
  const [year, month, day] = dateKey.split("-");
  return `${day}/${month}/${year}`;
};
