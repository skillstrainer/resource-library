import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

export const ToggleListContext = createContext();

export default function ToggleList(props) {
  const { multiple, className, style } = props;

  const [items, setItems] = useState([]);
  const itemsCount = useRef(0);
  const [currentItems, setCurrentItems] = useState([]);

  let bufferItems = [...items];
  const registerItem = () => {
    const id = itemsCount.current++ + "";
    bufferItems.push({ id });
    setItems(bufferItems);
    return id;
  };
  const unregisterItem = (id) => {
    const item = bufferItems.find((e) => e.id === id);
    bufferItems.splice(bufferItems.indexOf(item), 1);
    setItems(bufferItems);
  };

  const toggleItem = (itemId) => {
    let current = [...currentItems];
    const existingEntry = current.find((c) => c.id === itemId);

    if (existingEntry) current.splice(current.indexOf(existingEntry), 1);
    else {
      const item = items.find((e) => e.id === itemId);
      if (multiple) current.push(item);
      else current = [item];
    }

    setCurrentItems(current);
  };

  return (
    <ToggleListContext.Provider
      value={{ items: currentItems, registerItem, unregisterItem, toggleItem }}
    >
      <div className={className} style={style}>
        {props.children}
      </div>
    </ToggleListContext.Provider>
  );
}

export const ToggleListItem = (props) => {
  const toggleListCtx = useContext(ToggleListContext);
  const { items, unregisterItem, registerItem, toggleItem } = toggleListCtx;
  const { children } = props;
  const [id, setId] = useState();

  useEffect(() => {
    const id = registerItem();
    setId(id);
    return () => unregisterItem(id);
  }, []);

  const isActive = items.find((i) => i.id === id);
  const toggle = () => toggleItem(id);

  return children({ toggle, isActive });
};
