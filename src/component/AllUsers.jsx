import React, { useEffect, useState, useMemo } from "react";
import "./table.css";
import { COLUMNS } from "./columns";
import { useTable, useSortBy, usePagination, useRowSelect } from "react-table";
import { Checkbox } from "./Checkbox";

import {
  useGetAllUsersQuery,
  useLazyGetAllUsersQuery,
} from "../services/api/admin/auth";
// import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, Checkbox } from '@mui/material'

const AllUsers = () => {
  const columns = useMemo(() => COLUMNS, []);
  const [trigger, { data }] = useLazyGetAllUsersQuery();
  // const { data } = useGetAllUsersQuery();
  const tableData = useMemo(() => data?.data?.results || [], [data]);

  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    trigger({ _page: 1, _brake: 13 });
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    page,
    nextPage,
    previousPage,
    prepareRow,
    selectedFlatRows,
  } = useTable(
    {
      columns,
      data: tableData,
      initialState: {
        pageSize: 15,
      },
    },
    useSortBy,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        {
          id: "selection",
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <Checkbox {...getToggleAllRowsSelectedProps()} />
          ),
          Cell: ({ row }) => <Checkbox {...row.getToggleRowSelectedProps()} />,
        },
        ...columns,
      ]);
    }
  );

  useEffect(() => {
    console.log(selectedFlatRows);
  }, [selectedFlatRows]);

  const firstPageRows = rows.slice(0, 10);
  // useEffect(() => {
  //   console.log("data test");
  //   console.log(data);
  // }, [data]);

  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔽 "
                        : " 🔼 "
                      : ""}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {firstPageRows.map((row) => {
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
      <div>
        <button onClick={() => trigger({ _page: 1 })}>Previous</button>
        <button onClick={() => trigger({ _page: 2 })}> Next</button>
      </div>
      <pre>
        <code>
          {JSON.stringify(
            {
              selectedFlatRows: selectedFlatRows.map((row) => row.original),
            },
            null,
            2
          )}
        </code>
      </pre>
    </>
  );
};

export default AllUsers;
