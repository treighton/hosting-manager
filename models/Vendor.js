const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const slug = require('slugs');

const vendorSchema = new mongoose.Schema({
    slug: String,
    name: {
        type: String,
        trim: true,
        required: 'You must supply a Vendor Title'
    },
    monthlyCosts: {
        type:Number,
        default: 0
    },
    link: {
        type: String,
        trim: true
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals:true }
});

vendorSchema.virtual('sites', {
    ref: 'Site',
    localField: '_id',
    foreignField: 'hostingVendor',
});


vendorSchema.pre('save', async function (next) {
    if(!this.isModified('name')) {
        next();
        return;
    }
    this.slug = slug(this.name);

    const slugRegEx = new RegExp(`^(${this.slug})((-[0-9]*$)?)$`, 'i');

    const entryWithSlug = await this.constructor.find( {slug: slugRegEx} );

    if (entryWithSlug.length) {
        this.slug = `${this.slug}-${entryWithSlug.length + 1}`;
    }

    next();
    // TODO make so slugs must be unique
});

function autopopulate(next) {
    this.populate('sites');
    next();
}

//vendorSchema.pre('find', autopopulate);
vendorSchema.pre('findOne', autopopulate);

module.exports = mongoose.model('Vendor', vendorSchema);