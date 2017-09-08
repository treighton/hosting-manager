const mongoose = require('mongoose');
const Client = mongoose.model('Client');

exports.addClient = (req, res) => {
    res.render('editClient', {title: 'Add A Client'});
};

exports.getClients = async(req,res) => {
    const clients = await Client.find().sort({name: 'ascending'});
    res.render('clients', {title: `All Clients`, clients})
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
};

exports.editClient = async(req, res) => {
    const client = await Client.findOne({ slug: req.params.slug });
    res.render('editClient', {title: `Edit ${client.name}`, client})
};

exports.updateClient = async(req, res) => {
    const client = await Client.findOneAndUpdate(
        {
            _id: req.params.id
        },
        req.body,
        {
            new: true,
            runValidators: true,
        }
    ).exec();
    req.flash('success', `Successfully updated <strong>${client.name}</strong>`);
    res.redirect(`/client/${client.slug}`)
};

exports.deleteClient = async(req, res) => {
    const client = await Client.findOne( { _id: req.params.id });
    if (client.sites.length > 0){
        req.flash(
            'error',
            `We cannot delete the site because it is in use by <strong>${client.sites.map((site) => (
                                `<a href="/site/${site.id}">${site.name}</a>`
                                )).join(' ')
            }</strong>`
        );
        res.redirect(`/client/${client.slug}`);
        return
    }
    client.remove();
    req.flash('success', `Successfully Deleted <strong>${client.name}</strong>`);
    res.redirect('/');
};