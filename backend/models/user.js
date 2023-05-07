const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    employeeID: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    faceData: { type: Object, required: true },
    attendance: [
        {
            date: { type: Date, required: true },
            status: { type: String, required: true },
        },
    ],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
