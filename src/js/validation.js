import Joi from 'joi';

const schema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  password: Joi.string().min(6).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ['com', 'net'] },
  }),
});

export function validateData(name, email, password) {
  return schema.validate({ name, email, password });
}
