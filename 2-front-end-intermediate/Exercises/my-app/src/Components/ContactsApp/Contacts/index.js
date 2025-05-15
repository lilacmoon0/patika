import React, { useState } from "react";
import List from "./List"

const Contacts = ({contacts,setContacts}) => {
    const [search, setSearch] = useState("")


   return (
    <div> Contacts
      <br/>
      <input placeholder="Search" value={search} onChange={(e)=> setSearch(e.target.value)}></input>
      <List contacts={contacts} setContacts={setContacts} filtered={search} />
    </div>
  );
}

export default Contacts