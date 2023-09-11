const schema = require('./joi_schemas');

function convertor(str) {
  if (str[0] !== `"`) return str;

  let s = `"${str[1].toUpperCase()}`;

  let idx = str.indexOf('_');
  if (idx !== -1) {
    return (
      s +
      `${str.substring(2, idx)} ${
        str.substring(idx + 1, idx + 2).toUpperCase() + str.substring(idx + 2)
      }`
    );
  }
  return s + str.substring(2);
}

function handle_error(error, res) {
  res.status(400).json({ message: convertor(error.details[0].message) });
}

function check_empty(obj) {
  return new Promise(function (resolve, reject) {
    for (let i in obj)
      if (obj[i] === '')
        reject({ details: [{ message: `"${i}" is required` }] });
    resolve();
  });
}

exports.signup = async (req, res, next) => {
  check_empty(req.body)
    .then(() => schema.signup.validateAsync(req.body, { convert: false }))
    .then(() => next())
    .catch(error => handle_error(error, res));
};

exports.login = async (req, res, next) => {
  check_empty(req.body)
    .then(() => next())
    .catch(error => handle_error(error, res));
};

exports.update_password = async (req, res, next) => {
  const { new_password, current_password } = req.body;
  if (new_password === current_password)
    return res.status(400).json({
      message: 'New password cannot be same as current password'
    });

  check_empty(req.body)
    .then(() =>
      schema.update_password.validateAsync({ new_password }, { convert: false })
    )
    .then(() => next())
    .catch(error => handle_error(error, res));
};

exports.delete_account = async (req, res, next) => {
  check_empty(req.body)
    .then(() => next())
    .catch(error => handle_error(error, res));
};

exports.get_prop = async (req, res, next) => {
  schema.get_prop
    .validateAsync({ prop: req.params.prop }, { convert: false })
    .then(() => next())
    .catch(error =>
      res.status(401).json({ message: error.details[0].message })
    );
};

exports.post_car = async (req, res, next) => {
  const { name: car_name, ...props } = req.body;

  const promises = [];
  for (let i in props)
    promises.push(
      schema.post_car.validateAsync(
        { property_name: i, property_value: props[i] },
        { convert: false }
      )
    );

  Promise.all(promises)
    .then(() => check_empty({ car_name }))
    .then(() => schema.post_car.validateAsync({ car_name }, { convert: false }))
    .then(() => next())
    .catch(error => handle_error(error, res));
};

exports.post_prop = async (req, res, next) => {
  const { ...props } = req.body;

  if (Object.keys(props).length === 0)
    return res
      .status(400)
      .json({ message: 'Please send at least one property to post' });

  const promises = [];
  for (let i in props)
    promises.push(
      schema.post_car.validateAsync(
        { property_name: i, property_value: props[i] },
        { convert: false }
      )
    );

  Promise.all(promises)
    .then(() => next())
    .catch(error => handle_error(error, res));
};

exports.update_car = async (req, res, next) => {
  const { ...props } = req.body;

  if (Object.keys(props).length === 0)
    return res
      .status(400)
      .json({ message: 'Please send at least one property to update' });

  const promises = [];
  for (let i in props)
    promises.push(
      schema.update_car.validateAsync(
        { property_name: i, property_value: props[i] },
        { convert: false }
      )
    );

  Promise.all(promises)
    .then(() => next())
    .catch(error => handle_error(error, res));
};

exports.delete_prop = async (req, res, next) => {
  schema.delete_prop
    .validateAsync({ prop: req.params.prop }, { convert: false })
    .then(() => next())
    .catch(error => handle_error(error, res));
};
