import { useState, useMemo, useCallback } from "react";
import MenuList from "./MenuList/MenuList";

export const TwoPaneList = ({ data }) => {
  const [selectedTitle, setSelectedTitle] = useState(null);

  const getTitles = useMemo(() => {
    return data.map((d) => d.title);
  }, [data]);

  const getTitleContent = useMemo(() => {
    if (selectedTitle === null) return [];
    return data[selectedTitle].content;
  }, [data, selectedTitle])

  const handleSelectTitle = useCallback((index) => {
    setSelectedTitle(index);
  }, []);


  return (
    <div className="container">
      <div className="columns is-centered is-3">
        <MenuList
          items={getTitles}
          header="Titles"
          onItemSelect={handleSelectTitle}
          emptyState="No Titles"
          style={{ borderRight: '1px solid lightgray' }}
        />
        <MenuList
          items={getTitleContent}
          header="Content"
          emptyState="Please select a title from the left"
        />
      </div>
    </div>
  );
};
