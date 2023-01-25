import { AccordionItem } from "../shared/AccordionItem";
import _ from "lodash";
import React, { useMemo } from "react";
import Field from "./Field";
import SerialableListItem from "./Section/SerialableListItem";
import ToggleList, { ToggleListItem } from "./ToggleList";
import { resolveFieldProps } from "./utils";
import FormErrors from "./FormErrors";

const FormSection = (props) => {
  const { fields } = props;
  return Object.keys(fields).map((_key) => (
    <FormSectionUnit {...{ ...props, _key }} />
  ));
};

const FormSectionUnit = (props) => {
  const { fields, formProps, prefix } = props;
  let { _key: key } = props;
  const { setFieldValue, values } = formProps;

  const fieldProto = fields[key];
  if (prefix) key = prefix + "." + key;
  const fieldValue = _.get(values, key);
  const repeatLength = (fieldValue && fieldValue.length) || 0;

  const {
    repeat,
    hide,
    insertable,
    insertableProps,
    collapsible,
    collapsibleProps,
    serialable,
    className,
    label,
    style,
    required,
  } = resolveFieldProps(fieldProto, key, fieldValue);

  const labelComponent = (
    <div className={`block text-sm font-medium text-japanese_indigo`}>
      {label} {required && <span className="text-red-600">*</span>}
      <FormErrors _key={key} formProps={formProps} />
    </div>
  );

  if (hide) return null;

  let content;

  if (repeat) {
    // Field is a list

    // LIST UTILS START
    const insert = () => {
      let fieldValue = _.get(values, key);
      if (fieldValue) {
        setFieldValue(key, [...fieldValue, ""]);
      } else setFieldValue(key, [""]);
    };

    const remove = (index) => {
      let fieldValue = _.get(values, key).filter((e, idx) => idx !== index);
      if (!fieldValue.length) fieldValue = undefined;
      setFieldValue(key, fieldValue);
    };

    const move = (position, vector) => {
      if (
        position + vector >= 0 &&
        position + vector <= fieldValue.length - 1
      ) {
        const list = fieldValue;
        const item = list.splice(position, 1)[0];
        list.splice(position + vector, 0, item);
        setFieldValue(key, [...list]);
      }
    };
    // LIST UTILS END

    content = (
      <>
        {}
        <ToggleList>
          {/* Insert button */}
          {insertable && (
            <button
              type="button"
              className={`btn-primary mt-3 mb-3 ${
                insertableProps?.button?.className || ""
              }`}
              onClick={() => insert()}
            >
              {insertableProps?.button?.label || "Insert"}
            </button>
          )}

          {/* List items */}
          {new Array(repeatLength).fill("").map((_, index) => {
            const itemName = `${key}[${index}]`;
            const field = resolveFieldProps(
              fieldProto,
              itemName,
              fieldValue && fieldValue[index]
            );
            const { repeatClassName, repeatableStyle } = field;

            // wrapListItem formats the list items based on the list configuration
            return wrapListItem({
              key: index + "",
              serialable,
              seriableItemProps: {
                index,
                moveFn: move,
                className: repeatClassName,
                style: repeatableStyle || {},
              },
              collapsible,
              collapsibleItemProps:
                (collapsible && {
                  title: (fieldValue &&
                    fieldValue[index] &&
                    collapsibleProps.title(fieldValue[index])) || (
                    <span className="i text-gray-500">
                      {collapsibleProps.emptyTitle || "Untitled"}
                    </span>
                  ),
                  className: repeatClassName,
                }) ||
                {},
              children: (
                <>
                  {field.type !== "hidden" ? (
                    <div className="form-section">
                      <div className="w-full flex justify-end items-center">
                        <button
                          className="btn-danger"
                          style={{
                            padding: "0.25rem 0.5rem",
                          }}
                          onClick={() => remove(index)}
                          type={"button"}
                        >
                          <box-icon name="trash" color="#fff" size="sm" />{" "}
                          <span className="ml-1">Remove</span>
                        </button>
                      </div>
                      <div className="flex flex-col w-full">
                        <Field
                          formProps={formProps}
                          field={field}
                          name={itemName}
                        />
                        <FormErrors
                          _key={`${key}.${index}`}
                          formProps={formProps}
                        />
                      </div>
                    </div>
                  ) : (
                    <Field
                      formProps={formProps}
                      field={field}
                      name={itemName}
                    />
                  )}
                </>
              ),
            });
          })}
        </ToggleList>
      </>
    );

    content = (
      <>
        {labelComponent}
        {content}
      </>
    );
  } else {
    // Field is not a list
    const field = resolveFieldProps(fieldProto, key, fieldValue);

    if (field.type === "hidden")
      content = <Field formProps={formProps} field={field} name={key} />;
    else
      content = (
        <>
          {labelComponent}
          <div
            className={
              "form-field " +
              (className || "") +
              " " +
              ((field.type === "grapes-sections" && "w-full") || "")
            }
            style={{
              ...(style || {}),
            }}
          >
            <div className={"flex flex-col"}>
              <Field formProps={formProps} field={field} name={key} />
            </div>
          </div>
        </>
      );
  }

  return <div className="my-2">{content}</div>;
};

const ToggleListWrapper = (props) => (
  <ToggleListItem>
    {(itemProps) => (
      <AccordionItem {...itemProps} title={props.title}>
        {props.children}
      </AccordionItem>
    )}
  </ToggleListItem>
);

const wrapListItem = ({
  serialable,
  serialableItemProps,
  collapsible,
  collapsibleItemProps,
  children,
}) => {
  const collapsibleItem = collapsible ? (
    <ToggleListWrapper {...collapsibleItemProps}>{children}</ToggleListWrapper>
  ) : (
    <div>{children}</div>
  );
  return serialable ? (
    <SerialableListItem {...serialableItemProps}>
      {collapsibleItem}
    </SerialableListItem>
  ) : (
    <div>{collapsibleItem}</div>
  );
};

export default FormSection;
