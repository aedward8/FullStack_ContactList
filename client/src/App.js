//import logo from "./logo.svg";
import React, { useState, useEffect } from "react";
//import * as apiClient from "./apiClient";
import apiClient from "./apiClient";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form } from "react-bootstrap";

function App() {
  const [contacts, setContacts] = useState([]);

  //API get all contacts call
  const loadContacts = async () => {
    setContacts(await apiClient.getContacts());
  };

  useEffect(() => {
    // Anything in here is fired on component mount.
    loadContacts();
  }, []);
  // [] ensures that we only make one request

  return (
    <div className="App">
      <ContactList
        contacts={contacts}
        loadContacts={loadContacts}
        setContacts={setContacts}
      />
      <AddContact loadContacts={loadContacts} />
    </div>
  );
}

function ContactList({ contacts, loadContacts }) {
  const [searchLastName, setSearchLastName] = useState("");
  // delete sighting function
  const deleteContact = async (id) => {
    // create a delete fetch request
    //await apiClient.deleteContact(id);
    loadContacts();
  };

  // const searchContact = (last_name) => {
  //   // loadContacts();
  //   let filteredContacts = contacts.filter(
  //     (contact) => contact.last_name === last_name
  //   );
  //   //setContacts(filteredContacts);
  //   //loadContacts();
  // };

  // const filteredContacts = contacts.filter((contact) => {
  //   // if we have a search term
  //   if (searchLastName.length > 0) {
  //     return contact.last_name.startsWith(searchLastName);
  //   }
  //   return true;
  // });

  let filteredContacts;
  if (searchLastName.length > 0) {
    filteredContacts = contacts.filter((contact) => {
      return contact.last_name.startsWith(searchLastName);
    });
  } else {
    filteredContacts = contacts;
  }

  return (
    <>
      <div className="search">
        <h1>Search By Last Name</h1>
        <form>
          <label>Last Name</label>
          {"  "}
          <input
            type="text"
            value={searchLastName}
            onChange={(e) => {
              setSearchLastName(e.target.value);
            }}
          />
        </form>
      </div>
      <div className="contactList">
        <h1>View all our Contacts</h1>
        <table className="table table-bordered hover">
          <thead>
            <tr>
              <th>Contact ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Phone Number</th>
              <th>Email</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {filteredContacts.map(
              ({ id, first_name, last_name, phone_number, email }) => (
                <tr key={id}>
                  <td>{id}</td>
                  <td>{first_name}</td>
                  <td>{last_name}</td>
                  <td>{phone_number}</td>
                  <td>{email}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteContact(id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

function AddContact({ loadContacts }) {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [email, setEmail] = React.useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    await apiClient.addContact(firstName, lastName, phoneNumber, email);
    // refresh - with new list of contacts
    loadContacts();
    // reset form fields -> a bit clunky but it works!
    setFirstName("");
    setLastName("");
    setPhoneNumber("");
    setEmail("");
  };

  return (
    <div>
      <h1>Add a New Contact Here!</h1>
      <div className="form">
        <Form onSubmit={onSubmit}>
          <Form.Group>
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.currentTarget.value)}
              placeholder="Awesome First Name"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.currentTarget.value)}
              placeholder="Awesome Last Name"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Phone Numbers</Form.Label>
            <Form.Control
              type="text"
              value={phoneNumber}
              onChange={(e) => {
                setPhoneNumber(e.target.value);
              }}
              placeholder="415-123-4567"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="YourAwesomeEmail@mail.com"
            />
          </Form.Group>
          <Button variant="success" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default App;
