const put_mdl = require('../models/car_put_model');
const get_mdl = require('../models/car_get_model');

exports.update_car = async (req, res, next) => {
  try {
    const { car } = req.params;
    const { user_id } = req.session;
    const { ...props } = req.body;

    const _car = await get_mdl.get_car(user_id, car);
    if (_car === undefined)
      return res.status(404).json({ message: `Car named "${car}" not found` });

    for (let i in props) {
      const _prop = await get_mdl.get_prop(user_id, car, i);
      if (_prop === undefined || _prop === null)
        return res
          .status(404)
          .json({ message: `"${car}" doesn't have a property named "${i}"` });
    }

    await put_mdl.update_car(user_id, car, props);
    res.status(200).json({ message: `Properties updated successfully` });
  } catch (error) {
    next(error);
  }
};
