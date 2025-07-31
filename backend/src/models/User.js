const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['doctor', 'patient', 'admin'], required: true },
    speciality: { type: String, required: function() { return this.role === 'doctor'; } },
    experience: { type: Number, required: function() { return this.role === 'doctor'; } },
    fee: { type: Number, required: function() { return this.role === 'doctor'; } },
    timings: { type: String, required: function() { return this.role === 'doctor'; } },
    address: { type: String, required: function() { return this.role === 'patient'; } },
    phone: { type: String, required: function() { return this.role === 'patient'; } },
    dob: { type: Date, required: function() { return this.role === 'patient'; } },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
