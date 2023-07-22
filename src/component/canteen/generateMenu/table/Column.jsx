import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import dayjs from "dayjs";
import React, { useCallback, useState } from "react";
import "../../../../foodstyles/generatetable.css";
import FoodAvailableTime from "../component/FoodAvailableTime";
import FoodQuantity from "../component/FoodQuantity";
import POPModel from "../popmodel/POPModel";

const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const COLUMNS = [
  {
    Header: "SN",
    accessor: (row, index) => index + 1,
  },
  {
    Header: "Food Items",
    accessor: "name",
    Cell: ({ row }) => (
      <div style={{ width: "210px" }}>
        {capitalizeFirstLetter(row.values.name)}
      </div>
    ),
  },
  {
    Header: "Available Time",

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
          return (
            <FoodQuantity
              value={row.values.availableQuantity || ""}
              disable={true}
            />
          );
        },
      },
      {
        Header: "Add Quantity",
        accessor: "addQuantity",
        Cell: ({ row }) => {
          const [openModal, setOpenModal] = useState(false);

          const handleCloseModal = useCallback(() => {
            setOpenModal(false);
          }, []);

          const handleClick = () => {
            setOpenModal(true);
          };

          if (row.isSelected) {
            return (
              <>
                <AddCircleOutlineOutlinedIcon onClick={handleClick} />
                <POPModel
                  open={openModal}
                  handleClose={handleCloseModal}
                  label={"Load Fund"}
                  row={row}
                />
              </>
            );
          }
        },
      },
    ],
  },
];

export default COLUMNS;
