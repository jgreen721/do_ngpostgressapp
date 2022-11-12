const express = require("express");
const cors = require("cors");
const app = express();
const apiRoutes = require("./api");
const PORT = process.env.PORT || 4455;
const SECRET =
  "dkeifgmekdKDgoieKDmei20949359dkmfieo2924i3ndkjo20583JDkfejeidjwi2o39";
const CLIENT_URL =
  process.env.NODE_ENV == "production" ? "" : "http://localhost:4200";
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: CLIENT_URL }));

app.get("/", (req, res) => {
  res.json({ msg: "Connected to your backend api" });
});

app.use("/api", apiRoutes);
app.listen(PORT, console.log(`Listening in on port ${PORT}`));
