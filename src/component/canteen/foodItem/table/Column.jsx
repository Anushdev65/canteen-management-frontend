const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const COLUMNS = [
  {
    Header: "Name",
    accessor: "name",
    disableFilters: true,
    Cell: ({ row }) => <div>{capitalizeFirstLetter(row.values.name)}</div>,
  },
  {
    Header: "Rate",
    accessor: "rate",
  },
  {
    Header: "Discounted Rate",
    accessor: "discountedRate",
  },
  {
    Header: "Category",
    accessor: "category.name",
  },
  {
    Header: "Description",
    accessor: "description",
  },
  {
    Header: "Tags",
    accessor: "tags",
  },
];
