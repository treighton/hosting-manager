const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const md5 = require('md5');
const validator = require('validator');
const mongodbErrorhandler = require('mongoose-mongodb-errors');
const passportLocalMongoose = require('passport-local-mongoose');


const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        validate: [validator.isEmail, "Please enter a valid email address"],
        required: "Please provide a valid email"
    },
    name: {
        type: String,
        required: 'Please provide a name',
        trim: true
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
});

userSchema.virtual('gravatar').get(function () {
    const hash = md5(this.email);
    return `https://gravatar.com/avatar/${hash}?s=200`
});

userSchema.plugin(passportLocalMongoose, {usernameField: 'email'});

userSchema.plugin(mongodbErrorhandler);

module.exports = mongoose.model('User', userSchema);