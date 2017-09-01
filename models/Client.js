const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const slug = require('slugs');

const clientSchema = mongoose.Schema({
    slug: String,
    name: {
        type: String,
        trim: true,
        required: 'Please enter a Name for this client'
    },
    contactName:{
        type: String,
        trim:true
    },
    phone: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        trim: true
    }
});

clientSchema.pre('save', async function (next) {
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

module.exports = mongoose.model('Client',clientSchema);