const express = require('express');
const router = express.Router();
const {catchErrors} = require('../handlers/errorHandlers');
const vendorController = require('../controllers/vendorController');
const clientController = require('../controllers/clientController');
const siteController = require('../controllers/siteController');

// Do work here
router.get('/', catchErrors(siteController.getSites));

//Vendors
router.get('/vendor/add', vendorController.addVendor);
router.post('/vendor/add', catchErrors(vendorController.createVendor));
router.get('/vendor/:slug', catchErrors(vendorController.getVendor));

//Clients
router.get('/client/add', clientController.addClient);
router.post('/client/add', catchErrors(clientController.createClient));
router.get('/client/:slug', catchErrors(clientController.getClient));


//Sites
router.get('/site/add', catchErrors(siteController.addSite));
router.post('/site/add', catchErrors(siteController.createSite));
router.get('/site/:id', catchErrors(siteController.getSite));
router.get('/site/:id/edit', catchErrors(siteController.editSite));
router.post('/site/add/:id', catchErrors(siteController.updateSite));


module.exports = router;
