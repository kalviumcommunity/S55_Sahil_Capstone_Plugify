const express = require("express");
const app = express();
const { getConnectionStatus } = require("./db");
const { userModel } = require("./schema");
const { adminModel } = require("./adminSchema.js");
const Joi = require("joi");
app.use(express.json());

const adminSignupSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
  email: Joi.string().email().required(),
});

const adminLoginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

const updateSchema = Joi.object({
  img_url: Joi.string().required(),
  contact_no: Joi.number().required(),
  price_per_min: Joi.number().required(),
  google_maps_link: Joi.string().required(),
  charge_type: Joi.string().required(),
});

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
    console.error('Error in /data route:', error);
    res.status(500).send('Error in /data route:');
  }
});

app.post("/adminsignup", async (req, res) => {
  try {
    const { error, value } = adminSignupSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const user = await adminModel.create(value);
    res.send(user);
  } catch (error) {
    console.error(error);
    if (err.name === "MongoDBNetworkError") {
      return res.status(500).json({ error: "Database connection error" });
    }
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.post("/adminlogin", async (req, res) => {
  try {
    const { error, value } = adminLoginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const user = await adminModel.findOne(value);

    if (!user) {
      return res.status(401).json({ error: "Invalid username / password" });
    }

    res.status(200).json({ user });
  } catch (err) {
    console.error(err);
    if (err.name === "MongoDBNetworkError") {
      return res.status(500).json({ error: "Database connection error" });
    }
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/adminlogout", (req, res) => {
  res.clearCookie("username");
  res.clearCookie("password");
  res.clearCookie("email");

  res.status(200).json({ message: "Logout succesful" });
});

app.post('/add', async (req, res) => {
  try {
      const { error, value } = updateSchema.validate(req.body);
      if (error) {
          return res.status(400).send(error.details[0].message);
      }
      const newData = await userModel.create(value);
      res.send(newData);
  } catch (error) {
      console.error(error);
      res.status(500).send('Error');
  }
});

app.get("/hello", function (req, res) {
  res.send("Hello");
});

module.exports = app;