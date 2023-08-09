const express = require("express");
const route = express.Router();
const createError = require("http-errors");

const User = require("../Models/User.modal");
const { userValidate } = require('../helper/validation');

route.post("/register", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { error } = userValidate(req.body);
    console.log("🚀 ~ error:", error)

    if (error) {
      throw createError(error.details[0].message);
    }

    const isExits = await User.findOne({
        username: email
    })

    if(isExits) {
        throw createError.Conflict(`${email} is ready been register!`)
    }

    const isCreate = await User.create({
        username: email,
        password,
    })

    return res.json({status: 'ok', element: isCreate})
  } catch (err) {
    next(err);
  }
});

route.post("/refresh-token", (req, res, next) => {
  res.send("function refresh-token");
});

route.post("/login", (req, res, next) => {
  res.send("function login");
});

route.post("/logout", (req, res, next) => {
  res.send("function logout");
});

module.exports = route;
