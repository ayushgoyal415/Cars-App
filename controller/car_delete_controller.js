const del_mdl = require('../models/car_del_model');
const get_mdl = require('../models/car_get_model');

exports.delete_car = async (req, res, next) => {
  try {
    const { car } = req.params;
    const { user_id } = req.session;

    const _car = await get_mdl.get_car(user_id, car);
    if (_car === undefined)
      return res.status(404).json({ message: `Car named "${car}" not found` });

    await del_mdl.delete_car(user_id, car);
    res.status(200).json({ message: `Car deleted successfully` });
  } catch (error) {
    next(error);
  }
};

exports.delete_prop = async (req, res, next) => {
  try {
    let { car, prop } = req.params;
    const { user_id } = req.session;

    if ((await get_mdl.get_car(user_id, car)) === undefined)
      return res.status(404).json({ message: `Car named "${car}" not found` });

    const _prop = await get_mdl.get_prop(user_id, car, prop);
    if (_prop === undefined || _prop === null)
      return res
        .status(404)
        .json({ message: `"${car}" doesn't have a property named "${prop}"` });

    await del_mdl.delete_prop(user_id, car, prop);
    res.status(200).json({ message: `Property deleted successfully` });
  } catch (error) {
    next(error);
  }
};
