const { Router } = require('express');
const router = Router();

const auth_ctrl = require('../controller/auth_controller');
const joi_ctrl = require('../controller/joi_controller');

router.route('/signup').post(joi_ctrl.signup, auth_ctrl.signup);
router.route('/login').post(joi_ctrl.login, auth_ctrl.login);

module.exports = router;
