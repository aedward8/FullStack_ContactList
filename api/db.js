const pgp = require("pg-promise")({});
//Connect to DB
const db = pgp("postgres://localhost:5432/contact_form");

const getContacts = async () => {
  return await db.any("SELECT * FROM contacts");
};

const addContact = async (first_name, last_name, phone_number, email) =>
  (
    await db.any(
      `INSERT INTO contacts (first_name,
        last_name,
        phone_number,
        email) VALUES($1,$2,$3,$4) RETURNING *`,
      [first_name, last_name, phone_number, email]
    )
  )[0];

exports.getContacts = getContacts;
exports.addContact = addContact;

// Most common way work anywhere
//module.exports = {getContacts,addContact}
