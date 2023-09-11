const auth_mdl = require('../models/auth_model');

exports.signup = async (req, res, next) => {
  try {
    if (req.session.user_id)
      return res.status(400).json({ message: `Cannot signup when logged in` });

    if (!(await auth_mdl.signup(req.body)))
      return res.status(400).json({ message: `Username already exists` });

    res.status(200).json({ message: 'Sign-up Successful' });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    if (req.session.user_id)
      return res.status(400).json({ message: `Already logged in` });

    const data = await auth_mdl.login(req.body);

    if (!data)
      return res
        .status(401)
        .json({ message: `Invalid username and/or password` });

    req.session.user_id = data.user_id;
    req.session.user_data = {
      first_name: data.first_name,
      last_name: data.last_name,
      username: data.username
    };

    res.status(200).json({ message: 'Login Successful' });
  } catch (error) {
    next(error);
  }
};
