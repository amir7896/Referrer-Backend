const express = require("express");
const dbCon = require("./config/dbCon");
const userRoutes = require("./routes/user");
const app = express();

app.use(express.json());

app.use("/api", userRoutes);

dbCon();
const PORT = process.env.PORT || 4000;
app.get("/", (req, res) => {
  res.send("Refer app");
});

app.listen(PORT, () => {
  console.log(`Server is listening on port :${PORT}`);
});
