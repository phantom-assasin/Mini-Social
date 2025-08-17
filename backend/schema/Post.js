var Joi = require("joi");

const postSchema = Joi.object({
  title: Joi.string().min(3).max(255).required(),
  content: Joi.string().required(),
});

module.exports = { postSchema };
