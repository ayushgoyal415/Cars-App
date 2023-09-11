const post_mdl = require('../models/car_post_model');
const get_mdl = require('../models/car_get_model');

exports.post_car = async (req, res, next) => {
  try {
    let { name, ...props } = req.body;
    const { user_id } = req.session;

    const _car = await get_mdl.get_car(user_id, name);
    if (_car !== undefined)
      return res
        .status(400)
        .json({ message: `Car named "${name}" already exists` });

    await post_mdl.post_car(user_id, name, props);
    res.status(201).json({ message: `Car created successfully` });
  } catch (error) {
    next(error);
  }
};

exports.post_prop = async (req, res, next) => {
  try {
    const { car } = req.params;
    const { user_id } = req.session;
    const { ...props } = req.body;

    const _car = await get_mdl.get_car(user_id, car);
    if (_car === undefined)
      return res.status(404).json({ message: `Car named "${car}" not found` });

    for (let i in props) {
      const _prop = await get_mdl.get_prop(user_id, car, i);
      if (_prop !== undefined && _prop !== null)
        return res
          .status(404)
          .json({ message: `"${car}" already has a property named "${i}"` });
    }

    await post_mdl.post_prop(user_id, car, props);
    res.status(201).json({ message: `New properties added successfully` });
  } catch (error) {
    next(error);
  }
};
