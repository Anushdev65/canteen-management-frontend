import { ColumnFilter } from "./ColumnFilter";

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
  // {
  //   Header: "Action",
  //   Cell: (row) => (
  //     <div>
  //       <button
  //         onClick={() => {
  //           console.log(row);
  //         }}
  //       >
  //         Add
  //       </button>
  //       <button>Delete</button>
  //     </div>
  //   ),
  // },
];
