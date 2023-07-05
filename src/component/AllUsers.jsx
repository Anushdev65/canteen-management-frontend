<<<<<<< HEAD
import React, { useEffect, useState, useMemo } from "react";
import "./table.css";
import { COLUMNS } from "./columns";
import { useTable, useSortBy, usePagination } from "react-table";
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

  useEffect(() => {
    trigger({ _page: 1 });
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    prepareRow,
  } = useTable(
    {
      columns,
      data: tableData,
    },
    useSortBy,
    usePagination
  );

  // useEffect(() => {
  //   console.log("data test");
  //   console.log(data);
  // }, [data]);

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
      <div>
        <button onClick={() => trigger({ _page: 1 })}>Previous</button>
        <button onClick={() => trigger({ _page: 2 })}> Next</button>
      </div>
    </>
  );
};
=======
import React, { useEffect, useState } from "react";
import { useGetAllUsersQuery } from "../services/api/admin/auth";
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import Checkbox from '@mui/material/Checkbox';
const AllUsers = () => {


  const { data } = useGetAllUsersQuery();
  useEffect(() => {

    console.log(data?.data.results);
  }, [data]);


  return (
    <>
      <div className="table-container">

      </div>
    </>

  )
}

>>>>>>> 3352ce298bf15e7b10c3a1693dbe86c394334d72

export default AllUsers;
