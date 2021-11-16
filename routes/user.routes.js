const router = require('express').Router();
const controller = require('../controllers/user.controller');

router.get('/', controller.getAllUsers);
router.post('/login', controller.login);
router.post('/signup', controller.signup);
router.get('/approvedAccounts', controller.getApprovedAccounts);
router.get('/pendingAccounts', controller.getAllPendingAccounts);
router.put('/approve', controller.approveAccount);
module.exports = router;
