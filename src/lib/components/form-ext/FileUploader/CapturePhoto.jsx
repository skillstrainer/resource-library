import React, { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";

export default function CapturePhoto(props) {
  const { onFinish } = props;

  const videoRef = useRef();

  const streamRef = useRef();
  const [cameraError, setCameraError] = useState();
  const [imageData, setImageData] = useState();
  const clearImageData = () => setImageData();

  const attachUserMediaToVideo = async () => {
    let stream;
    try {
      stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });
    } catch (err) {
      console.log(err);
    }
    if (stream) {
      videoRef.current.srcObject = stream;
    } else setCameraError({ msg: "Can not access camera" });

    streamRef.current = stream;
  };

  const capture = () => {
    const canvas = document.createElement("canvas");
    canvas.width = 1080;
    canvas.height = 720;
    canvas
      .getContext("2d")
      .drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    let imageData = canvas.toDataURL("image/jpeg");
    setImageData(imageData);
  };

  const finish = () => {
    if (onFinish) onFinish([imageData]);
  };

  useEffect(() => {
    attachUserMediaToVideo();

    // shutting down camera
    return () => {
      if (streamRef.current)
        streamRef.current.getTracks().forEach((track) => track.stop());
    };
  }, []);

  return (
    <div>
      <div>
        <div className="capture-video flex-center mb-5">
          <video
            className="w-full h-full md:h-unset"
            style={{ display: imageData ? "none" : "block" }}
            ref={videoRef}
            autoPlay
          />
          <img
            src={imageData}
            style={{
              maxHeight: "100%",
              maxWidth: "100%",
              display: imageData ? "block" : "none",
            }}
          />
        </div>
        {imageData ? (
          <div className="flex">
            <button onClick={clearImageData} className="button w-1/2">
              Take another
            </button>
            <button onClick={finish} className="button w-1/2 ml-3">
              Finish
            </button>
          </div>
        ) : (
          <button onClick={capture} className="button w-full">
            Capture
          </button>
        )}
      </div>
    </div>
  );
}
