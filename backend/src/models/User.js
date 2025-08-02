const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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
    breed: { type: String, required: function() { return this.role === 'patient'; } }, 
    age: { type: Number, required: function() { return this.role === 'patient'; } },
    about: { type: String, required: function() { return this.role === 'doctor'; } },
    
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
