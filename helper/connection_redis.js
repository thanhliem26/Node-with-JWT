
const redis = require('redis');

const client = redis.createClient({
    socket: {
        host: '127.0.0.1',
        port: 6379
    },
});

// client.on('error', err => console.log('Redis Server Error', err));

// client.on('connected', () => console.log('Redis Server connected'));

// client.on('ready', () => console.log('Redis Server ready'));

module.exports = client;