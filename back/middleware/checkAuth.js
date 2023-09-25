const jwt = require("jsonwebtoken");
require("dotenv").config();

// module.exports = (req, res, next) => {
//     try {
//         const token = req.headers.Authorization.split(" ")[1];
//         console.log(token);
//         const decoded = jwt.verify(token, process.env.JWT_KEY);
//         req.userData = decoded;
//         next()
//     } catch (error) {
//         return res.status(401).json({
//             Message: "Auth Failed"
//         })
//     }
// }

const newToken = (user) => {
  const payload = {
    username: user.username,
    _id: user._id,
  };
  return jwt.sign(payload, process.env.JWT_KEY, {
    expiresIn: "10d",
  });
};

const verifyToken = (token) =>
  new Promise((resolve, reject) => {
    jwt.verify(token, SECRET_KEY, (err, payload) => {
      if (err) return reject(err);
      resolve(payload);
    });
  });

// middleware
const authenticateUser = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: "token must be included" });
  }

  const token = req.headers.authorization;
  let payload;
  try {
    payload = await verifyToken(token);
  } catch (e) {
    return res.status(401).json({ message: "token is invalid" });
  }

  const user = await UserModel.findById(payload._id)
    .select("-password")
    .lean()
    .exec();

  if (!user) {
    return res.status(401).json({ message: "user is not found" });
  }

  req.user = user;
  next();
};

module.exports = { authenticateUser, verifyToken, newToken };
