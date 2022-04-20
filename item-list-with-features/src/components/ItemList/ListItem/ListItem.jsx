/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";

import { ListActions } from "../../../assets/constants";
import "./ListItem.scss";

const ListItem = ({ item, index, setItem, setModal }) => {
  const [editMode, setEditMode] = useState();
  const [inputValue, setInputValue] = useState("");

  const handleEdit = () => {
    setInputValue(item);
    setEditMode(true);
  };

  const handleDelete = () => {
    setModal(modalContent);
    // setItem(ListActions.DELETE, '', index);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setItem(ListActions.EDIT, inputValue, index);
    setEditMode(false);
  };

  const modalContent = (
    <div className="card mx-6">
      <header className="card-header">
        <p className="card-header-title pb-3">Confirmation</p>
      </header>
      <div className="card-content pt-0">
        <div className="content">
          Are you sure you want to delete this item?
        </div>
      </div>
      <footer className="card-footer">
        <a
          onClick={() => {
            setItem(ListActions.DELETE, "", index);
            setModal(null);
          }}
          className="card-footer-item"
        >
          Confirm
        </a>
        <a className="card-footer-item" onClick={() => setModal(null)}>
          Cancel
        </a>
      </footer>
    </div>
  );

  return (
    <li key={`list-item-${index}`}>
      {editMode ? (
        <div className="column pl-5 is-half">
          <form onSubmit={handleSubmit}>
            <input
              className="input is-small"
              type="text"
              value={inputValue}
              placeholder="New Item"
              onChange={(e) => setInputValue(e.target.value)}
            />
          </form>
        </div>
      ) : (
        <a className="columns mb-2 is-flex has-align-items-center has-justify-content-center list-container">
          <div className="column p-0 is-flex is-flex-direction-row is-align-items-center hover-buttons-container">
            <button
              className={`button is-small hover-button`}
              onClick={handleEdit}
            >
              Edit
            </button>
            <button
              className="button is-small hover-button"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
          <div className="column is-full p-3 list-text">{item}</div>
        </a>
      )}
    </li>
  );
};

export default React.memo(ListItem); // Memoize due to multiple instances
