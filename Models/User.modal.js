const mongoose = require('mongoose');
const schema = mongoose.Schema;

const { testConnection } = require('../helper/connection_multi_mongodb')

const UserSchema = new schema({
    username: {
        type: String,
        lowercase: true,
        unique: true,
        require: true,
    },
    password: {
        type: String,
        required: true
    }
})

module.exports = testConnection.model('user', UserSchema);

// module.exports = {
//     test: testConnections.model('user', UserSchema),
//     user: userConnection.model('user', UserSchema)
// }