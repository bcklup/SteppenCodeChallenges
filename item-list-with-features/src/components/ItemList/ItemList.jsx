import React, { useCallback, useMemo, useState } from "react";
import ListItem from "./ListItem/ListItem";
import { ListActions } from "../../assets/constants";

export const ItemList = ({ data }) => {
  const [list, setList] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [modal, setModal] = useState(null);

  // Memoize due to multiple instances
  const handleItemAction = useCallback(
    (action, item, index) => {
      const newList = [...list];
      switch (action) {
        case ListActions.EDIT: {
          newList[index] = item;
          break;
        }
        case ListActions.DELETE: {
          newList.splice(index, 1);
          break;
        }
        default:
        case ListActions.CREATE: {
          newList.push(item);
          setList(newList);
          break;
        }
      }
      setList(newList);
    },
    [list]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    handleItemAction(ListActions.CREATE, inputValue);
    setInputValue("");
  };

  const ListItems = useMemo(() => {
    return (
      <ul className="menu-list">
        {list.map((item, index) => (
          <ListItem
            key={index}
            item={item}
            index={index}
            setItem={handleItemAction}
            setModal={setModal}
          />
        ))}
      </ul>
    );
  }, [list, handleItemAction]);

  return (
    <div className="container">
      <div className="column is-full">
        <div className="menu">
          <p className="menu-label">Task List</p>
          {ListItems}
          <div className="column pl-5 is-half">
            <form onSubmit={handleSubmit}>
              <input
                className="input"
                type="text"
                value={inputValue}
                placeholder="New Item"
                onChange={(e) => setInputValue(e.target.value)}
              />
            </form>
          </div>
        </div>
      </div>
      <div className={`modal ${modal !== null && "is-active"}`}>
        <div className="modal-background"></div>
        <div className="modal-content">{modal}</div>
        <button className="modal-close is-large" aria-label="close"></button>
      </div>
    </div>
  );
};
