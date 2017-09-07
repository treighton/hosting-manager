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

exports.editVendor = async(req, res) => {
    const vendor = await Vendor.findOne({ slug: req.params.slug });
    res.render('editVendor', {title: `Edit ${vendor.name}`, vendor})
};

exports.updateVendor = async(req, res) => {
    const vendor = await Vendor.findOneAndUpdate(
        {
            _id: req.params.id
        },
        req.body,
        {
            new: true,
            runValidators: true,
        }
    ).exec();
    req.flash('success', `Successfully updated <strong>${vendor.name}</strong>`);
    res.redirect(`/vendor/${vendor.slug}`)
};

exports.deleteVendor = async(req, res) => {
    const vendor = await Vendor.findOne( { _id: req.params.id });
    if (vendor.sites.length > 0){
        req.flash('error', `We cannot delete the site because it is in use by<strong>${vendor.sites.map((site) => (`<a href="/site/${site.id}">${site.name}</a>`)).join(' ')}</strong>`);
        res.redirect(`/vendor/${vendor.slug}`);
        return
    }
    vendor.remove();
    req.flash('success', `Successfully Deleted <strong>${vendor.name}</strong>`);
    res.redirect('/vendor');
}