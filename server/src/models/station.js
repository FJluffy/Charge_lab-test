const mongoose = require('mongoose');
const stationSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true
    },
    location: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['online', 'offline', 'in-use'],
        default: 'online'
    }
}, { timestamps: true });

module.exports = mongoose.model('Station', stationSchema);