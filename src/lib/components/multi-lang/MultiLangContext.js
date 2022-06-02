import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Subject } from "rxjs";
import _ from "lodash";
import { resolveFileFields } from "./MultiLangFieldImage";
import { defaultUploadFn } from "./utils/func";
import { STRLContext } from "../../Context";

export const MultiLangContext = createContext();

export default function MultiLangContextProvider(props) {
  const {
    multiLang: { publishMarketingWebsite },
  } = useContext(STRLContext);
  const {
    initialData,
    isInEditableMode,
    loadContentFn,
    submitContentFn,
    enabled,
    uploadFn,
  } = props;
  const submitSignal = useRef(new Subject());

  /*
  *
  *
  Handling data
  *
  *
  */
  const [data, _setData] = useState(initialData);

  const [changesSaved, setChangesSaved] = useState(true);
  const setData = (key, value, actionObj) => {
    const actionType = actionObj && actionObj.action && actionObj.action.type;
    data[key] = value;
    _setData({ ...data });
    if (actionType !== "content.load") setChangesSaved(false);
  };

  /*
  *
  *
  Handling submissions requests from multiple forms (multi lang bodies)
  *
  *
  */
  const reqQueue = useRef({});
  const queueErrors = useRef({});
  const [submittingContent, setSubmittingContent] = useState(null);

  const pushReq = (key) => {
    if (_.isEmpty(reqQueue.current)) {
      // Queue is starting
      setSubmittingContent(true);
    }
    reqQueue.current[key] = true;
  };
  const popReq = (key) => {
    delete reqQueue.current[key];
    if (_.isEmpty(reqQueue.current)) {
      // Queue is completed
      setSubmittingContent(false);

      // Handle queue errors
      if (Object.values(queueErrors.current).length > 0)
        alert("An error occurred while submitting some data. Please try again");
      else setChangesSaved(true);
    }
  };

  // When queue is complete, submittingContent is changed to false
  useEffect(() => {
    if (submittingContent === false) alert("Content submitted successfully!");
  }, [submittingContent]);

  /*
  *
  *
  Submission and fetching methods for multi lang bodies to consume
  *
  *
  */
  const loadContent = ({ key }) =>
    new Promise((res, rej) => loadContentFn({ key }, res, rej));

  const submitContent = ({ key, content, id }) => {
    queueErrors.current = {};
    pushReq(key);
    return new Promise(async (res, rej) => {
      content = await resolveFileFields(content, uploadFn || defaultUploadFn);
      return await submitContentFn({ key, content, id }, res, rej);
    })
      .catch((err) => {
        console.log(err);
        queueErrors.current[key] = err;
      })
      .then((res) => {
        popReq(key);
        return res;
      });
  };

  // Submission trigger
  const submit = () => submitSignal.current.next(true);

  /*
  *
  *
  Debugging utilities
  *
  *
  */
  if (typeof window !== "undefined")
    window.MLState = () => console.log({ changesSaved });

  /*
  *
  *
  View
  *
  *
  */
  return (
    <MultiLangContext.Provider
      value={{
        loadContent,
        submitContent,
        submitSignal: submitSignal.current,
        submit,
        editable: enabled,
        isInEditableMode,
        data,
        setData,
        changesSaved,
        publishChanges: publishMarketingWebsite,
      }}
    >
      <div className={`toast loading ${submittingContent ? "show" : "hide"}`}>
        Submitting data...
      </div>
      {props.children}
    </MultiLangContext.Provider>
  );
}
