import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  useCancelOrderMutation,
  useGetMyOrdersQuery,
  useServeOrderMutation,
} from "../../../services/api/foodOrder";
import MUIToast from "../../MUIToast";
import "../../../menuorder/myorder.css";
const OrderDetails = () => {
  const { data } = useGetMyOrdersQuery();
  const [cancelOrder, { data: cancelData, error: cancelError }] =
    useCancelOrderMutation();
  const [serveOrder, { data: serveData, error: serveError }] =
    useServeOrderMutation();
  const [onProcessOrder, setonProcessOrder] = useState(null);

  const myOrder = data?.data?.results?.filter(
    (result) => result.orderStatus !== "canceled"
  );

  useEffect(() => {
    const onProcessOrder = data?.data?.results?.find(
      (item) => item.orderStatus === "onProcess"
    );
    setonProcessOrder(onProcessOrder);
  }, [data]);

  const handleCancelOrder = (id) => {
    cancelOrder(id);
  };

  const handleServeOrder = () => {
    myOrder.forEach((order) => {
      serveOrder(order._id);
    });
  };

  console.log(myOrder);

  return (
    <>
      <div className="myorder">
        {myOrder?.length > 0 && (
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
                  {myOrder.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.food.name}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>{item.food.rate}</TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          color="secondary"
                          size="small"
                          disabled={item.orderStatus !== "onProcess"}
                          onClick={() => handleCancelOrder(item._id)}
                        >
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
                      {myOrder.reduce(
                        (total, item) => total + item.food.rate * item.quantity,
                        0
                      )}
                    </TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              <Button
                id="order-servebtn"
                variant="contained"
                color="primary"
                size="small"
                sx={{ mt: 2, ml: 2 }}
                onClick={handleServeOrder}
                disabled={!onProcessOrder}
              >
                {onProcessOrder ? "Serve Me" : "Served"}
              </Button>
            </div>
          </div>
        )}
        {serveData && (
          <MUIToast
            initialValue={true}
            message={serveData.message}
            severity="success"
          />
        )}
        {serveError && (
          <MUIToast
            initialValue={true}
            message={serveError.data.message}
            severity="error"
          />
        )}
        {cancelData && (
          <MUIToast
            initialValue={true}
            message={cancelData.message}
            severity="success"
          />
        )}
        {cancelError && (
          <MUIToast
            initialValue={true}
            message={cancelError.data.message}
            severity="error"
          />
        )}
      </div>
    </>
  );
};

export default OrderDetails;
