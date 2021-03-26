// Just Javascript Fetch calls
const getContacts = async () => {
  const response = await fetch("http://localhost:9002/contacts");
  // converting JSON to JS
  return response.json();
};

const addContact = async (first_name, last_name, phone_number, email) => {
  try {
    const body = { first_name, last_name, phone_number, email };
    const response = await fetch("http://localhost:9002/contacts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body), //  converts JS object to JSON string
    });
    console.log(response);
    //converts from JSON to JS
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

exports.getContacts = getContacts;
exports.addContact = addContact;
