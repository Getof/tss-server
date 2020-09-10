const mongoose = require('mongoose');

const RiderSchema  = mongoose.Schema({
    first_name: {
        type: String,
        default: ''
    },
    last_name: {
        type: String,
        default: ''
    },
    mobile_number: {
        type: String,
        required: true
    },
    email: {
        type: String,
        default: ''
    },
    // gender: {
    //     type: String,
    //     default: 'Неизвестно'
    // },
    balance: {
        type: String,
        default: '0.0'
    },
    status: {
        type: String,
        default: 'accept'
    },
    info_changed: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Rider', RiderSchema);