const Joi = require('joi');
const { joiPasswordExtendCore } = require('joi-password');
const Joi_password = Joi.extend(joiPasswordExtendCore);

const password = Joi_password.string()
  .min(8)
  .noWhiteSpaces()
  .minOfSpecialCharacters(1)
  .minOfLowercase(1)
  .minOfUppercase(1)
  .minOfNumeric(1);

const property_name = Joi.string()
  .min(3)
  .max(50)
  .trim()
  .disallow('car_id', 'created_on', 'posted_by', 'name')
  .messages({ 'any.invalid': 'Cannot post property named "{#value}"' });

const property_value = Joi.string()
  .min(1)
  .max(50)
  .trim()
  .disallow('null')
  .messages({ 'any.invalid': 'Cannot set property value as "null"' });

exports.signup = Joi.object({
  username: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: true } })
    .max(50),
  password,
  first_name: Joi.string().min(3).max(50).trim(),
  last_name: Joi.string().min(3).max(50).trim()
});

exports.update_password = Joi.object({
  new_password: password
});

exports.get_prop = Joi.object({
  prop: Joi.string()
    .trim()
    .disallow('car_id', 'created_on', 'posted_by')
    .messages({
      'any.invalid': 'Cannot access property named "{#value}"'
    })
});

exports.post_car = Joi.object({
  car_name: Joi.string().min(3).max(50).trim().disallow('null'),
  property_name,
  property_value
});

exports.update_car = Joi.object({
  property_name: Joi.string()
    .trim()
    .disallow('car_id', 'created_on', 'posted_by', 'name')
    .messages({ 'any.invalid': 'Cannot update property named "{#value}"' }),
  property_value
});

exports.delete_prop = Joi.object({
  prop: Joi.string()
    .trim()
    .disallow('car_id', 'created_on', 'posted_by', 'name')
    .messages({ 'any.invalid': 'Cannot delete property named "{#value}"' })
});
