import React from "react";

const MenuList = (props) => {
  const { items = [], onItemSelect, header, emptyState, style = {} } = props;

  const handleSelect = (index) => {
    if (onItemSelect) {
      onItemSelect(index);
    }
  };

  const getContent = () => {
    if (items.length <= 0) {
      return (
        <div className="container is-flex is-justify-content-center is-align-items-center" style={{ height: '100%'}}>
          <p className="is-size-5 has-text-centered is-italic has-text-weight-light">
            {emptyState}
          </p>
        </div>
      );
    }
    return (
      <div className="menu">
        {header && <p className="menu-label">{header}</p>}
        <ul className="menu-list">
          {items.map((item, index) => (
            // for key it should be something like id/uuid
            // just using idx here
            // just ignoring a tag because of the layout
            // eslint-disable-next-line jsx-a11y/anchor-is-valid
            <li onClick={() => handleSelect(index)} key={`menu-item-${index}`}>
              <a>{item}</a>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return <div className="column has-background-light" style={style}>{getContent()}</div>;
};

export default React.memo(MenuList);
