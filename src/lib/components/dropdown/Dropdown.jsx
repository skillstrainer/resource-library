import React from "react";
import { useState, useRef, useEffect } from "react";
import { useContext } from "react";
import { STRLContext } from "../../Context";

function Dropdown(props) {
  const strlContext = useContext(STRLContext);
  const {
    dependency: { dependencies },
  } = strlContext;

  const { Link } = dependencies || {};

  const [isActive, setIsActive] = useState(false);
  const dropdownRef = useRef(null);
  const onClick = () => {
    setIsActive(!isActive);
  };

  useEffect(() => {
    const pageClickEvent = (e) => {
      if (
        dropdownRef.current !== null &&
        !dropdownRef.current.contains(e.target)
      ) {
        setIsActive(!isActive);
      }
    };

    if (isActive) {
      window.addEventListener("click", pageClickEvent);
    } else {
      window.removeEventListener("click", pageClickEvent);
    }
  }, [isActive]);

  return (
    <div className="menu-container flex flex-col items-center w-32 h-6 p-2 rounded-md font-poppins hover:shadow-md ">
      <button onClick={onClick} className="">
        <span className="menu-trigger rounded-md p-2 w-32 ">Hi User!</span>
      </button>
      <nav className={`menu mt-2 ${isActive ? "block" : "hidden"}`}>
        <ul className="">
          {props.selections.map((item) => {
            item.component = item.url ? Link : "button";
            return (
              <li className=" w-32 p-2 text-center hover:bg-gray-100 hover:text-orange-600 ">
                <item.component to={item.url} onClick={item.onClick1}>
                  {item.name}
                </item.component>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

export { Dropdown };
