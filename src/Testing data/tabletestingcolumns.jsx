import { Link } from "react-router-dom";

const columns = [
  {
    id: 1,
    name: "Course ID",
    selector: (row) => row.CourseID,
    sortable: true,
    reorder: true,
    wrap: true,
  },
  {
    id: 2,
    name: "Name",
    selector: (row) => row.Name,
    sortable: true,
    reorder: true,
    wrap: true,
  },
  {
    id: 3,
    name: "Category",
    selector: (row) => row.Category,
    sortable: true,
    reorder: true,
    wrap: true,
  },
  {
    id: 4,
    name: "Description",
    selector: (row) => row.Description,
    sortable: true,
    reorder: true,
    wrap: true,
  },
  {
    cell: (row) => (
      <Link to={"#"}>
        <button className="btn-secondary ml-0 ">Edit</button>
      </Link>
    ),
    width: "68px",
    ignoreRowClick: true,
    allowOverflow: false,
    button: true,
  },
  {
    cell: (row) => (
      <Link to={"#"}>
        <button className="btn-secondary ml-0 ">View</button>
      </Link>
    ),
    width: "68px",
    ignoreRowClick: true,
    allowOverflow: false,
    button: true,
  },
];

export default columns;
