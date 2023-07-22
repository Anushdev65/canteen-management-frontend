import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";

const items = [
  { name: "Chicken", quantity: 2, price: 400 },
  { name: "Paneer", quantity: 1, price: 300 },
  { name: "Mutton", quantity: 3, price: 600 },
];

const OrderDetails = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div>
        <h2>Order Details:</h2>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Item</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.price}</TableCell>
                <TableCell>
                  <Button variant="contained" color="secondary" size="small">
                    Cancel
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={2} align="right">
                Total:
              </TableCell>
              <TableCell>
                {items.reduce(
                  (total, item) => total + item.price * item.quantity,
                  0
                )}
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Button
          variant="contained"
          color="primary"
          size="small"
          sx={{ mt: 2, ml: 1 }}
        >
          Add Item
        </Button>
        <Button
          variant="contained"
          color="primary"
          size="small"
          sx={{ mt: 2, ml: 2 }}
        >
          Submit Order
        </Button>
      </div>
    </div>
  );
};

export default OrderDetails;
