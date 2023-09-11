const { Router } = require('express');
const router = Router();

const acc_ctrl = require('../controller/account_controller');
const joi_ctrl = require('../controller/joi_controller');

router.route('/logout').get(acc_ctrl.logout);

router
  .route('/update_password')
  .put(joi_ctrl.update_password, acc_ctrl.update_password);
  
router
  .route('/delete_account')
  .delete(joi_ctrl.delete_account, acc_ctrl.delete_account);

module.exports = router;
