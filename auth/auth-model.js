const db = require("../database/dbConfig");

async function addUser(user) {
  const [id] = await db("users").insert(user, "id");

  return db("users")
    .where({ id })
    .first();
}

function findBy(username) {
  return db("users").where({ username });
}

module.exports = {
  addUser,
  findBy
};
