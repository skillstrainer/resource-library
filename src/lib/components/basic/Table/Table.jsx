import React from "react";
import DataTable from "react-data-table-component";
import { TiArrowSortedUp } from "react-icons/ti";

// const columns = [
//   {
//     id: 1,
//     name: "Course ID",
//     selector: (row) => row.CourseID,
//     sortable: true,
//     reorder: true,
//     wrap: true,
//   },
//   {
//     id: 2,
//     name: "Name",
//     selector: (row) => row.Name,
//     sortable: true,
//     reorder: true,
//     wrap: true,
//   },
//   {
//     id: 3,
//     name: "Category",
//     selector: (row) => row.Category,
//     sortable: true,
//     reorder: true,
//     wrap: true,
//   },
//   {
//     id: 4,
//     name: "Description",
//     selector: (row) => row.Description,
//     sortable: true,
//     reorder: true,
//     wrap: true,
//   },
//   //   {
//   //     cell: (row) => (
//   //       <Link to={"#"}>
//   //         <button className="btn-secondary ml-0 ">Edit</button>
//   //       </Link>
//   //     ),
//   //     width: "68px",
//   //     ignoreRowClick: true,
//   //     allowOverflow: false,
//   //     button: true,
//   //   },
//   //   {
//   //     cell: (row) => (
//   //       <Link to={"#"}>
//   //         <button className="btn-secondary ml-0 ">View</button>
//   //       </Link>
//   //     ),
//   //     width: "68px",
//   //     ignoreRowClick: true,
//   //     allowOverflow: false,
//   //     button: true,
//   //   },
// ];

const customStyles = {
  header: {
    style: {
      minHeight: "56px",
    },
  },
  headRow: {
    style: {
      borderTopStyle: "solid",
      borderTopWidth: "1px",
    },
  },
  headCells: {
    style: {
      "&:not(:last-of-type)": {
        borderRightStyle: "solid",
        borderRightWidth: "1px",
      },
    },
  },
  rows: {
    highlightOnHoverStyle: {
      backgroundColor: "#FFEAD9",
      borderBottomColor: "#FFFFFF",
      outline: "1px solid #FFFFFF",
    },
  },
  cells: {
    style: {
      "&:not(:last-of-type)": {
        borderRightStyle: "solid",
        borderRightWidth: "1px",
      },
    },
  },
};

const Table = (props) => {
  return (
    <div className="Table font-poppins">
      <DataTable
        {...props}
        //progressPending={props.progressPending}

        // paginationServer={props.paginationServer}

        // paginationTotalRows={}

        // selectableRowSelected={}
        // selectableRows

        // paginationPerPage={10}
        // paginationRowsPerPageOptions={[10, 30, 50, 100]}

        // onChangeRowsPerPage={}
        // onChangePage={}

        // onSelectedRowsChange=

        // subHeader
        // subHeaderComponent={}

        // paginationResetDefaultPage={}

        // persistTableHead

        //expandableRows
        //expandableRowsComponent={}

        defaultSortFieldId={1}
        sortIcon={<TiArrowSortedUp />}
        pagination
        responsive
        wrap
        highlightOnHover
        customStyles={customStyles}
      />
    </div>
  );
};

export default Table;
