import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { Button } from "@mui/material";
import {
  createTable,
  getCoreRowModel,
  getExpandedRowModel,
  useTableInstance,
} from "@tanstack/react-table";
import dayjs from "dayjs";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../../../menuorder/menutable.css";
import { useGetAllFoodItemQuery } from "../../../services/api/canteen/foodItem";
import { useGetAllFoodCategoryQuery } from "../../../services/api/canteen/foodcategory";
import { useOrderFoodMutation } from "../../../services/api/foodOrder";
import MUILoading from "../../MUILoading";
import MUIToast from "../../MUIToast";
import ImageModel from "../popModel/ImageModel";

const table = createTable();

const EditableCell = ({ getValue, instance, column, row }) => {
  const initialValue = getValue();
  const [value, setValue] = useState(initialValue || "");
  const user = useSelector((state) => state.auth.user);

  const handleBlur = () => {
    instance.options.meta.updateData(row, column.id, value);
  };

  if (column.id === "quantity" && !row.getCanExpand() && !row.originalSubRows)
    return (
      <input
        type="number"
        value={value}
        min={0}
        className="food-quantity"
        onChange={(e) => {
          setValue(e.target.value);
        }}
        onBlur={handleBlur}
      />
    );
  return <div>{value} </div>;
};

const defaultColumn = {
  cell: (props) => <EditableCell {...props} />,
};

const MenuTable = () => {
  const selectedItem = [];
  const [openImageModal, setOpenImageModal] = useState(false);
  const [imgSrc, setImgSrc] = useState("");
  const handleCloseImageModal = useCallback(() => {
    setOpenImageModal(false);
  }, []);

  const handleImageEnlarge = (imgSrc) => {
    setOpenImageModal(true);
    setImgSrc(imgSrc);
  };
  const { data: foodItem } = useGetAllFoodItemQuery();
  const { data: category } = useGetAllFoodCategoryQuery();
  const [expanded, setExpanded] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const [totalAmount, settotalAmount] = useState(0);
  const [orderFood, { data, isSuccess, error, isLoading }] =
    useOrderFoodMutation();
  const columns = useMemo(
    () => [
      table.createDataColumn("category", {
        id: "Item",
        header: (props) => (
          <>
            <button
              className="menu-button"
              type="button"
              style={{ cursor: "pointer" }}
              onClick={props.instance.getToggleAllRowsExpandedHandler()}
            >
              {props.instance.getIsAllRowsExpanded() ? (
                <KeyboardDoubleArrowDownIcon className="menu-icon" />
              ) : (
                <KeyboardDoubleArrowRightIcon className="menu-icon" />
              )}
            </button>
            Item
          </>
        ),
        cell: (props) => {
          return (
            <div style={{ paddingLeft: `${props.row.depth * 2}rem` }}>
              {props.row.getCanExpand() ? (
                <button
                  className="menu-button"
                  type="button"
                  style={{ cursor: "pointer" }}
                  onClick={props.row.getToggleExpandedHandler()}
                >
                  {props.row.getIsExpanded() ? (
                    <KeyboardArrowDownIcon className="menu-icon" />
                  ) : (
                    <KeyboardArrowRightIcon className="menu-icon" />
                  )}
                </button>
              ) : (
                ""
              )}

              {props.row.depth === 0 ? (
                <>
                  <strong>(Category)</strong> {props.getValue()}
                </>
              ) : (
                props.getValue()
              )}
            </div>
          );
        },
      }),
      table.createDataColumn("foodImage", {
        id: "Img",
        cell: (props) => {
          if (!props.row.getCanExpand() && !props.row.originalSubRows)
            return (
              <img
                src={props.row.original.foodImage}
                alt=""
                height={30}
                width={60}
                className="food-image"
                onClick={() => handleImageEnlarge(props.row.original.foodImage)}
              />
            );
        },
      }),
      table.createDataColumn("availableTime.from", {
        id: "Available Time",
        cell: (props) => {
          if (!props.row.getCanExpand() && !props.row.originalSubRows)
            return (
              <div className="available-time">
                {dayjs(props.row.original.availableTime.from).format("HH:mm A")}
                {" -"}
                {dayjs(props.row.original.availableTime.to).format("HH:mm A")}
              </div>
            );
        },
      }),

      table.createDataColumn("rate", {
        id: "Rate",
        header: <div className="header-cell">Rate</div>,
        cell: (props) => (
          <div className="avl-quantity-column">{props.getValue()}</div>
        ),
      }),

      table.createDataColumn("discountedRate", {
        id: "Sub rate",
        header: <div className="header-cell">Sub rate</div>,
        cell: (props) => (
          <div className="avl-quantity-column">{props.getValue()}</div>
        ),
      }),
      table.createDataColumn("initialQuantity", {
        id: "Int Quantity",
        header: <div className="header-cell">Int Quantity</div>,
        cell: (props) => (
          <div className="avl-quantity-column">{props.getValue()}</div>
        ),
      }),

      table.createDataColumn("availableQuantity", {
        id: "avlQuantity",
        header: <div className="header-cell">Avl Quantity</div>,
        cell: (props) => (
          <div className="avl-quantity-column">{props.getValue()}</div>
        ),
      }),

      table.createDataColumn("quantity", {
        id: "quantity",
        header: "Quantity",
      }),
    ],
    []
  );

  const filteredResults = useMemo(() => {
    return category?.data?.results?.map((category) => {
      const matchingResults = foodItem?.data?.results
        .filter((result) => {
          // console.log(result);
          return result.category._id === category._id;
        })
        .map((result) => {
          return {
            ...result,
            category: result.name,
          };
        });

      return {
        category: category.name,
        foodImage: "",
        availableTime: "",
        rate: "",
        discountedRate: "",
        initialQuantity: "",
        availableQuantity: "",
        subRows: matchingResults?.length === 0 ? [] : matchingResults,
      };
    });
  }, [category?.data?.results, foodItem?.data?.results]);

  const tableData = useMemo(() => filteredResults || [], [filteredResults]);

  const instance = useTableInstance(table, {
    data: tableData,
    columns,
    defaultColumn,
    meta: {
      updateData: (row, columnId, value) => {
        handleChange(value, row);
      },
    },
    state: {
      expanded,
    },
    getSubRows: (row) => row.subRows,
    onExpandedChange: setExpanded,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
  });

  const handleChange = (value, row) => {
    const rowIncluded =
      selectedItem.length > 0
        ? selectedItem.filter((item) => item.foodItem._id === row.original._id)
        : [];

    if (rowIncluded.length) {
      selectedItem.forEach((item) => {
        if (item?.foodItem._id === row.original._id) item.quantity = value;
      });
    } else if (!rowIncluded.length) {
      selectedItem.push({ foodItem: row.original, quantity: value });
      // settotalAmount(row.original.rate * value);
    }
    const updatedAmount = selectedItem.reduce(
      (sum, item) => sum + item.foodItem.rate * item.quantity,
      0
    );

    // settotalAmount(updatedAmount);
  };

  const handleCloseModal = useCallback(() => {
    setOpenModal(false);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalOrder = [
      ...selectedItem?.map((item) => ({
        food: item.foodItem,
        quantity: item.quantity,
      })),
    ];

    orderFood(finalOrder);
  };

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        navigate("/food-myorder");
      }, 3000);
    }
  }, [isSuccess]);

  return (
    <>
      {isLoading || data ? (
        <MUILoading />
      ) : (
        <div>
          <ImageModel
            open={openImageModal}
            handleClose={handleCloseImageModal}
            imgSrc={imgSrc}
          />
          <table className="menutable-container">
            <thead>
              {instance.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder ? null : header.renderHeader()}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {instance.getRowModel().rows.map((row) => (
                <tr key={row.id} className={`depth-${row.depth} custom-tr`}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>{cell.renderCell()}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <Button
            id="order-btn"
            onClick={handleSubmit}
            // disabled={totalAmount > 0 ? false : true}
          >
            {totalAmount > 0 ? `Rs: ${totalAmount}` : "Place order"}
          </Button>
        </div>
      )}

      {data && (
        <MUIToast
          initialValue={true}
          message={data.message}
          severity="success"
        />
      )}
      {error && (
        <MUIToast
          initialValue={true}
          message={error.data.message}
          severity="error"
        />
      )}
    </>
  );
};

export default MenuTable;
