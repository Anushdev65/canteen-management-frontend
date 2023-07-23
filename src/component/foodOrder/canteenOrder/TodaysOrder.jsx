import React, { useEffect, useState } from "react";
import OrderStatus from "./orderStatus/OrderStatus";
import { useGetAllOrdersQuery } from "../../../services/api/foodOrder";

const TodaysOrder = () => {
  const { data } = useGetAllOrdersQuery();
  const [user, setUser] = useState([]);
  useEffect(() => {
    if (data?.data?.results) {
      const uniqueUsers = data.data.results.reduce((acc, result) => {
        const tempUser = result.user;

        const isExistingUser = acc.some((user) => user._id === tempUser._id);

        if (!isExistingUser) {
          acc.push(tempUser);
        }

        return acc;
      }, []);

      setUser(uniqueUsers);
    }
  }, [data]);

  return <OrderStatus user={user} />;
};

export default TodaysOrder;
