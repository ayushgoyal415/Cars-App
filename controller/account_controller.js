const acc_mdl = require('../models/account_model');

exports.update_password = async (req, res, next) => {
  try {
    const { user_id } = req.session;

    if (!(await acc_mdl.update_password({ user_id, ...req.body })))
      return res.status(400).json({ message: 'Invalid Current Password' });

    res.status(200).json({ message: 'Password update successful' });
  } catch (error) {
    next(error);
  }
};

exports.logout = async (req, res, next) => {
  try {
    req.session.destroy();
    res.status(200).json({ message: `Logout successful` });
  } catch (error) {
    next(error);
  }
};

exports.delete_account = async (req, res, next) => {
  try {
    const { user_id } = req.session;
    const { password } = req.body;

    if (!(await acc_mdl.delete_account({ user_id, password })))
      return res.status(401).json({ message: 'Invalid Password' });

    req.session.destroy();
    res.status(200).json({ message: 'Account deleted' });
  } catch (error) {
    next(error);
  }
};
