import React, { useCallback, useEffect, useMemo, useRef } from "react";
import _ from "lodash";
import { dataURLtoFile } from "../../../utils/file";
import CapturePhoto from "./CapturePhoto";
import EditableText from "./EditableText";
import FilePreview from "./FilePreview";
import { Toast } from "../../../services/toast";

export default function FileUploader(props) {
  const {
    value,
    onChange,
    buttonText = "Upload",
    buttonProps,
    renderUploadButton,
    showCaptureButton,
    renderCaptureButton,
    fileFieldProps = {},
    pluginContext: { services = {} } = {},
  } = props;

  const fileInputRef = useRef();
  const getUrl = services?.getUrl || (async (val) => val);

  /*
   *
   *
   * File list management
   *
   *
   */
  const fileList = useMemo(() => value || [], [value]),
    setFileList = useCallback((fileList) => onChange(fileList), [onChange]);
  // todo: reconsider the setting of id
  const fileCountRef = useRef(1);
  useEffect(() => {
    setFileList(
      fileList.map((f) => ({ ...f, id: f.id || fileCountRef.current++ + "" }))
    );
  }, []);

  const updateValueList = (filesArr) => {
    setFileList(
      filesArr.map((file) => ({
        ___file_uploader_component: true,
        id: fileCountRef.current++ + "",
        name: file.name,
        fileData: file,
      }))
    );
  };
  const updateFileItem = (itemId, prop) => (value) =>
    setFileList(
      fileList.map((item) => {
        if (item.id === itemId) item[prop] = value;
        return item;
      })
    );

  const removeFileItem = (fileId) =>
    setFileList(fileList.filter((f) => f.id !== fileId));

  const clearList = () => setFileList([]);

  /*
   *
   *
   * File preview
   *
   *
   */
  const previewFile = async (fileItem) => {
    const source = fileItem.fileData ? "file" : "url";
    const data = fileItem.fileData || (await getUrl(fileItem.url));
    const previewData = { source, data };

    await Toast.prompt(FilePreview, {
      ...previewData,
      onError: (msg) => alert("Error: " + msg),
    });
  };

  /*
   *
   *
   * Photo capture
   *
   *
   */
  const capturePhoto = useCallback(async () => {
    const capturedFiles = await Toast.prompt(CapturePhotoModalContent, {});
    capturedFiles.forEach((f) => {
      const filename = "snapshot-" + fileCountRef.current;
      Object.assign(f, {
        id: fileCountRef.current + "",
        name: filename,
      });
      fileCountRef.current++;
    });

    fileList.splice(fileList.length, 0, ...capturedFiles);
    setFileList([...fileList]);
  }, [fileList, fileCountRef, setFileList]);

  return (
    <div className="mb-2">
      <div
        style={{
          width: "0",
          height: "0",
          margin: "0",
          padding: "0",
          overflow: "hidden",
        }}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={(e) => {
            if (e.target.files.length > 0) {
              // logic seems flawed
              updateValueList([
                ...(fileFieldProps.multiple ? fileList : []), // if only single file is allowed, then list should be replaced and not appended
                ...Array.from(e.target.files),
              ]);
            }
          }}
          {...(fileFieldProps || {})}
        />
      </div>
      <ul className="mb-2">
        {fileList.map((fileItem) => (
          <li
            className="flex justify-between items-center p-2 bg-gray-100 rounded text-gray-500 mb-1"
            key={fileItem.id}
          >
            <div className="flex items-center">
              <button
                type="button"
                className="px-2 flex-center"
                onClick={() => previewFile(fileItem)}
              >
                <box-icon name="show" color="gray" className="h-8" />
              </button>
              <EditableText
                value={fileItem.name}
                onFinish={updateFileItem(fileItem.id, "name")}
              />
            </div>
            <div>
              <box-icon
                {...(fileItem.url
                  ? {
                      name: "check",
                      color: "green",
                    }
                  : {
                      name: "dots-horizontal-rounded",
                      color: "gray",
                    })}
              />
              <button type="button" onClick={() => removeFileItem(fileItem.id)}>
                <box-icon name="trash" color="red" />
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="w-full flex gap-2">
        {/* Upload button */}
        {typeof renderUploadButton === "function" ? (
          renderUploadButton({ onClick: fileInputRef.current.click })
        ) : (
          <button
            onClick={() => fileInputRef.current.click()}
            className="button cta w-full flex-center"
            type="button"
            {...(buttonProps || {})}
          >
            {buttonText}
          </button>
        )}

        {/* Capture button */}
        {showCaptureButton && (
          <>
            {typeof renderCaptureButton === "function" ? (
              renderCaptureButton({
                onClick: capturePhoto,
              })
            ) : (
              <button
                onClick={capturePhoto}
                className="button cta w-full flex-center"
                type="button"
              >
                Capture photo
              </button>
            )}
          </>
        )}

        {/* Clear button */}
        {!_.isEmpty(fileList) && (
          <button
            onClick={clearList}
            className="button cta w-full flex-center"
            type="button"
          >
            Clear All
          </button>
        )}
      </div>
    </div>
  );
}

const CapturePhotoModalContent = (props) => {
  const { resolveFn } = props;

  return (
    <CapturePhoto
      onFinish={(images) => {
        // should there by a fieldProps.multiple check to prevent multiple images from being uploaded
        resolveFn(
          images.map((imageDataBase64, index) => ({
            ___file_uploader_component: true,
            fileData: dataURLtoFile(imageDataBase64, index + ""),
          }))
        );
      }}
    />
  );
};

const preprocessor = (values, pluginContext) =>
  new Promise((resolve, reject) => {
    let registered = 0;
    let completed = 0;

    const { uploadFn } = pluginContext?.services || {};
    if (!uploadFn) {
      reject({ message: "There is no upload function provided" });
      return;
    }

    const next = (ok) => {
      if (ok) {
        completed++;
        if (completed === registered) resolve(values);
      } else reject();
    };

    const rec = (item) => {
      if (!item) return;
      if (item.___file_uploader_component) {
        if (!item.url) {
          registered++;
          uploadFn(item.fileData)
            .then((url) => {
              item.url = url;
              delete item.___file_uploader_component;
              delete item.fileData;
              next(true);
            })
            .catch((err) => {
              console.error(err);
              next(false);
            });
        }
      } else {
        if (Array.isArray(item)) item.map(rec);
        else if (item && typeof item === "object") Object.values(item).map(rec);
      }
    };

    rec(values);
    if (registered === 0) resolve(values);
  });

export const FileUploaderPlugin = {
  Component: FileUploader,
  preprocessor,
};
