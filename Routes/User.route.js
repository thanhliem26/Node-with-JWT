const express = require("express");
const route = express.Router();
const { verifyAccessToken } = require("../helper/jwt_service")
const { register, refreshToken, login, logout, getListsts} = require('../controllers/user.controller')

 route.post("/register", register);

route.post("/refresh-token", refreshToken);

route.post("/login", login);

route.delete("/logout", logout);

route.get('/getListsts', verifyAccessToken, getListsts)

module.exports = route;
