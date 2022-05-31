import React, { useEffect, useRef, useState } from "react"
import { fileToBase64 } from "./utils/func"
import useField from "./utils/useField"

export default function MultiLangFieldImage(props) {
  const { style, className } = props
  const { editable, value, defaultValue, updateField } = useField({
    ...props,
    defaultValue: props.src,
  })

  const inputRef = useRef()
  const [inputState, setInputState] = useState({ focussed: false })

  const setValue = e => {
    const value = e.currentTarget.files[0] // Currently handling single images
    updateField(value)
  }

  const [src, setSrc] = useState(
    typeof window === "undefined" && (value || defaultValue)
  )
  useEffect(() => {
    ;(async function () {
      const src = value || defaultValue
      if (src instanceof File) setSrc(await fileToBase64(src))
      else setSrc(src)
    })()
  }, [value])

  return (
    <div className={editable ? "multi-lang-field-image-container" : ""}>
      <input
        type="file"
        ref={inputRef}
        onChange={setValue}
        style={{ height: "0", width: "0", position: "absolute" }}
        onFocus={() => setInputState({ ...inputState, focussed: true })}
        onBlur={() => setInputState({ ...inputState, focussed: false })}
      />
      <img
        src={src}
        style={{
          ...style,
          outline: inputState.focussed ? "2px solid rgba(0,0,0,0.3)" : "0",
          cursor: "pointer",
        }}
        className={className}
        onClick={() => editable && inputRef.current.click()}
      />
    </div>
  )
}

export async function resolveFileFields(data, uploadFunc) {
  if (Array.isArray(data)) {
    return await Promise.all(data.map(e => resolveFileFields(e, uploadFunc)))
  } else if (data && typeof data === "object") {
    if (data instanceof File) {
      return await uploadFunc(data)
    } else {
      for (const key in data) {
        data[key] = await resolveFileFields(data[key], uploadFunc)
      }
      return data
    }
  } else return data
}
