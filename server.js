const express = require("express");
const { sequelize } = require("./models");
const routes = require("./routes");
const cors = require("cors");

const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use("/", routes);

app.listen(PORT, async () => {
  console.log("connecting to database....");
  await sequelize.authenticate();
  console.log("database is connected!");
  console.log("application is running on port: ", PORT);
});
