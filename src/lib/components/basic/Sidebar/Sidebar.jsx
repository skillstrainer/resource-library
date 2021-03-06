import React, { useEffect } from "react";
import { useContext } from "react";
import { STRLContext } from "../../../Context";
import { useBasePath } from "../../../utils/hooks/locationHooks";
import SidebarItem from "./SidebarItem";

const Sidebar = ({
  className,
  setSidebarItems,
  sidebarItems = { items: [], active: 0 },
}) => {
  /*
   *
   * Loading dependencies
   */
  const strlContext = useContext(STRLContext);
  const {
    dependency: { dependencies },
  } = strlContext;

  const { useHistory, useParams } = dependencies || {};

  if (typeof useHistory !== "function")
    throw Error({
      msg: "Missing required dependencies: useHistory, useParams",
    });

  /*
   * Main
   */
  const changeCurrentItem = (index) =>
    setSidebarItems({ ...sidebarItems, active: index });
  const { sidebarActive } = useParams();

  const baseurl = useBasePath();
  const history = useHistory();

  useEffect(() => {
    var changed = false;
    for (var i = 0; i < sidebarItems.items.length; i++) {
      if (sidebarItems.items[i].url === sidebarActive) {
        changeCurrentItem(i);
        changed = true;
        break;
      }
    }
    if (!changed) changeCurrentItem(0);
  }, [sidebarActive, sidebarItems.items, history]);

  return (
    <div
      className={
        "hidden xl:block lg:w-64 shadow-xl left-0 h-screen " + className
      }
    >
      <div className="flex flex-col justify-between space-y-0 w-full ">
        {sidebarItems.items.map((item, index) =>
          !item.hidden ? (
            <SidebarItem
              name={item.name}
              Icon={item.icon}
              key={index}
              selected={index === sidebarItems.active}
              className={""}
              linkTo={`${baseurl}/${item.url}`}
              onClick={() => {
                changeCurrentItem(index);
              }}
            />
          ) : (
            <></>
          )
        )}
      </div>
    </div>
  );
};

export default Sidebar;
