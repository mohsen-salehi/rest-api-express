const express = require("express");
const cors = require("cors");
const sequelize = require("./config/database");
const userRoutes = require("./routes/user.routes");
const itemRoutes = require("./routes/item.routes");
const verifyRoute = require("./routes/verify.routes");

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.use("/api", userRoutes);
app.use("/api", itemRoutes);
app.use("/api", verifyRoute);

// همگام‌سازی با پایگاه داده
sequelize.sync().then(() => {
  console.log("Database synchronized");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
