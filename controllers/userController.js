const mongoose = require('mongoose');
const User = mongoose.model('User');
const promisify = require('es6-promisify');

exports.loginForm = (req, res) => {
    res.render('login', {title: 'Login'})
};

exports.registerForm = (req, res) => {
    res.render('register', {title: 'Register'});
};

exports.validateRegister = (req, res, next) => {
    req.sanitizeBody('name');
    req.checkBody('name', 'Please Provide a Name').notEmpty();
    req.checkBody('email', 'Please Provide a valid Email').isEmail();
    req.sanitizeBody('email').normalizeEmail({
        remove_dots: false,
        remove_extension: false,
        gmail_remove_subaddress: false
    });
    req.checkBody('password', 'Please provide a Password').notEmpty();
    req.checkBody('password-confirm', 'Please provide a Password Confirmation').notEmpty();
    req.checkBody('password-confirm', 'Passwords do not match').equals(req.body.password);

    const errors = req.validationErrors();

    if (errors){
        req.flash('error', errors.map(err => err.msg));
        res.render('register', {title: 'Register', body: req.body, flashes: req.flash() });
        return
    }
    next();
};

exports.register = async (req, res, next) => {
    const user = new User({email: req.body.email, name:req.body.name});
    const register = promisify(User.register, User);
    await register(user, req.body.password);

    next()
};

exports.account = (req, res) => {
    res.render('account', {title: 'Edit your profile'})
}

exports.updateAccount = async(req, res) => {
    const updates = {
        name: req.body.name,
        email: req.body.email
    };

    const user = await User.findOneAndUpdate(
        { _id: req.user.id },
        { $set: updates },
        { new: true, runValidators: true, context: 'query' }
    );
    req.flash('success', 'You have updated your profile');
    res.redirect('back')
}