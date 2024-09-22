const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const verify = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  try {
    const JWT_SECRET = "62173726874yh7usfdadjskfhaksjdf";

    const decoded = jwt.verify(token, JWT_SECRET);

    if (!decoded.id) {
      throw new Error("Token does not contain userId");
    }

    const user = await User.findByPk(decoded.id);

    if (!user) {
      throw new Error("User not found");
    }
    res.json({
      verify: true,
      user: user,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error });
  }
};
module.exports = { verify };
