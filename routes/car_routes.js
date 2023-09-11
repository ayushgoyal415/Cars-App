const { Router } = require('express');
const router = Router();

const get_ctrl = require('../controller/car_get_controller');
const post_ctrl = require('../controller/car_post_controller');
const put_ctrl = require('../controller/car_put_controller');
const del_ctrl = require('../controller/car_delete_controller');

const joi_ctrl = require('../controller/joi_controller');

router
  .route('/')
  .get(get_ctrl.get_cars)
  .post(joi_ctrl.post_car, post_ctrl.post_car);

router
  .route('/:car')
  .get(get_ctrl.get_car)
  .post(joi_ctrl.post_prop, post_ctrl.post_prop)
  .put(joi_ctrl.update_car, put_ctrl.update_car)
  .delete(del_ctrl.delete_car);

router
  .route('/:car/:prop')
  .get(joi_ctrl.get_prop, get_ctrl.get_prop)
  .delete(joi_ctrl.delete_prop, del_ctrl.delete_prop);

module.exports = router;
