"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/es.object.assign.js");
var _react = _interopRequireDefault(require("react"));
var _reactDataTableComponent = _interopRequireDefault(require("react-data-table-component"));
var _ti = require("react-icons/ti");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
      minHeight: "56px"
    }
  },
  headRow: {
    style: {
      borderTopStyle: "solid",
      borderTopWidth: "1px"
    }
  },
  headCells: {
    style: {
      "&:not(:last-of-type)": {
        borderRightStyle: "solid",
        borderRightWidth: "1px"
      }
    }
  },
  rows: {
    highlightOnHoverStyle: {
      backgroundColor: "#FFEAD9",
      borderBottomColor: "#FFFFFF",
      outline: "1px solid #FFFFFF"
    }
  },
  cells: {
    style: {
      "&:not(:last-of-type)": {
        borderRightStyle: "solid",
        borderRightWidth: "1px"
      }
    }
  }
};
const Table = props => {
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "Table font-poppins"
  }, /*#__PURE__*/_react.default.createElement(_reactDataTableComponent.default, _extends({}, props, {
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

    defaultSortFieldId: 1,
    sortIcon: /*#__PURE__*/_react.default.createElement(_ti.TiArrowSortedUp, null),
    pagination: true,
    responsive: true,
    wrap: true,
    highlightOnHover: true,
    customStyles: customStyles
  })));
};
var _default = exports.default = Table;