import AddIcon from "@mui/icons-material/Add";
import { Fab, Grid, Tooltip, Typography, Zoom } from "@mui/material";
import React, { useMemo, useState } from "react";
import { usePagination, useRowSelect, useSortBy, useTable } from "react-table";
import {
  useGetAllFoodItemQuery,
  useUpdateFoodMenuMutation,
} from "../../../../services/api/canteen/foodItem";
import "../../../../foodstyles/generatetable.css";
import { IndeterminateCheckbox } from "../../../IndeterminateCheckbox";
import MUIToast from "../../../MUIToast";
import COLUMNS from "./Column";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import TaskAltIcon from "@mui/icons-material/TaskAlt";

const GenerateMenu = () => {
  const [updateFoodMenu, { data: foodMenu, error: foodMenuError, message }] =
    useUpdateFoodMenuMutation();
  const columns = useMemo(() => COLUMNS, []);
  const { data } = useGetAllFoodItemQuery();

  const tableData = useMemo(
    () => data?.data?.results || [],
    [data?.data?.results]
  );

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    selectedFlatRows,
  } = useTable(
    {
      columns,
      data: tableData,
      initialState: { pageSize: 15 },
    },
    useSortBy,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => {
        return [
          {
            id: "selection",
            Cell: ({ row }) => {
              return (
                <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
              );
            },
          },
          ...columns,
        ];
      });
    }
  );

  const handleRowSelect = (e) => {
    const selectedRowsPerPage = e.target.value;
    setRowsPerPage(selectedRowsPerPage);
    setCurrentPage(1);
  };

  const handlePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSort = (column) => {
    setSortBy(
      sortBy === column.id
        ? `-${column.id}`
        : sortBy === `-${column.id}`
        ? ""
        : column.id
    );
  };

  const handleAddMenu = () => {
    const dataTOSend = selectedFlatRows.map((row) => ({
      id: row.original._id,
      availableTime: {
        from: row.values.from.format("YYYY-MM-DDTHH:mm:ss"),
        to: row.values.to.format("YYYY-MM-DDTHH:mm:ss"),
      },
      initialQuantity: row.values.initialQuantity,
      availableQuantity: row.values.availableQuantity,
    }));
    updateFoodMenu(dataTOSend);
  };

  console.log(selectedFlatRows);

  return (
    <>
      {foodMenu && (
        <MUIToast
          initialValue={true}
          message={foodMenu.message}
          severity="success"
        />
      )}
      {foodMenuError && (
        <MUIToast
          initialValue={true}
          message={foodMenuError.data.message}
          severity="error"
        />
      )}

      <Grid container justifyContent="space-between" sx={{ mb: 2 }}>
        <Grid item>
          <Typography component="h1" variant="h5" className="todays-menu">
            Todays Menu
          </Typography>
        </Grid>
        {selectedFlatRows.length > 0 && (
          <Grid item>
            <Tooltip
              title="Add Menu"
              placement="right-start"
              TransitionComponent={Zoom}
            >
              <Fab
                id="generate-icon"
                aria-label="add"
                size="small"
                onClick={handleAddMenu}
              >
                <AddIcon />
              </Fab>
            </Tooltip>
          </Grid>
        )}
      </Grid>
      <table {...getTableProps()} className="generatetable-container">
        <thead id="generat-header">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  onClick={() => {
                    if (column.id !== "selection") {
                      handleSort(column);
                    }
                  }}
                >
                  {column.id === "selection" ? (
                    <span>
                      <TaskAltIcon
                        className="Icon-checkbox"
                        {...column.getHeaderProps()}
                      />
                      {column.render("Header")}
                    </span>
                  ) : (
                    <>
                      {column.id === "name" && (
                        <span>
                          {column.id === "name" && (
                            <FastfoodIcon className="Icon-food" />
                          )}
                          {column.render("Header")}
                        </span>
                      )}

                      {column.id !== "name" && (
                        <span>{column.render("Header")}</span>
                      )}
                    </>
                  )}
                  <span>
                    {sortBy === column.id
                      ? " ↑"
                      : sortBy === `-${column.id}`
                      ? " ↓"
                      : ""}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <span>
          Rows per page:{" "}
          <select onChange={handleRowSelect} value={rowsPerPage}>
            {[5, 10, 15, 20].map((value, index) => (
              <option key={index} value={value}>
                {value}
              </option>
            ))}
          </select>
        </span>

        <span>
          Page{" "}
          <strong>
            {data.currentPage} of {data.totalPage}
          </strong>
        </span>
        <button disabled={!data.hasPreviousPage} onClick={() => handlePage(1)}>
          {"<<"}
        </button>
        <button
          onClick={() => handlePage(data.currentPage - 1)}
          disabled={!data.hasPreviousPage}
        >
          Previous
        </button>
        <button
          onClick={() => handlePage(data.currentPage + 1)}
          disabled={!data.hasNextPage}
        >
          {" "}
          Next
        </button>
        <button
          disabled={!data.hasNextPage}
          onClick={() => handlePage(data.totalPage)}
        >
          {">>"}
        </button>
      </div> */}
    </>
  );
};
export default GenerateMenu;
