const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const billableItem = new mongoose.Schema({
    description: { type: String, trim: true },
    rate: Number,
    period: String
})

const siteSchema = mongoose.Schema({
    name:{
        type:String,
        trim: true,
        required: 'You must enter a Name for this site',
    },
    client: {
        type: mongoose.Schema.ObjectId,
        ref: 'Client'
    },
    hostingVendor: {
        type: mongoose.Schema.ObjectId,
        ref: 'Vendor'
    },
    url: {
       type: String,
       trim: true,
       required: 'You must enter a URL for this site'
    },
    staging: {
        type:String,
        trim:true
    },
    domainManager: {
        type:Boolean,
        required: 'The whole reason we build this app was to make managing this shit easier...please tell us who manages this domain'
    },
    registrar: {
        type: String,
        trim: true,
    },
    nameServer: {
        type: String,
        trim: true,
    },
    sslProvider: {
        type: String,
        trim: true
    },
    billableItems: [billableItem],
    renewal: {
        type: Date,
        default: Date.now(),
        required: "Do i seriously have to hold your hand all the way through this?"
    }
});

siteSchema.index({
    name: 'text'
});

function autopopulate(next) {
    this.populate('client');
    this.populate('hostingVendor');
    next();
}

siteSchema.pre('find', autopopulate);
siteSchema.pre('findOne', autopopulate);

module.exports = mongoose.model('Site', siteSchema);