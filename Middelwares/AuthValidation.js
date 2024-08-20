const Joi = require('joi');

const signupValidation = (req, res, next) => {
   const schema = Joi.object({
     email: Joi.string().email().required(),
     password: Joi.string().min(8).max(12).required(),
     confirmPassword: Joi.string().valid(Joi.ref('password')).required()
   });
 
   const { error } = schema.validate(req.body);
   if (error) {
     return res.status(400) // Use 400 for bad request
       .json({ message: "Validation error", details: error.details });
   }
   next();
 };

 const loginValidation = (req, res, next) => {
   const schema = Joi.object({
     email: Joi.string().email().required(),
     password: Joi.string().min(8).max(12).required()
   });
 
   const { error } = schema.validate(req.body);
   if (error) {
     return res.status(400)
       .json({ message: "Validation error", details: error.details });
   }
   next();
 };

module.exports = { signupValidation, loginValidation };
