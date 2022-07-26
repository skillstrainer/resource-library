import React from "react";
import { useContext } from "react";
import { GrStatusPlaceholder } from "react-icons/gr";
import { STRLContext } from "../../../Context";

const SidebarItem = ({
  name = "Item",
  Icon = GrStatusPlaceholder,
  selected = false,
  className,
  onClick = () => {},
  linkTo = "#",
}) => {
  const strlContext = useContext(STRLContext);
  const {
    dependency: { dependencies },
  } = strlContext;
  const { Link } = dependencies || {};

  if (Link && typeof Link !== "object")
    throw { msg: "Missing required dependency: Link" };

  return (
    <div className="flex p-0 ">
      <Link
        to={linkTo}
        onClick={onClick}
        className={`flex items-center w-full  rounded-md space-x-4 h-14 ${
          selected ? "bg-orange-light" : "hover:bg-yellow-50"
        } ${className}`}
      >
        <Icon className={`flex text-lg ml-4 items-left ${selected && ""}`} />
        <p
          className={`flex text-gray-700 font-medium text-sm font-poppins ${
            selected && ""
          }`}
        >
          {name}
        </p>
      </Link>
      <div className={` w-1 h-14 rounded-md ${selected && "bg-orange"}`} />
    </div>
  );
};

export default SidebarItem;
