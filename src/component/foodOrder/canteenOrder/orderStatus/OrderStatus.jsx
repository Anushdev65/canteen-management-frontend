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
import {
  useCancelOrderMutation,
  useDeliverOrderMutation,
  useLazyGetAllOrdersQuery,
  useServeOrderMutation,
} from "../../../../services/api/foodOrder";
import "../../../../menuorder/order.css";
import MUIToast from "../../../MUIToast";

function OrderStatus({ user }) {
  const [userIdCounter, setUserIdCounter] = useState(1);
  const [userState, setuserState] = useState("");
  const [showTable, setShowTable] = useState(true);
  const [buttonStatus, setButtonStatus] = useState("onProcess");
  const [trigger, { data }] = useLazyGetAllOrdersQuery();
  const [onProcess, setOnProcess] = useState([]);
  const [served, setServed] = useState([]);
  const [delivered, setDelivered] = useState([]);
  const [expired, setExpired] = useState([]);
  const [serveOrder, { data: serveData, error: serveError }] =
    useServeOrderMutation();
  const [deliverOrder, { data: deliverData, error: deliverError }] =
    useDeliverOrderMutation();
  const [cancelOrder, { data: cancelData, error: cancelError }] =
    useCancelOrderMutation();

  useEffect(() => {
    trigger();
  }, [trigger]);

  const handleIdClicked = (id) => {
    setButtonStatus("onProcess");

    userState === id ? setuserState("") : setuserState(id);
    trigger({ _userId: id });
    setShowTable(true);
  };

  const handleButtonStatus = (label) => {
    setButtonStatus(label);
    setShowTable(true);
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
    const expired = data?.data?.results?.filter(
      (data) => data.orderStatus === "expired"
    );

    setOnProcess(onProcess);
    setServed(served);
    setExpired(expired);
    setDelivered(delivered);
  }, [data]);

  const handleServe = (id) => {
    serveOrder(id);
  };

  const handleCancel = (id) => {
    cancelOrder(id);
  };

  const handleDeliver = (id) => {
    deliverOrder(id);
  };

  const renderButton = (id) => {
    return (
      buttonStatus !== "expired" && (
        <div className="order-button">
          <React.Fragment>
            {buttonStatus === "onProcess" && (
              <Button variant="contained" onClick={() => handleServe(id)}>
                Serve
              </Button>
            )}
            {buttonStatus === "served" && (
              <Button variant="contained" onClick={() => handleDeliver(id)}>
                Deliver
              </Button>
            )}
            {(buttonStatus === "onProcess" || buttonStatus === "served") && (
              <Button variant="contained" onClick={() => handleCancel(id)}>
                Cancel
              </Button>
            )}
          </React.Fragment>
        </div>
      )
    );
  };

  const handleAllUsers = () => {
    trigger();
    setShowTable(true);
  };
  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  const renderUserData = () => {
    let filteredData = [];

    if (buttonStatus === "onProcess") {
      filteredData = onProcess || [];
    } else if (buttonStatus === "served") {
      filteredData = served || [];
    } else if (buttonStatus === "delivered") {
      filteredData = delivered || [];
    } else if (buttonStatus === "expired") {
      filteredData = expired || [];
    }

    return filteredData.map((result) => (
      <TableRow id="item-row" key={result.user.userId || result.user._id}>
        <TableCell className="item-row">{result.user.userId}</TableCell>
        <TableCell className="item-row">
          {capitalizeFirstLetter(result.user.firstName)}
        </TableCell>
        <TableCell className="item-row">
          {capitalizeFirstLetter(result.food.name)}
        </TableCell>

        <TableCell className="item-row">{renderButton(result._id)}</TableCell>
      </TableRow>
    ));
  };

  return (
    <>
      <div className="todayorder-container">
        <div className="order">
          <h3>Today's Order</h3>
          <Button id="todayorder-btn" onClick={handleAllUsers}>
            All users
          </Button>
          <div>
            {user.map((user) => (
              <button
                id="user-btn"
                key={user._id}
                variant="contained"
                onClick={() => handleIdClicked(user._id)}
              >
                {user.userId || user._id}
              </button>
            ))}
          </div>
        </div>

        <div className="section">
          <Stack className="todayorder-button" direction="row" spacing={2}>
            <Button
              variant="contained"
              onClick={() => handleButtonStatus("onProcess")}
            >
              On Process
            </Button>
            <Button
              variant="contained"
              onClick={() => handleButtonStatus("served")}
            >
              To be Served
            </Button>
            <Button
              variant="contained"
              onClick={() => handleButtonStatus("delivered")}
            >
              Delivered
            </Button>
            <Button
              variant="contained"
              onClick={() => handleButtonStatus("expired")}
            >
              Expired
            </Button>
          </Stack>
          {showTable && (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow id="tablerow">
                    <TableCell className="tablerow">Customer ID</TableCell>
                    <TableCell className="tablerow">Employee Name</TableCell>
                    <TableCell className="tablerow">Item</TableCell>

                    <TableCell className="tablerow">Actions</TableCell>
                  </TableRow>
                </TableHead>
                {/* <TableBody>{renderData()}</TableBody> */}
                <TableBody>{renderUserData()}</TableBody>
              </Table>
            </TableContainer>
          )}
        </div>
      </div>
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
      {deliverData && (
        <MUIToast
          initialValue={true}
          message={deliverData.message}
          severity="success"
        />
      )}
      {deliverError && (
        <MUIToast
          initialValue={true}
          message={deliverError.data.message}
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
    </>
  );
}

export default OrderStatus;
