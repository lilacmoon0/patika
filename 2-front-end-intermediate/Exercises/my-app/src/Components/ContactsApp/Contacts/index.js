import React, { useState } from "react";
import List from "./List";

const Contacts = ({ contacts, setContacts }) => {
  const [search, setSearch] = useState("");
  let filtered = contacts.filter((item) => {
    return Object.keys(item).some((keys) => {
      return item[keys]
        .toString()
        .toLowerCase()
        .includes(search.toLocaleLowerCase());
    });
  });

  return (
    <div>
      {" "}
      Contacts
      <br />
      <input
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      ></input>
      <List contacts={contacts} setContacts={setContacts} filtered={filtered} />
    </div>
  );
};

export default Contacts;
