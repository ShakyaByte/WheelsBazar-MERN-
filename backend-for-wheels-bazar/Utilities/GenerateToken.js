const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  if (!process.env.JWT_SECRET) {
    console.error("❌ JWT_SECRET is not defined in environment variables!");
    throw new Error("JWT_SECRET is missing");
  }

  return jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );
};

module.exports = generateToken;
