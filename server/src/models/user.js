const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 20
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 20
    },
    primary: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        index: true,
        lowercase: true
    },
    secondary: {
        type: String,
        trim: true,
        lowercase: true
    },
    hash_password: {
        type: String,
        required: true
    },
    favorite_charging_stations: [{
        station: { type: mongoose.Schema.Types.ObjectId, ref: 'station' }
    }
    ],
    active_charging_stations: [{
        station: { type: mongoose.Schema.Types.ObjectId, ref: 'station' },
        charging_time: { type: String },
        power_consumption: { type: Number, trim: true },
        cost: { type: Number, trim: true }
    }]

}, { timestamps: true });

userSchema.virtual('password')
    .set(function (password) {
        this.hash_password = bcrypt.hashSync(password, 10);
    })

userSchema.methods = {
    authenticate: function (password) {
        return bcrypt.compareSync(password, this.hash_password)
    }
}

module.exports = mongoose.model('User', userSchema);