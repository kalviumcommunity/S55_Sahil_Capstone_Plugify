const express = require("express");
const app = express();
const { getConnectionStatus } = require("./db");
const { userModel } = require("./schema");
const { adminModel } = require("./adminSchema.js");
app.use(express.json());

// GET request to get connection status
app.get("/", async (req, res) => {
  const connectionStatus = await getConnectionStatus();
  res.send(connectionStatus);
});

app.get("/data", async (req, res) => {
  try {
    const users = await userModel.find();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/adminsignup", async (req, res) => {
  try {
    const user = await adminModel.create({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
    });
    res.send(user);
  } catch (err) {
    console.error(err);
  }
});
app.post("/adminlogin", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await adminModel.findOne({ username, password });

    if (!user) {
      return res.status(401).json({ error: "Invalid username / password" });
    }

    res.status(200).json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/adminlogout", (req, res) => {
  res.clearCookie("username");
  res.clearCookie("password");
  res.clearCookie("email");

  res.status(200).json({ message: "Logout succesful" });
});

app.get("/hello", function (req, res) {
  res.send("Hello");
});

module.exports = app;
