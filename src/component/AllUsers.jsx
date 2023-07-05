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


export default AllUsers;
