const get_mdl = require('../models/car_get_model');

exports.get_cars = async (req, res, next) => {
  try {
    const cars = await get_mdl.get_cars(req.session.user_id);
    if (cars.length === 0)
      return res
        .status(404)
        .json({ message: `You haven't posted any car yet` });

    for (let i = 0; i < cars.length; i++) {
      for (let j in cars[i]) {
        if (cars[i][j] === null || j === 'posted_by' || j === 'car_id')
          delete cars[i][j];
      }
    }
    res.send(cars);
  } catch (error) {
    next(error);
  }
};

exports.get_car = async (req, res, next) => {
  try {
    const { car } = req.params;
    const { user_id } = req.session;

    const _car = await get_mdl.get_car(user_id, car);
    if (_car === undefined)
      return res.status(404).json({ message: `Car named "${car}" not found` });

    for (let i in _car) {
      if (_car[i] === null || i === 'posted_by' || i === 'car_id')
        delete _car[i];
    }
    res.send(_car);
  } catch (error) {
    next(error);
  }
};

exports.get_prop = async (req, res, next) => {
  try {
    let { car, prop } = req.params;
    const { user_id } = req.session;

    const _car = await get_mdl.get_car(user_id, car);
    if (_car === undefined)
      return res.status(404).json({ message: `Car named "${car}" not found` });

    const _prop = await get_mdl.get_prop(user_id, car, prop);
    if (_prop === undefined || _prop === null)
      return res.status(404).json({
        message: `"${car}" doesn't have a property named "${prop}"`
      });

    res.send({ [prop]: _prop });
  } catch (error) {
    next(error);
  }
};
