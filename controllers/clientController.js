const mongoose = require('mongoose');
const Client = mongoose.model('Client');

exports.addClient = (req, res) => {
    res.render('editClient', {title: 'Add A Client'});
};

exports.getClients = async(req,res) => {
    const clients = await Client.find().sort({name: 'ascending'});
    res.render('clients', {title: `All Clients`, clients})
    //res.json(sites)
}

exports.createClient = async(req, res) => {
    const client = new Client(req.body);
    await client.save();
    req.flash('success', `Successfully Created ${client.name}`);
    res.redirect(`/client/${client.slug}`)
};

exports.getClient = async(req, res) => {
    const client = await Client.findOne( { slug: req.params.slug } );
    res.render('client', {title: client.name, client})
    //res.json(client)
};
