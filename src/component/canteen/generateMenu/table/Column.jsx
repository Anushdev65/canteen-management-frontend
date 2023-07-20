import React from "react";
import FoodAvailableTime from "./FoodAvailableTime";
import FoodQuantity from "./FoodQuantity";
import dayjs from "dayjs";
import "../../../../foodstyles/generatetable.css";

// const Subheader = () => {
//   return <div style={{ color: "rgb(52, 107, 107)" }}>Available From</div>;
// };

const COLUMNS = [
  {
    Header: "SN",
    accessor: (row, index) => index + 1,
  },
  {
    Header: "Food Items",
    accessor: "name",
  },
  {
    Header: "Available",

    columns: [
      {
        Header: "Available From",

        accessor: "from",
        Cell: ({ row }) => {
          const handleFromChange = (value) => {
            row.values.from = value;
          };

          row.values.from =
            dayjs(row.original.availableTime?.from) || dayjs(new Date());

          return (
            <FoodAvailableTime
              value={row.values.from}
              handleFromChange={handleFromChange}
            />
          );
        },
      },

      {
        Header: "Available To",
        accessor: "to",
        Cell: ({ row }) => {
          const handleToChange = (value) => {
            row.values.to = value;
          };

          row.values.to = row.original.availableTime?.to
            ? dayjs(row.original.availableTime.to)
            : dayjs().add(6, "hours");

          return (
            <FoodAvailableTime
              value={row.values.to}
              handleToChange={handleToChange}
            />
          );
        },
      },
    ],
  },
  {
    Header: "Quantity",
    columns: [
      {
        Header: "Initial Quantity",
        accessor: "initialQuantity",
        Cell: ({ row }) => {
          const handleChange = (updatedValue) => {
            row.values.initialQuantity = updatedValue;
          };
          return (
            <FoodQuantity
              onChange={handleChange}
              label={"Initial Quantity"}
              value={row.values.initialQuantity || ""}
            />
          );
        },
      },
      {
        Header: "Available Quantity",
        accessor: "availableQuantity",
        Cell: ({ row }) => {
          const handleChange = (updatedValue) => {
            row.values.availableQuantity = updatedValue;
          };

          return (
            <FoodQuantity
              onChange={handleChange}
              label={"Available Quantity"}
              value={row.values.availableQuantity || ""}
            />
          );
        },
      },
    ],
  },
];

export default COLUMNS;
