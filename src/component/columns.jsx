import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { useCallback, useState } from "react";
import DepositModel from "./depositAmount/model/DepositModel";
import AddBusinessOutlinedIcon from "@mui/icons-material/AddBusinessOutlined";
import "../menuorder/deposit.css";
export const COLUMNS = [
  {
    Header: "First Name",
    accessor: "firstName",
  },
  {
    Header: "Last Name",
    accessor: "lastName",
  },
  {
    Header: "Email",
    accessor: "email",
  },
  {
    Header: "Gender",
    accessor: "gender",
  },
  {
    Header: "Phone Number",
    accessor: "phoneNumber",
  },
  {
    Header: "Role",
    accessor: "roles",
  },

  {
    Header: () => (
      <>
        <AddBusinessOutlinedIcon className="deposit-icon" />
        Balance
      </>
    ),
    accessor: "totalBalance",

    Cell: ({ row, state, toggleRowSelected }) => {
      const [openModal, setOpenModal] = useState(false);

      const handleCloseModal = useCallback(() => {
        setOpenModal(false);
      }, []);

      const handleClick = () => {
        if (!row.isSelected) {
          toggleRowSelected(row.id);
        }
        setOpenModal(true);
      };
      const handleFundLoadSuccess = (updatedBalance) => {
        row.original.totalBalance = updatedBalance;

        handleCloseModal();
      };
      return (
        <>
          {state.selectedRowIds[row.id] && !row.original.totalBalance && (
            <AddCircleOutlineOutlinedIcon onClick={handleClick} />
          )}
          {!row.original.totalBalance !== undefined ? (
            <span onClick={handleClick}>{row.original.totalBalance || ""}</span>
          ) : null}
          <DepositModel
            open={openModal}
            handleClose={handleCloseModal}
            label={"Load Fund"}
            row={row}
            totalBalance={row.original.totalBalance}
            onFundLoadSuccess={handleFundLoadSuccess}
          />
        </>
      );
    },
  },
];
