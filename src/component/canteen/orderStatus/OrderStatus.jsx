import React, { useState } from "react";
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
import "./order.css";

const tableData = [
  {
    id: 1,
    name: "Nitan Thapa",
    time: 30,
    item: "Coffee",
  },
];

const idArray = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
];

function OrderStatus() {
  const [showTable, setShowTable] = useState(false);
  const [currentButton, setCurrentButton] = useState(null);
  const [selectedID, setSelectedID] = useState(null);

  const handleButtonClick = (id) => {
    console.log(`Button with ID ${id} clicked!`);
    setSelectedID(id);
    setCurrentButton("On Process");
    setShowTable(true);
  };

  const handleButtonClicked = (label) => {
    console.log(`Button "${label}" clicked!`);
    setCurrentButton(label);
    setShowTable(true);
  };

  const handleClick = (id) => {
    console.log(`Button clicked for row with id ${id}`);
  };

  return (
    <>
      <div className="container">
        <div className="order">
          <h3>Today's Order</h3>
          <div>
            {idArray.map((id) => (
              <button
                key={id}
                variant="contained"
                onClick={() => handleButtonClick(id)}
                style={{ margin: "5px", padding: "10px", fontSize: "16px" }}
              >
                {id}
              </button>
            ))}
          </div>
        </div>

        <div className="section">
          <Stack className="button" direction="row" spacing={2}>
            <Button
              variant="contained"
              onClick={() => handleButtonClicked("On Process")}
            >
              On Process
            </Button>
            <Button
              variant="contained"
              onClick={() => handleButtonClicked("To Be Served")}
            >
              To Be Served
            </Button>
            <Button
              variant="contained"
              onClick={() => handleButtonClicked("Delivered")}
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
                    <TableCell>Elapsed Time</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tableData.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.id}</TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.item}</TableCell>
                      <TableCell>{row.time}</TableCell>
                      <TableCell>
                        {(currentButton === "On Process" ||
                          selectedID === row.id) && (
                          <>
                            <Button
                              variant="contained"
                              onClick={() => handleClick(row.id)}
                            >
                              Ready
                            </Button>

                            <Button
                              variant="contained"
                              onClick={() => handleClick(row.id)}
                            >
                              Cancel
                            </Button>
                          </>
                        )}
                        {currentButton === "To Be Served" && (
                          <>
                            <Button
                              variant="contained"
                              onClick={() => handleClick(row.id)}
                            >
                              Ready
                            </Button>
                            <Button
                              variant="contained"
                              onClick={() => handleClick(row.id)}
                            >
                              Reset
                            </Button>
                            <Button
                              variant="contained"
                              onClick={() => handleClick(row.id)}
                            >
                              Cancel
                            </Button>
                          </>
                        )}
                      </TableCell>
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
