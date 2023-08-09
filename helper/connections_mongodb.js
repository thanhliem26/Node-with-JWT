const mongoose = require('mongoose');

const connection = mongoose.createConnection('mongodb://localhost:27017/test');

connection.on('connected', () => {
    console.log("Mongodb connected")
})

connection.on('disconnected', () => {
    console.log("Mongodb disconnected")
})

connection.on('error', (error) => {
    console.log("Mongodb error", JSON.stringify(error))
})

process.on('SIGINT', async () => {
    await connection.close();
    process.exit(0);
})

module.exports = connection;