import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { useCallback, useState } from "react";
import DepositModel from "./depositAmount/model/DepositModel";

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
    Header: "Deposit",
    accessor: "deposit",
    Cell: ({ row }) => {
      const [openModal, setOpenModal] = useState(false);

      const handleCloseModal = useCallback(() => {
        setOpenModal(false);
      }, []);

      const handleClick = () => {
        setOpenModal(true);
      };

      if (row.isSelected) {
        return (
          <>
            <AddCircleOutlineOutlinedIcon onClick={handleClick} />
            <DepositModel
              open={openModal}
              handleClose={handleCloseModal}
              label={"Load Fund"}
              row={row}
            />
          </>
        );
      }
    },
  },
];
