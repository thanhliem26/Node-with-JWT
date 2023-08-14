const mongoose = require('mongoose');
const schema = mongoose.Schema;
const bcrypt = require('bcrypt');

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

UserSchema.pre('save', async function(next) {
    try {
        const salt = await  bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(this.password, salt);

        this.password = hashPassword;
        next();
    } catch(error) {
        next(error)
    }
})

UserSchema.methods.isCheckPassword = async function(password) {
    try {
        const result = await bcrypt.compare(password, this.password);

        return result;
    } catch(error) {
        next(error)
    }
}


module.exports = testConnection.model('user', UserSchema);

// module.exports = {
//     test: testConnections.model('user', UserSchema),
//     user: userConnection.model('user', UserSchema)
// }