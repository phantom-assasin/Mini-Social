var Joi = require("joi");

const commentSchema = Joi.object({
  content: Joi.string().min(1).required(),
});

module.exports = { commentSchema };
