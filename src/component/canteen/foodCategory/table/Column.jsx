export const COLUMNS = [
  {
    Header: "SN",
    accessor: (row, index) => index + 1,
    disableFilters: true,
  },
  {
    Header: "Category",
    accessor: "name",
  },
];
