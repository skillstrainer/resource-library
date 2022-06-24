import React, { useEffect, useRef, useState } from "react";
import _ from "lodash";
import { dataURLtoFile } from "../../../utils/file";
import Modal from "../../shared/Modal";
import CapturePhoto from "./CapturePhoto";
import EditableText from "./EditableText";
import FilePreview from "./FilePreview";

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
  const fileCountRef = useRef(1);
  const getUrl = services?.getUrl || (async (val) => val);

  // State management resources
  const fileList = value || [],
    setFileList = (fileList) => onChange(fileList);
  // todo: reconsider the setting of id
  useEffect(() => {
    setFileList(
      fileList.map((f) => ({ ...f, id: fileCountRef.current++ + "" }))
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

  const [previewData, setPreviewData] = useState();

  // Photo capture
  const [isCaptureWindowOpen, setIsCaptureWindowOpen] = useState();
  const capturePhoto = () => setIsCaptureWindowOpen(true);
  const endCapturePhoto = () => setIsCaptureWindowOpen(false);

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
                onClick={async () => {
                  const source = fileItem.fileData ? "file" : "url";
                  const data =
                    fileItem.fileData || (await getUrl(fileItem.url));
                  setPreviewData({ source, data });
                }}
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
      <Modal isOpen={previewData} onClose={() => setPreviewData(null)}>
        <FilePreview
          {...previewData}
          onError={(msg) => alert("Error: " + msg)}
        />
      </Modal>

      <Modal isOpen={isCaptureWindowOpen} onClose={endCapturePhoto}>
        {isCaptureWindowOpen && (
          <CapturePhoto
            onFinish={(images) => {
              const filename = "snapshot-" + fileCountRef.current;
              setFileList([
                ...fileList,
                ...images.map((imageDataBase64) => ({
                  ___file_uploader_component: true,
                  id: fileCountRef.current++ + "",
                  name: filename,
                  fileData: dataURLtoFile(imageDataBase64, filename),
                })),
              ]);
              endCapturePhoto();
            }}
          />
        )}
      </Modal>
    </div>
  );
}

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
