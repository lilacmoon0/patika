import React from "react";

const List = ({contacts, setContacts}) => {
   return (
    <div>
        <ul>
          {
            contacts.map(({fullName, phone},index) => {
              return <li key={index}> {fullName}: {phone}</li>
            })
          }
        </ul>
    </div>
  );
}

export default List