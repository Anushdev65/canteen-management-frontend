import React, { useEffect, useMemo, useState } from "react";
import { usePagination, useSortBy, useTable } from "react-table";
import { useLazyGetAllUsersQuery } from "../services/api/admin/auth";
import { COLUMNS } from "./columns";
import "./table.css";

const AllUsers = () => {
  const columns = useMemo(() => COLUMNS, []);
  const [trigger, { data }] = useLazyGetAllUsersQuery();
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const tableData = useMemo(
    () => data?.data?.results || [],
    [data?.data?.results]
  );

  useEffect(() => {
    trigger({ _page: currentPage, _brake: rowsPerPage });
  }, [currentPage, rowsPerPage]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  const { getTableProps, getTableBodyProps, headerGroups, page, prepareRow } =
    useTable(
      {
        columns,
        data: tableData,
        initialState: { pageSize: rowsPerPage },
      },
      useSortBy,
      usePagination
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

  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getFooterGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? "down"
                        : "up"
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
      <div
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
