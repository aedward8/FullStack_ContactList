const pgp = require("pg-promise")({});
//Connect to DB
const db = pgp("postgres://localhost:5432/contact_form");

const getContacts = async () => {
  return await db.any("SELECT * FROM contacts");
};

exports.getContacts = getContacts;
