const express = require("express");
const app = express();
const createError = require('http-errors');

require("dotenv").config();
const client = require('./helper/connection_redis');

// require('./helper/connections_mongodb');
app.use(express.json());
app.use(express.urlencoded({extended: true}))

const userRoute = require('./Routes/User.route');

//router
app.get("/", (req, res, next) => {
  res.send("Home Page!");
});

app.use('/user', userRoute);

app.use((req, res, next) => {
//   const error = new Error("Not Found!");
//   error.status = 500;
//   next(error);

    next(createError.NotFound('This route does not exist.'))
});

app.use((err, req, res, next) => {
  res.json({ status: err.status || 500, message: err.message });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log("Server is runnig...", PORT);
});
