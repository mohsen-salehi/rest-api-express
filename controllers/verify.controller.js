const verify = async (req, res) => {
  try {
    res.json({
      verify: true,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error });
  }
};
module.exports = { verify };
