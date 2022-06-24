import React from "react";
import { useState } from "react";

export default function EditableText(props) {
  const { value, onFinish, spanClass, inputClass, buttonClass } = props;

  const [tempValue, setTempValue] = useState(value);
  const [editing, setEditing] = useState();

  const finish = () => {
    setEditing(false);
    onFinish(tempValue);
  };

  return (
    <div>
      {!editing ? (
        <div className="flex items-center">
          <span
            className={`text-gray-400 ${spanClass || ""}`}
            style={{ marginRight: "0.5rem" }}
          >
            {value}
          </span>
          <button
            type="button"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={() => setEditing(true)}
          >
            <box-icon name="edit" color="gray" />
          </button>
        </div>
      ) : (
        <div className="flex items-center">
          <input
            type="text"
            onChange={(e) => setTempValue(e.target.value)}
            className={`input ${inputClass}`}
            onKeyPress={(e) => e.key == "Enter" && finish()}
            value={tempValue}
          />
          <button
            type="button"
            onClick={finish}
            className={`button ${buttonClass}`}
          >
            Done
          </button>
        </div>
      )}
    </div>
  );
}
