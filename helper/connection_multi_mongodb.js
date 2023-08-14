const mongoose = require('mongoose');
require('dotenv').config();

function newConnection(uri) {
    const connection = mongoose.createConnection(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    connection.on('connected', function () {
        console.log("Mongodb connected:", this.name)
    })
    
    connection.on('disconnected', () => {
        console.log("Mongodb disconnected")
    })
    
    connection.on('error', (error) => {
        console.log("Mongodb error", JSON.stringify(error))
    })
    
    return connection;
}

const testConnection = newConnection(process.env.URL_MONGODB_TEST);
const userConnection = newConnection(process.env.URL_MONGODB_USER);

module.exports = {
    testConnection,
    userConnection,
}