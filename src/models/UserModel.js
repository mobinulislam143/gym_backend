const mongoose = require('mongoose')
const DataSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    full_name: { type: String, required: true },
    role: { type: String, enum: ['trainer', 'trainee'], required: true },

}, { timeStamps: true, versionKey: false })

const UserModel = mongoose.model('users', DataSchema)
module.exports = UserModel
