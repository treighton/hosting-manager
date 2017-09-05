const passport = require('passport');
const crypto = require('crypto');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const promisify = require('es6-promisify');
const mail = require('../handlers/mail');

exports.login = passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: 'Login Failed',
    successRedirect: '/',
    successFlash: 'You are now logged in'
});

exports.logout = (req, res) => {
    req.logout();
    req.flash('success', 'You are now logged out 👋');
    res.redirect('/')
};

exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()){
        next();
        return
    }
    req.flash('error', 'You must be logged in to add stores');
    res.redirect('/login')
};

exports.forgot = async (req, res) => {
    const user = await User.findOne({email: req.body.email});
    if (!user){
       req.flash('error', 'A user with that email could not be found');
       return res.redirect('/login');
    }
    user.resetPasswordToken = crypto.randomBytes(20).toString('hex');
    user.resetPasswordExpires = Date.now() + 3600000;
    await user.save();
    // send email
    const resetURL = `http://${req.headers.host}/account/reset/${user.resetPasswordToken}`;

    await mail.send({
        user,
        subject: 'Pasword Reset',
        resetURL,
        filename: 'password-reset'
    });

    req.flash('success', `you have been emailed a password reset link `);
    //redirect to login after
    res.redirect('/login');
};

exports.reset = async(req, res) => {
    const user = await User.findOne({
        resetPasswordToken: req.params.token,
        resetPasswordExpires: { $gt: Date.now() }
    });

    if(!user) {
        req.flash('error', 'Password reset token is invalid or Expired');
        return res.redirect('/login');
    }

    res.render('reset', {title: 'Reset your password'})
};

exports.confirmedPasswords = (req, res, next) => {
    if (req.body.password === req.body.confirmPassword){
        next();
        return;
    }
    req.flash('error', 'Passwords need to match');
    res.redirect('back');
};


exports.update = async (req, res) => {
    const user = await User.findOne({
        resetPasswordToken: req.params.token,
        resetPasswordExpires: { $gt: Date.now() }
    });

    if(!user) {
        req.flash('error', 'Password reset token is invalid or Expired');
        return res.redirect('/login');
    }

    const setPassword = promisify(user.setPassword, user);
    await setPassword(req.body.password);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    const updateUser = await user.save();
    await req.login(updateUser);
    req.flash('success', '🤗 Your Password has been successfully updated');
    res.redirect('/');
};
