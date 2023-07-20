import AddIcon from "@mui/icons-material/Add";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Fab, Grid, Tooltip, Zoom } from "@mui/material";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { usePagination, useRowSelect, useSortBy, useTable } from "react-table";
import { useLazyGetAllFoodCategoryQuery } from "../../../../services/api/canteen/foodcategory";
import { COLUMNS } from "./Column";
import { IndeterminateCheckbox } from "../../../IndeterminateCheckbox";
import MUIDeleteModal from "../../../MUIDeleteModal";
import "../../../../foodstyles/table.css";
import AddCategoryModel from "../popmodel/AddCategoryModel";
import CategoryIcon from "@mui/icons-material/Category";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import TagIcon from "@mui/icons-material/Tag";

const FoodCategory = () => {
  const [trigger, { data }] = useLazyGetAllFoodCategoryQuery();
  const columns = useMemo(() => COLUMNS, []);
  const tableData = useMemo(
    () => data?.data?.results || [],
    [data?.data?.results]
  );
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  useEffect(() => {
    trigger({ _page: currentPage, _brake: rowsPerPage, _sort: sortBy });
  }, [currentPage, rowsPerPage, sortBy, trigger]);

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
    trigger({ _page: 1, _brake: selectedRowsPerPage });
  };

  const handlePage = (pageNumber) => {
    setCurrentPage(pageNumber);
    trigger({ _page: pageNumber, _brake: rowsPerPage });
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

  const handleCloseModal = useCallback(() => {
    setOpenModal(false);
  }, []);

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  const handleEditCategory = () => {
    setOpenModal(true);
  };

  const handleDeleteCategory = () => {
    setOpenDeleteModal(true);
  };

  const handleAddCategory = () => {
    setOpenModal(true);
  };

  return (
    <>
      <AddCategoryModel
        open={openModal}
        handleClose={handleCloseModal}
        category={selectedFlatRows[0]?.original}
      />
      <MUIDeleteModal
        open={openDeleteModal}
        handleClose={handleCloseDeleteModal}
        category={selectedFlatRows[0]?.original}
      />
      <Grid container justifyContent="space-between" sx={{ mb: 2 }}>
        <Grid item>
          <Tooltip
            title="Add Category"
            placement="right-start"
            TransitionComponent={Zoom}
          >
            <Fab
              id="addicon"
              aria-label="add"
              size="small"
              onClick={handleAddCategory}
            >
              <AddIcon />
            </Fab>
          </Tooltip>
        </Grid>
        {selectedFlatRows.length > 0 && (
          <Grid item>
            <Box sx={{ display: "flex", gap: "10px" }}>
              <Tooltip
                title="Update Category"
                placement="top"
                TransitionComponent={Zoom}
                onClick={handleEditCategory}
              >
                <Fab id="editIcon" aria-label="view" size="small">
                  <EditIcon />
                </Fab>
              </Tooltip>
              <Tooltip
                title="Delete Category"
                placement="top"
                TransitionComponent={Zoom}
                onClick={handleDeleteCategory}
              >
                <Fab id="deleteIcon" aria-label="view" size="small">
                  <DeleteOutlinedIcon />
                </Fab>
              </Tooltip>
            </Box>
          </Grid>
        )}
      </Grid>
      <div>
        <table {...getTableProps()} className="foodtable-container">
          <thead className="food-header">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    onClick={() => {
                      if (column.id !== "SN") {
                        handleSort(column);
                      }
                    }}
                  >
                    {column.id === "selection" ? (
                      <span>
                        <TaskAltIcon
                          className="icons"
                          {...column.getHeaderProps()}
                        />
                        {column.render("Header")}
                      </span>
                    ) : (
                      <span>
                        {column.id === "name" && (
                          <>
                            <div className="header-icon">
                              <CategoryIcon className="icons" />
                              <span>{column.render("Header")}</span>
                            </div>
                          </>
                        )}
                        {column.id !== "name" && column.id !== "SN" && (
                          <span>{column.render("Header")}</span>
                        )}
                        {column.id === "SN" && (
                          <>
                            <div className="header-icon">
                              <TagIcon className="icons" />
                              <span>{column.render("Header")}</span>
                            </div>
                          </>
                        )}
                      </span>
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
      </div>
      <div
        className="pegnation-category"
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
export default FoodCategory;
