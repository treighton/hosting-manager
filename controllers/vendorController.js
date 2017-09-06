const mongoose = require('mongoose');
const Vendor = mongoose.model('Vendor');


exports.getVendors = async(req,res) => {
    const vendors = await Vendor.find();
    res.render('vendors', {title: `All Vendors`, vendors})
    //res.json(sites)
}

exports.addVendor = (req, res) => {
    res.render('editVendor', {title: 'Add A Vendor'});
};

exports.createVendor = async(req, res) => {
    const vendor = new Vendor(req.body);
    await vendor.save();
    req.flash('success', `Successfully Create ${vendor.name} care to leave a review?`);
    res.redirect(`/vendor/${vendor.slug}`)
};

exports.getVendor = async(req, res) => {
    const vendor = await Vendor.findOne( { slug: req.params.slug } );
    res.render('vendor', {title: vendor.name, vendor})
    //res.json(vendor)
};