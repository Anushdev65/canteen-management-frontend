import {
  createTable,
  getCoreRowModel,
  getExpandedRowModel,
  useTableInstance,
} from "@tanstack/react-table";
import React, { useState } from "react";
import STUDENTS from "./students.json";

const table = createTable();
const defaultData = [...STUDENTS];
const defaultColumns = [
  table.createDataColumn("firstName", {
    id: "Item",
    header: (props) => (
      <>
        <button
          type="button"
          style={{ cursor: "pointer" }}
          onClick={props.instance.getToggleAllRowsExpandedHandler()}
        >
          {props.instance.getIsAllRowsExpanded() ? "👇" : "👉"}
        </button>
        Item
      </>
    ),
    cell: (props) => {
      return (
        <div style={{ paddingLeft: `${props.row.depth * 2}rem` }}>
          {props.row.getCanExpand() ? (
            <button
              type="button"
              style={{ cursor: "pointer" }}
              onClick={props.row.getToggleExpandedHandler()}
            >
              {props.row.getIsExpanded() ? "👇" : "👉"}
            </button>
          ) : (
            "🤲"
          )}

          {props.getValue()}
        </div>
      );
    },
  }),
  table.createDataColumn("middleName", {
    id: "Img",
  }),
  table.createDataColumn("lastName", {
    id: "Available Time",
  }),

  table.createDataColumn("age", {
    id: "Rate",
  }),

  table.createDataColumn((row) => row.phone[1], {
    id: "Sub rate",
  }),
  table.createDataColumn((row) => row.phone[2], {
    id: "Int Quantity",
  }),

  table.createDataColumn("email", {
    id: "Available Quantity",
  }),

  table.createDataColumn("date_of_birth", {
    id: "Price",
  }),
];
const MenuTable = () => {
  const [expanded, setExpanded] = useState({});
  const selectedItem = [];

  const instance = useTableInstance(table, {
    data: defaultData,
    columns: defaultColumns,
    state: {
      expanded,
    },
    getSubRows: (row) => row.subRows,
    onExpandedChange: setExpanded,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
  });

  const handleChange = (e, row) => {
    const rowIncluded =
      selectedItem.length > 0
        ? selectedItem.filter(
            (item) => item.foodItem.email === row.original.email
          )
        : [];

    if (rowIncluded.length)
      selectedItem.forEach((item) => {
        if (item?.foodItem.email === row.original.email)
          item.quantity = e.target.value;
      });

    if (!rowIncluded.length)
      selectedItem.push({ foodItem: row.original, quantity: e.target.value });
  };

  const handleSubmit = () => {
    const finalOrder = [
      ...selectedItem?.map((item) => ({
        food: item.foodItem.email,
        quantity: item.quantity,
      })),
    ];

    console.log(finalOrder);
  };

  return (
    <div>
      <table border={1}>
        <thead>
          {instance.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder ? null : header.renderHeader()}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {instance.getRowModel().rows.map((row) => (
            <tr key={row.id} className={`depth-${row.depth}`}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {cell.column.id === "Available Quantity" ? (
                    <div style={{ paddingLeft: `${row.depth * 2}rem` }}>
                      {!row.getCanExpand() && (
                        <input
                          type="number"
                          min={0}
                          name={`email.${row.id}`}
                          onChange={(e) => {
                            handleChange(e, row);
                          }}
                        />
                      )}
                    </div>
                  ) : (
                    cell.renderCell()
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleSubmit}> Place order</button>
    </div>
  );
};

export default MenuTable;
