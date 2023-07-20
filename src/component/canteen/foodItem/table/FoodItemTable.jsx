import AddIcon from "@mui/icons-material/Add";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Fab, Grid, Tooltip, Zoom } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePagination, useRowSelect, useSortBy, useTable } from "react-table";
import { useLazyGetAllFoodItemQuery } from "../../../../services/api/canteen/foodItem";
import { IndeterminateCheckbox } from "../../../IndeterminateCheckbox";
import { COLUMNS } from "./Column";
import FoodItemPopModel from "../popupmodel/FoodItemPopModel";
import MUIDeleteModal from "../../../MUIDeleteModal";
import "../../../../foodstyles/foodtable.css";
import DescriptionIcon from "@mui/icons-material/Description";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import CategoryIcon from "@mui/icons-material/Category";
import StyleIcon from "@mui/icons-material/Style";
import DiscountIcon from "@mui/icons-material/Discount";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
const FoodItemTable = () => {
  const columns = useMemo(() => COLUMNS, []);
  const [trigger, { data }] = useLazyGetAllFoodItemQuery();
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    trigger({ _page: currentPage, _brake: rowsPerPage, _sort: sortBy });
  }, [currentPage, rowsPerPage, sortBy, trigger]);

  const tableData = useMemo(
    () => data?.data?.results || [],
    [data?.data?.results]
  );

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
      initialState: { pageSize: 20 },
      stateReducer: (state, action) => {
        if (
          action.type === "toggleRowSelected" &&
          Object.keys(state.selectedRowIds).length
        ) {
          const newState = { ...state };

          newState.selectedRowIds = {
            [action.id]: true,
          };

          return newState;
        }

        return state;
      },
    },
    useSortBy,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => {
        return [
          {
            id: "selection",
            // Header: ({ getToggleAllRowsSelectedProps }) => {
            //   return (
            //     <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
            //   );
            // },
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

  const handleEditProfile = () => {
    setOpenModal(true);
  };

  const handleDeleteProfile = () => {
    setOpenDeleteModal(true);
  };

  const handleAddFoodItem = () => {
    navigate("/create-fooditem");
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  return (
    <>
      <FoodItemPopModel
        open={openModal}
        handleClose={handleCloseModal}
        foodId={selectedFlatRows[0]?.original._id}
      />
      <MUIDeleteModal
        open={openDeleteModal}
        handleClose={handleCloseDeleteModal}
        foodItem={selectedFlatRows[0]?.original}
      />
      <Grid container justifyContent="space-between" sx={{ mb: 2 }}>
        <Grid item>
          <Tooltip
            title="Add Food Items"
            placement="right-start"
            TransitionComponent={Zoom}
          >
            <Fab
              id="icon-add"
              aria-label="add"
              size="small"
              onClick={handleAddFoodItem}
            >
              <AddIcon />
            </Fab>
          </Tooltip>
        </Grid>
        {selectedFlatRows.length > 0 && (
          <Grid item>
            <Box sx={{ display: "flex", gap: "10px" }}>
              <Tooltip
                title="Update Food Items"
                placement="top"
                TransitionComponent={Zoom}
                onClick={handleEditProfile}
              >
                <Fab id="icon-edit" aria-label="view" size="small">
                  <EditIcon />
                </Fab>
              </Tooltip>
              <Tooltip
                title="Delete Food Items"
                placement="top"
                TransitionComponent={Zoom}
                onClick={handleDeleteProfile}
              >
                <Fab id="icon-delete" aria-label="view" size="small">
                  <DeleteOutlinedIcon />
                </Fab>
              </Tooltip>
            </Box>
          </Grid>
        )}
      </Grid>

      <table {...getTableProps()} className="foodItem-container">
        <thead className="Item-header">
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
                        className="icon-fooditem"
                        {...column.getHeaderProps()}
                      />
                      {column.render("Header")}
                    </span>
                  ) : (
                    <>
                      {column.id === "name" && (
                        <span>
                          {column.id === "name" && (
                            <DriveFileRenameOutlineIcon className="icon-fooditem" />
                          )}
                          {column.render("Header")}
                        </span>
                      )}
                      {column.id === "rate" && (
                        <span>
                          {column.id === "rate" && (
                            <CurrencyRupeeIcon className="icon-fooditem" />
                          )}
                          {column.render("Header")}
                        </span>
                      )}
                      {column.id === "discountedRate" && (
                        <span>
                          {column.id === "discountedRate" && (
                            <DiscountIcon className="icon-fooditem" />
                          )}
                          {column.render("Header")}
                        </span>
                      )}
                      {column.id === "category.name" && (
                        <span>
                          {column.id === "category.name" && (
                            <CategoryIcon className="icon-fooditem" />
                          )}
                          {column.render("Header")}
                        </span>
                      )}
                      {column.id === "description" && (
                        <span>
                          {column.id === "description" && (
                            <DescriptionIcon className="icon-fooditem" />
                          )}
                          {column.render("Header")}
                        </span>
                      )}
                      {column.id === "tags" && (
                        <span>
                          {column.id === "tags" && (
                            <StyleIcon className="icon-fooditem" />
                          )}
                          {column.render("Header")}
                        </span>
                      )}
                    </>
                  )}
                  {/* {column.render("Header")} */}
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
        <tbody {...getTableBodyProps()} className="fooditem-body">
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

      <div
        className="pegnation-foodtable"
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
            {data?.data.currentPage} of {data?.data?.totalPage}
          </strong>
        </span>
        <button
          disabled={!data?.data?.hasPreviousPage}
          onClick={() => handlePage(1)}
        >
          {"<<"}
        </button>
        <button
          onClick={() => handlePage(data?.data?.currentPage - 1)}
          disabled={!data?.data?.hasPreviousPage}
        >
          Previous
        </button>
        <button
          onClick={() => handlePage(data?.data?.currentPage + 1)}
          disabled={!data?.data?.hasNextPage}
        >
          {" "}
          Next
        </button>
        <button
          disabled={!data?.data?.hasNextPage}
          onClick={() => handlePage(data?.data?.totalPage)}
        >
          {">>"}
        </button>
      </div>
    </>
  );
};
export default FoodItemTable;
