"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es.object.assign.js");

var _react = _interopRequireDefault(require("react"));

var _reactDataTableComponent = _interopRequireDefault(require("react-data-table-component"));

var _ti = require("react-icons/ti");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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

var _default = Table;
exports.default = _default;