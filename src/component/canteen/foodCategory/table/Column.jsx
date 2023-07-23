const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const COLUMNS = [
  {
    Header: "SN",
    accessor: (row, index) => index + 1,
    disableFilters: true,
  },
  {
    Header: "Category",
    accessor: "name",
    Cell: ({ row }) =>
      capitalizeFirstLetter(row.values.name),
  },
];
