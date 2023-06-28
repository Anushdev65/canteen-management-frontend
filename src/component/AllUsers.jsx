import React, { useEffect } from "react";
import { useGetAllUsersQuery } from "../services/api/admin/auth";

const AllUsers = () => {
  const { data } = useGetAllUsersQuery();
  useEffect(() => {
    console.log(data?.data.results);
  }, [data]);
  return <div>AllUsers</div>;
};

export default AllUsers;
