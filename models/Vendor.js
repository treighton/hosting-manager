const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const vendorSchema = new mongoose.Schema({
    created: {
        date: Date,
        default: Date.now()
    },
    title: {
        type: 'String',
        required: 'You must supply a Vendor Title'
    },
});