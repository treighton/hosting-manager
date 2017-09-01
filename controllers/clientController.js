const mongoose = require('mongoose');
const Client = mongoose.model('Client');

exports.addClient = (req, res) => {
    res.render('editClient', {title: 'Add A Client'});
};

exports.createClient = async(req, res) => {
    const client = new Client(req.body);
    await client.save();
    req.flash('success', `Successfully Created ${client.name}`);
    res.redirect(`/client/${client.slug}`)
};

exports.getClient = async(req, res) => {
    const client = await Client.findOne( { slug: req.params.slug } );
    res.render('client', {title: client.name, client})
};
