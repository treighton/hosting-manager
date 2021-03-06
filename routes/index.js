const express = require('express');
const router = express.Router();
const {catchErrors} = require('../handlers/errorHandlers');
const vendorController = require('../controllers/vendorController');
const clientController = require('../controllers/clientController');
const siteController = require('../controllers/siteController');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const dashboardController = require('../controllers/dashboardController');
// Do work here
router.get('/', catchErrors(siteController.getSites));

//Vendors
router.get('/vendor/', catchErrors(vendorController.getVendors));
router.get('/vendor/add', vendorController.addVendor);
router.post('/vendor/add', catchErrors(vendorController.createVendor));
router.get('/vendor/:slug', catchErrors(vendorController.getVendor));
router.get('/vendor/:slug/edit', catchErrors(vendorController.editVendor));
router.post('/vendor/add/:id', catchErrors(vendorController.updateVendor));
router.post('/vendor/:id/delete', catchErrors(vendorController.deleteVendor));

//Clients
router.get('/client/', catchErrors(clientController.getClients));
router.get('/client/add', clientController.addClient);
router.post('/client/add', catchErrors(clientController.createClient));
router.get('/client/:slug', catchErrors(clientController.getClient));
router.get('/client/:slug/edit', catchErrors(clientController.editClient));
router.post('/client/add/:id', catchErrors(clientController.updateClient));
router.post('/client/:id/delete', catchErrors(clientController.deleteClient));


//Sites
router.get('/sites', catchErrors(siteController.getSites));
router.get('/site/add', catchErrors(siteController.addSite));
router.post('/site/add', catchErrors(siteController.createSite));
router.get('/site/:id', catchErrors(siteController.getSite));
router.get('/site/:id/edit', catchErrors(siteController.editSite));
router.post('/site/add/:id', catchErrors(siteController.updateSite));
router.post('/site/:id/remove', catchErrors(siteController.removeSite));


//auth
router.get('/login', userController.loginForm);
router.get('/register', userController.registerForm);
router.post('/register',
    userController.validateRegister,
    userController.register,
    authController.login
);
router.get('/logout', authController.logout);

router.post('/login', authController.login);

//api
router.get('/api/search', catchErrors(siteController.searchSites));



module.exports = router;
