import {
  createTable,
  getCoreRowModel,
  getExpandedRowModel,
  useTableInstance,
} from "@tanstack/react-table";
import React, { useCallback, useMemo, useState } from "react";
import CheckOut from "../popModel/CheckOut";
import STUDENTS from "./students.json";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import "../../../menuorder/menutable.css";

const table = createTable();
const defaultData = [...STUDENTS];

const EditableCell = ({ getValue, instance, column, row }) => {
  const initialValue = getValue();
  const [value, setValue] = useState(initialValue);

  const handleBlur = () => {
    instance.options.meta.updateData(row, column.id, value);
  };

  if (column.id === "avlQuantity" && !row.getCanExpand())
    return (
      <input
        type="number"
        value={value}
        min={0}
        onChange={(e) => setValue(e.target.value)}
        onBlur={handleBlur}
      />
    );
  return <div>{value} </div>;
};

const defaultColumn = {
  cell: (props) => <EditableCell {...props} />,
};
const MenuTable = () => {
  const selectedItem = [];

  const [userOrder, setUserOrder] = useState([]);
  const [expanded, setExpanded] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const columns = useMemo(
    () => [
      table.createDataColumn("firstName", {
        id: "Item",
        header: (props) => (
          <>
            <button
              className="menu-button"
              type="button"
              style={{ cursor: "pointer" }}
              onClick={props.instance.getToggleAllRowsExpandedHandler()}
            >
              {props.instance.getIsAllRowsExpanded() ? (
                <KeyboardDoubleArrowDownIcon className="menu-icon" />
              ) : (
                <KeyboardDoubleArrowRightIcon className="menu-icon" />
              )}
            </button>
            Item
          </>
        ),
        cell: (props) => {
          return (
            <div style={{ paddingLeft: `${props.row.depth * 2}rem` }}>
              {props.row.getCanExpand() ? (
                <button
                  className="menu-button"
                  type="button"
                  style={{ cursor: "pointer" }}
                  onClick={props.row.getToggleExpandedHandler()}
                >
                  {props.row.getIsExpanded() ? (
                    <KeyboardArrowDownIcon className="menu-icon" />
                  ) : (
                    <KeyboardArrowRightIcon className="menu-icon" />
                  )}
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

      table.createDataColumn("quantity", {
        id: "avlQuantity",
        header: "Avl Quantity",
      }),

      table.createDataColumn("date_of_birth", {
        id: "Price",
      }),
    ],
    []
  );

  const instance = useTableInstance(table, {
    data: defaultData,
    columns,
    defaultColumn,
    meta: {
      updateData: (row, columnId, value) => {
        handleChange(value, row);
      },
    },
    state: {
      expanded,
    },
    getSubRows: (row) => row.subRows,
    onExpandedChange: setExpanded,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
  });

  const handleChange = (value, row) => {
    const rowIncluded =
      selectedItem.length > 0
        ? selectedItem.filter(
            (item) => item.foodItem.email === row.original.email
          )
        : [];

    if (rowIncluded.length)
      selectedItem.forEach((item) => {
        if (item?.foodItem.email === row.original.email) item.quantity = value;
      });

    if (!rowIncluded.length)
      selectedItem.push({ foodItem: row.original, quantity: value });
  };

  const handleCloseModal = useCallback(() => {
    setOpenModal(false);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalOrder = [
      ...selectedItem?.map((item) => ({
        food: item.foodItem,
        quantity: item.quantity,
      })),
    ];
    setUserOrder(finalOrder);

    if (finalOrder.length > 0) setOpenModal(true);
  };

  return (
    <div>
      <CheckOut
        open={openModal}
        handleClose={handleCloseModal}
        userOrder={userOrder}
      />
      <table border={1} className="menutable-container">
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
                  {/* {cell.column.id === "Available Quantity" ? (
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
                  )} */}
                  {cell.renderCell()}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <button className="btn-button" onClick={handleSubmit}>
        Place order
      </button>
    </div>
  );
};

export default MenuTable;
