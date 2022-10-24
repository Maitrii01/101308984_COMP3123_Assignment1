const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    gender: {
        type: String,
        enum: ["Male", "Female", "Other"],
    },
    salary: {
        type: Number,
    },
});

module.exports = mongoose.model("employees", EmployeeSchema);
