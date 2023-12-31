import AddIcon from "@mui/icons-material/Add";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { Box, Fab, Grid, Tooltip, Zoom } from "@mui/material";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePagination, useRowSelect, useSortBy, useTable } from "react-table";
import { useLazyGetAllUsersQuery } from "../services/api/admin/auth";
import { IndeterminateCheckbox } from "./IndeterminateCheckbox";
import MUIDeleteModal from "./MUIDeleteModal";
import MUIModal from "./MUIModal";
import { COLUMNS } from "./columns";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import WcIcon from "@mui/icons-material/Wc";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import "../styles/usertable.css";

const AllUsers = () => {
  const columns = useMemo(() => COLUMNS, []);
  const [trigger, { data }] = useLazyGetAllUsersQuery();
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const navigate = useNavigate();

  const tableData = useMemo(
    () => data?.data?.results || [],
    [data?.data?.results]
  );

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

  const handleViewProfile = () => {
    navigate(`/view-user/${selectedFlatRows[0]?.original._id}`);
  };

  const handleCloseModal = useCallback(() => {
    setOpenModal(false);
  }, []);

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  const handleEditProfile = () => {
    setOpenModal(true);
  };

  const handleDeleteProfile = () => {
    setOpenDeleteModal(true);
  };

  return (
    <>
      <MUIModal
        open={openModal}
        handleClose={handleCloseModal}
        userId={selectedFlatRows[0]?.original._id}
      />
      <MUIDeleteModal
        open={openDeleteModal}
        handleClose={handleCloseDeleteModal}
        userId={selectedFlatRows[0]?.original._id}
      />
      <Grid container justifyContent="space-between" sx={{ mb: 2 }}>
        <Grid item>
          <Tooltip
            title="Add User"
            placement="right-start"
            TransitionComponent={Zoom}
          >
            <Fab
              id="addIcon"
              aria-label="add"
              size="small"
              onClick={() => {
                navigate("/create-user");
              }}
            >
              <AddIcon />
            </Fab>
          </Tooltip>
        </Grid>

        {selectedFlatRows.length > 0 && (
          <Grid item className="Icon">
            <Box sx={{ display: "flex", gap: "10px" }}>
              <Tooltip
                title="View User"
                placement="top"
                TransitionComponent={Zoom}
              >
                <Fab
                  aria-label="view"
                  size="small"
                  id="visibityIcon"
                  onClick={handleViewProfile}
                >
                  <VisibilityOutlinedIcon />
                </Fab>
              </Tooltip>
              <Tooltip
                title="Edit User"
                placement="top"
                TransitionComponent={Zoom}
                onClick={handleEditProfile}
              >
                <Fab id="editIcon" aria-label="view" size="small">
                  <EditIcon />
                </Fab>
              </Tooltip>
              <Tooltip
                title="Delete User"
                placement="top"
                TransitionComponent={Zoom}
                onClick={handleDeleteProfile}
              >
                <Fab id="delete" aria-label="view" size="small">
                  <DeleteOutlinedIcon />
                </Fab>
              </Tooltip>
            </Box>
          </Grid>
        )}
      </Grid>

      <div className="table-container">
        <table {...getTableProps()} className="table-data">
          <thead className="header">
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
                          className="Icon"
                          {...column.getHeaderProps()}
                        />
                        {column.render("Header")}
                      </span>
                    ) : (
                      <>
                        {column.id === "email" && (
                          <span>
                            {column.id === "email" && (
                              <MailOutlineIcon className="Icon" />
                            )}
                            {column.render("Header")}
                          </span>
                        )}
                        {column.id === "gender" && (
                          <span>
                            {column.id === "gender" && (
                              <WcIcon className="Icon" />
                            )}
                            {column.render("Header")}
                          </span>
                        )}
                        {column.id === "phoneNumber" && (
                          <span>
                            {column.id === "phoneNumber" && (
                              <LocalPhoneIcon className="Icon" />
                            )}
                            {column.render("Header")}
                          </span>
                        )}
                        {column.id === "roles" && (
                          <span>
                            {column.id === "roles" && (
                              <SupervisorAccountIcon className="Icon" />
                            )}
                            {column.render("Header")}
                          </span>
                        )}

                        {column.id !== "email" &&
                          column.id !== "phoneNumber" &&
                          column.id !== "gender" &&
                          column.id !== "roles" && (
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

          <tbody {...getTableBodyProps()} id="table-body">
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
        className="pegnation"
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

export default AllUsers;
