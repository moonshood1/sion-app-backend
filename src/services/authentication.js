const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

const token = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const jeton = authHeader && authHeader.split(" ")[1];

  if (jeton === null)
    return res
      .status(401)
      .json({ error: true, message: "Veuillez vous identifier" })
      .end();

  jwt.verify(jeton, process.env.JWT_SECRET, async (err, a) => {
    if (err)
      return res
        .status(401)
        .json({ error: true, message: "Veuillez vous identifier" })
        .end();
    const admin = await Admin.findOne({ _id: a.id });
    req.user = admin;
    next();
  });
};

module.exports = {
  createToken,
  token,
};
