import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Stack from "@mui/material/Stack";
import React, { useEffect, useState } from "react";
import { useLazyGetAllOrdersQuery } from "../../../../services/api/foodOrder";
import "./order.css";

const tableData = [
  {
    id: 1,
    name: "Nitan Thapa",
    time: 30,
    item: "Coffee",
  },
];

const userId = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
];

function OrderStatus({ user }) {
  const [showTable, setShowTable] = useState(false);
  const [currentButton, setCurrentButton] = useState(null);
  const [trigger, { data }] = useLazyGetAllOrdersQuery();
  const [onProcess, setOnProcess] = useState([]);
  const [served, setServed] = useState([]);
  const [deliverd, setDelivered] = useState([]);

  useEffect(() => {
    trigger();
  }, [trigger]);

  const handleIdClicked = (id) => {
    setCurrentButton("onProcess");
    trigger({ _userId: id });
    setShowTable(true);
  };

  const handleButtonClicked = (label) => {
    setCurrentButton(label);
    setShowTable(true);
  };

  const handleClick = (id) => {
    console.log(`Button clicked for row with id ${id}`);
  };

  useEffect(() => {
    const onProcess = data?.data?.results?.filter(
      (data) => data.orderStatus === "onProcess"
    );

    const served = data?.data?.results?.filter(
      (data) => data.orderStatus === "served"
    );
    const delivered = data?.data?.results?.filter(
      (data) => data.orderStatus === "delivered"
    );

    setOnProcess(onProcess);
    setServed(served);
    setDelivered(deliverd);
  }, [data]);

  const renderButton = (row) => {
    return (
      <React.Fragment>
        <Button variant="contained" onClick={() => handleClick(row.id)}>
          Ready
        </Button>
        {currentButton === "tobeServed" && (
          <Button variant="contained" onClick={() => handleClick(row.id)}>
            Reset
          </Button>
        )}
        <Button variant="contained" onClick={() => handleClick(row.id)}>
          Cancel
        </Button>
      </React.Fragment>
    );
  };

  return (
    <>
      <div className="container">
        <div className="order">
          <h3>Today's Order</h3>
          <div>
            {user.map((user) => (
              <button
                key={user._id}
                variant="contained"
                onClick={() => handleIdClicked(user._id)}
                style={{ margin: "5px", padding: "10px", fontSize: "16px" }}
              >
                {user._id}
              </button>
            ))}
          </div>
        </div>

        <div className="section">
          <Stack className="button" direction="row" spacing={2}>
            <Button
              variant="contained"
              onClick={() => handleButtonClicked("onProcess")}
            >
              On Process
            </Button>
            <Button
              variant="contained"
              onClick={() => handleButtonClicked("tobeServed")}
            >
              To be Served
            </Button>
            <Button
              variant="contained"
              onClick={() => handleButtonClicked("delivered")}
            >
              Delivered
            </Button>
          </Stack>
          {showTable && (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Customer ID</TableCell>
                    <TableCell>Employee Name</TableCell>
                    <TableCell>Item</TableCell>

                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data?.data?.results?.map((result) => (
                    <TableRow key={result._id}>
                      <TableCell>{result._id}</TableCell>
                      <TableCell>{result.user.firstName}</TableCell>
                      <TableCell>{result.food.name}</TableCell>

                      <TableCell>{renderButton(result)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </div>
      </div>
    </>
  );
}

export default OrderStatus;
