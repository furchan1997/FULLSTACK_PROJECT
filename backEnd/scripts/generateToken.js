const jwt = require("jsonwebtoken");
const config = require("../config/config");

function createToken({ id, admin, key, expirationTime }) {
  const token = jwt.sign(
    {
      id,
      admin,
    },
    key,
    { expiresIn: "1h" }
  );

  return token;
}

module.exports = { createToken };
