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
  const {
    dependency: { dependencies },
  } = useContext(STRLContext);
  const { Link } = dependencies || {};

  if (typeof Link !== "function")
    throw { msg: "Missing required dependency: Link" };

  return (
    <div className="flex">
      <Link
        to={linkTo}
        onClick={onClick}
        className={`flex no-underline p-3 w-52 pb-5 h-14 ${
          selected && "bg-gray rounded-lg"
        } ${className}`}
      >
        <Icon
          className={`text-3xl mx-1 text-gray-dark ${
            selected && "text-orange"
          }`}
        />
        <p
          className={`flex items-center justify-center mt-3 ml-2 font-medium text-sm text-gray-dark ${
            selected && "text-indigo"
          }`}
        >
          {name}
        </p>
      </Link>
      {selected && <div className="mt-4.5 ml-3 bg-orange w-1.5 h-14" />}
    </div>
  );
};

export default SidebarItem;
