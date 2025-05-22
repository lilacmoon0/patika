import React from "react";

const List = ({ filtered }) => {
  return (
    <div>
      <ul>
        {filtered.map(({ fullName, phone }, index) => {
          return (
            <li key={index}>
              {" "}
              {fullName}: {phone}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default List;
