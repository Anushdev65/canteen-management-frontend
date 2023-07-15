export const COLUMNS = [
  {
    Header: "SN",
    accessor: "id",
  },
  {
    Header: "Food Items",
    accessor: "name",
  },
  {
    Header: "Available Time",
    accessor: "availableTime",
    columns: [
      {
        Header: "From",
        accessor: "from",
      },
      {
        Header: "To",
        accessor: "to",
      },
    ],
  },
  {
    Header: "Quantity",
    columns: [
      {
        Header: "Initial Quantity",
        accessor: "initialQuantity",
      },
      {
        Header: "Available Quantity",
        accessor: "availableQuantity",
      },
    ],
  },
];
