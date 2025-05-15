import { useState, useEffect } from "react";

const Form = ({ contacts, setContacts }) => {
  const [form, setForm] = useState({ fullName: "", phone: "" });
  useEffect(() => {
    setForm({ fullName: "", phone: "" });
  }, [contacts]);
  const onEvent = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    if (form.fullName === "" || form.phone === "") {
      e.preventDefault();
      return false;
    }

    e.preventDefault();

    setContacts([...contacts, form]);

    return console.log(form);
  };
  return (
    <form>
      Form
      <br />
      <input
        onChange={onEvent}
        name="fullName"
        placeholder="Full Name"
        value={form.fullName}
      ></input>
      <br />
      <input
        onChange={onEvent}
        name="phone"
        placeholder="Phone Number"
        value={form.phone}
      ></input>
      <br />
      <button onClick={onSubmit}>Add</button>
    </form>
  );
};

export default Form;

/*  nereye geçtiğimi görüyon muu
yok ben burdayım lol takip etmeyi kapadım 
tmamm seni seviyomm 
bende seni seviyorumm
      */
