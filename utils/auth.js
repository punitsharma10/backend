const jwt = require("jsonwebtoken");



module.exports = (req, res, next) => {

 try {

  const token = req.headers.authorization.split(" ")[1];

  const dToken = jwt.verify(token, "masai-school");

  req.userData = { userId: dToken.userId };

  next();

 } catch (error) {

  res.status(401).json({ message: "Authentication failed please login again." });

 }

};