const mongoose = require('mongoose');

exports.renderDashboard = async(req, res) => {
    const clients = await mongoose.model('Client').find();
    const vendors = await mongoose.model('Vendor').find();
    const sites= await mongoose.model('Site'). find();
    res.render('dashboard', {title:`Hosting Dashboard`, sites, vendors, clients})
}