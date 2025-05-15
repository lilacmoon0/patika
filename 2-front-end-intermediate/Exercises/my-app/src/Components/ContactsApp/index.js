import {useState, useEffect} from "react";
import Contacts from "./Contacts"
import Form from "./Form";

const ContactsApp = () => {
  const [contacts, setContacts] = useState([])
  useEffect(()=> {
    console.log(contacts)
  },[contacts])
  return (
    <>
      <Contacts contacts={contacts} setContacts={setContacts}></Contacts>
      <Form contacts={contacts} setContacts={setContacts} ></Form>
    </>
  );
  
}

export default ContactsApp