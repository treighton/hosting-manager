const mongoose = require('mongoose');
const Site = mongoose.model('Site');

exports.addSite = async(req, res) => {
    const clients = await mongoose.model('Client').find();
    const vendors = await mongoose.model('Vendor').find();
    res.render('editSite', {title: 'Add A Site', clients, vendors});
};

exports.createSite = async(req, res) => {
    const site = new Site(req.body);
    await site.save();
    req.flash('success', `Successfully Created ${site.name}`);
    res.redirect(`/site/${site._id}`)

};


exports.getSite = async(req, res) => {
    const site = await Site.findOne( { _id: req.params.id } );
    res.render('site', {title: site.name, site})
};

exports.getSites = async(req,res) => {
    const sites = await Site.find();
    res.render('sites', {title: `All Sites`, sites})
    //res.json(sites)
}

exports.editSite = async(req, res) => {
    const clients = await mongoose.model('Client').find();
    const vendors = await mongoose.model('Vendor').find();
    const site = await Site.findOne({ _id: req.params.id });
    res.render('editSite', {title: `Edit ${site.name}`, site, clients, vendors})
};

exports.updateSite = async(req, res) => {
    const site = await Site.findOneAndUpdate(
        {
            _id: req.params.id
        },
        req.body,
        {
            new: true,
            runValidators: true,
        }
    ).exec();
    req.flash('success', `Successfully updated <strong>${site.name}</strong> <a href="/site/${site._id}">View 
Site</a>`);
    res.redirect(`/site/${site._id}/edit`)
};

exports.searchSites = async(req, res) => {
    const sites = await Site
        .find({
            $text: {
                $search: req.query.q
            }
        }, {
            score: { $meta: 'textScore' }
        })
        .sort({
            score: {$meta: 'textScore' }
        });

    res.json(sites);
};

exports.removeSite = async(req, res) => {
    const site = await Site.findOneAndRemove( { _id: req.params.id }).exec();
    req.flash('success', `Successfully Deleted <strong>${site.name}</strong>`);
    res.redirect('/');
};