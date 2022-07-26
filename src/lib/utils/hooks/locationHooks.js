import { useContext } from "react";
import { STRLContext } from "../../Context";

export const useBasePath = () => {
  const {
    dependency: { dependencies },
  } = useContext(STRLContext);
  const { useLocation, useParams } = dependencies || {};

  if (typeof useLocation !== "function" || typeof useParams !== "function")
    throw Error({
      msg: "Missing required dependencies: useLocation, useParams",
    });

  const location = useLocation();
  const params = useParams();

  var pathname = location.pathname;
  if (pathname[pathname.length - 1] === "/")
    pathname = pathname.substring(0, pathname.length - 1);
  
  const baseURL = Object.values(params).reduce(
    (path, param) => path.replace("/" + param, ""),
    pathname
  );
  console.log(location.pathname, params, baseURL)
  return baseURL
};
