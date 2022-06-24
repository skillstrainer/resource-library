import React, { useEffect, useState } from "react";

export default function FilePreview(props) {
  const { source, data, onError } = props;
  const [frameData, setFrameData] = useState(data);

  useEffect(() => {
    (async function () {
      let frameData = data;
      if (source === "file") {
        frameData = await new Promise((res, rej) => {
          const fr = new FileReader();
          fr.onloadend = () => res(fr.result);
          fr.onerror = () => rej(false);
          fr.readAsDataURL(data);
        });
      }

      if (frameData) setFrameData(frameData);
      else {
        if (source && onError) onError("There was an error opening the file");
      }
    })();
  }, [source, data]);

  return (
    ((source === "file" && frameData) || source !== "file") && (
      <iframe
        src={frameData}
        style={{ height: "calc(100vh - 15rem)", width: "80vw" }}
      />
    )
  );
}
